"use client";

import { Star, ThumbsUp, ThumbsDown, MessageCircle, Sparkles, Copy, RefreshCw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { mockReviews } from "@/data/mockReviews";
import { formatDate, cn } from "@/lib/utils";
import { Review } from "@/lib/types";
import { useState, useEffect } from "react";
import Image from "next/image";

const REVIEWS_PER_PAGE = 6;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-amber-400 text-amber-400" : "text-outline-variant"
          )}
        />
      ))}
    </div>
  );
}

// AI Reply Modal
function ReplyModal({
  review,
  onClose,
  onSend,
}: {
  review: Review;
  onClose: () => void;
  onSend: (id: string, reply: string) => void;
}) {
  const [reply, setReply] = useState("");
  const [generating, setGenerating] = useState(true);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchReply = async () => {
      try {
        const res = await fetch("/api/generate-reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewContent: review.content,
            rating: review.rating,
            authorName: review.authorName,
            sentiment: review.sentiment,
          }),
        });
        const data = await res.json();
        if (active) {
          if (data.reply) {
            setReply(data.reply);
          } else {
            setReply("Could not generate reply. Please try again.");
          }
          setGenerating(false);
        }
      } catch {
        if (active) {
          setReply("Failed to connect to AI service. Please try again.");
          setGenerating(false);
        }
      }
    };
    fetchReply();
    return () => { active = false; };
  }, [review.content, review.rating, review.authorName, review.sentiment]);

  const regenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewContent: review.content,
          rating: review.rating,
          authorName: review.authorName,
          sentiment: review.sentiment,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setReply(data.reply);
      } else {
        setReply("Could not generate reply. Please try again.");
      }
    } catch {
      setReply("Failed to connect to AI service. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSend = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    onSend(review.id, reply);
    setSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-primary" />
            </span>
            <div>
              <h3 className="font-bold text-on-surface text-lg">AI Reply Generator</h3>
              <p className="text-xs text-on-surface-variant">Responding to {review.authorName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original review */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Original Review</p>
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={review.rating} />
            <span className="text-xs text-on-surface-variant">by {review.authorName}</span>
          </div>
          <p className="text-sm text-on-surface-variant line-clamp-2">{review.content}</p>
        </div>

        {/* AI Reply */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-on-surface">AI-Generated Reply</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={regenerate}
                disabled={generating}
                className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", generating && "animate-spin")} />
                Regenerate
              </button>
            </div>
          </div>

          {generating ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="shimmer h-4 rounded-lg" style={{ width: `${85 - i * 15}%` }} />
              ))}
            </div>
          ) : (
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"
            />
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={sending || generating}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg",
                sending ? "bg-primary/60 cursor-not-allowed" : "bg-primary hover:opacity-90 active:scale-95"
              )}
            >
              {sending ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                "Post Reply"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onReply,
}: {
  review: Review;
  onReply: (review: Review) => void;
}) {
  const sentimentConfig = {
    positive: { color: "text-emerald-600 bg-emerald-50", icon: ThumbsUp },
    neutral: { color: "text-on-surface-variant bg-surface-container", icon: MessageCircle },
    negative: { color: "text-error bg-error-container", icon: ThumbsDown },
  };
  const { color, icon: SentIcon } = sentimentConfig[review.sentiment];

  return (
    <div className="bg-white rounded-xl border border-outline-variant p-6 animate-fade-in space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={review.authorAvatarUrl}
            alt={review.authorName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-on-surface">{review.authorName}</p>
            <p className="text-xs text-on-surface-variant">{formatDate(review.publishedAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("p-1.5 rounded-lg", color)}>
            <SentIcon className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-semibold text-on-surface-variant capitalize border border-outline-variant px-2 py-0.5 rounded-full">
            {review.source}
          </span>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-sm text-on-surface-variant leading-relaxed">{review.content}</p>

      {review.replied && review.replyContent && (
        <div className="border-l-4 border-primary/30 pl-4 bg-surface-container-low rounded-r-lg py-3">
          <p className="text-xs font-bold text-primary mb-1">Your Reply</p>
          <p className="text-sm text-on-surface-variant">{review.replyContent}</p>
        </div>
      )}

      {!review.replied && (
        <button
          onClick={() => onReply(review)}
          className="w-full py-2 border border-primary text-primary text-sm font-semibold rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Reply with AI
        </button>
      )}
    </div>
  );
}

type FilterKey = "All" | "Positive" | "Negative" | "Unreplied";

export default function ReviewsPage() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [reviews, setReviews] = useState(mockReviews);
  const [replyTarget, setReplyTarget] = useState<Review | null>(null);
  const [page, setPage] = useState(1);

  const positiveCount = reviews.filter((r) => r.sentiment === "positive").length;
  const negativeCount = reviews.filter((r) => r.sentiment === "negative").length;
  const unrepliedCount = reviews.filter((r) => !r.replied).length;
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const filteredReviews = reviews.filter((r) => {
    if (filter === "Positive") return r.sentiment === "positive";
    if (filter === "Negative") return r.sentiment === "negative";
    if (filter === "Unreplied") return !r.replied;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const pagedReviews = filteredReviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  const handleFilterChange = (f: FilterKey) => {
    setFilter(f);
    setPage(1);
  };

  const handleSendReply = (id: string, replyContent: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, replied: true, replyContent } : r
      )
    );
  };

  const filters: { key: FilterKey; label: string }[] = [
    { key: "All", label: `All (${reviews.length})` },
    { key: "Positive", label: `Positive (${positiveCount})` },
    { key: "Negative", label: `Negative (${negativeCount})` },
    { key: "Unreplied", label: `Need Reply (${unrepliedCount})` },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Reviews</h2>
          <p className="text-on-surface-variant mt-1">
            Monitor and respond to customer reviews across all platforms.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold border transition-colors",
                filter === key
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: reviews.length, color: "text-primary" },
          { label: "Avg Rating", value: `${avgRating.toFixed(1)} ★`, color: "text-amber-500" },
          { label: "Positive", value: positiveCount, color: "text-emerald-600" },
          { label: "Need Reply", value: unrepliedCount, color: "text-error" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-outline-variant p-4 text-center">
            <p className={cn("text-2xl font-bold", color)}>{value}</p>
            <p className="text-xs text-on-surface-variant mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Review Grid */}
      {pagedReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant p-16 text-center text-on-surface-variant">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No reviews in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pagedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onReply={setReplyTarget} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "w-9 h-9 rounded-xl text-sm font-semibold transition-colors",
                page === i + 1
                  ? "bg-primary text-white"
                  : "border border-outline-variant hover:bg-surface-container text-on-surface-variant"
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* AI Reply Modal */}
      {replyTarget && (
        <ReplyModal
          review={replyTarget}
          onClose={() => setReplyTarget(null)}
          onSend={handleSendReply}
        />
      )}
    </div>
  );
}
