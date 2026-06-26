"use client";

import Link from "next/link";
import { CalendarClock, Clock, Send, FileText, Plus } from "lucide-react";
import { mockPosts } from "@/data/mockPosts";
import { Post, PostStatus } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";



const statusConfig: Record<PostStatus, { label: string; color: string }> = {
  published: { label: "Published", color: "bg-emerald-50 text-emerald-700" },
  scheduled: { label: "Scheduled", color: "bg-secondary-fixed text-secondary" },
  draft: { label: "Draft", color: "bg-surface-container text-on-surface-variant" },
  failed: { label: "Failed", color: "bg-error-container text-on-error-container" },
};

const typeConfig: Record<Post["type"], string> = {
  update: "bg-primary/10 text-primary",
  offer: "bg-amber-50 text-amber-700",
  event: "bg-purple-50 text-purple-700",
  product: "bg-emerald-50 text-emerald-700",
};

function PostCard({ post }: { post: Post }) {
  const { label, color } = statusConfig[post.status];
  return (
    <div className="bg-white rounded-xl border border-outline-variant p-5 animate-fade-in hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold uppercase", color)}>
            {label}
          </span>
          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold uppercase", typeConfig[post.type])}>
            {post.type}
          </span>
        </div>
      </div>
      <h4 className="font-semibold text-on-surface mb-2 line-clamp-1">{post.title}</h4>
      <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{post.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {post.status === "published" && post.publishedAt
              ? `Published ${formatDate(post.publishedAt)}`
              : `Scheduled for ${formatDate(post.scheduledAt)}`}
          </span>
        </div>
        {post.status === "published" && (
          <div className="flex items-center gap-3 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Send className="w-3 h-3" /> {post.clicks}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" /> {post.views}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ScheduledPostsPage() {
  const scheduled = mockPosts.filter((p) => p.status === "scheduled");
  const published = mockPosts.filter((p) => p.status === "published");
  const drafts = mockPosts.filter((p) => p.status === "draft");

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Scheduled Posts</h2>
          <p className="text-on-surface-variant mt-1">
            Manage your Google Business Profile posts across all locations.
          </p>
        </div>
        <Link
          href="/ai-content"
          className="bg-primary text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Scheduled", count: scheduled.length, icon: CalendarClock, color: "text-secondary bg-secondary/10" },
          { label: "Published", count: published.length, icon: Send, color: "text-emerald-600 bg-emerald-50" },
          { label: "Drafts", count: drafts.length, icon: FileText, color: "text-amber-500 bg-amber-50" },
        ].map(({ label, count, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-outline-variant p-5 flex items-center gap-4">
            <span className={cn("p-3 rounded-xl", color)}>
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-on-surface">{count}</p>
              <p className="text-sm text-on-surface-variant">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {scheduled.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-secondary" />
            Scheduled ({scheduled.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduled.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-600" />
          Published ({published.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {published.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </section>

      {drafts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Drafts ({drafts.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drafts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
