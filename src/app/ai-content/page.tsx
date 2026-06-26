"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2, Copy, RefreshCw, CheckCircle2, Edit2, CalendarClock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  postType: z.enum(["update", "offer", "event", "product"]),
  topic: z.string().min(5, "Please describe the topic"),
  tone: z.enum(["professional", "friendly", "urgent", "informative"]),
  keywords: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AiContentPage() {
  const router = useRouter();
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const generatePost = async (data: FormValues) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    setIsEditing(false);
    setActionFeedback(null);
    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      const content = json.content ?? "Could not generate content. Please try again.";
      setGeneratedContent(content);
      setEditedContent(content);
    } catch {
      setGeneratedContent("Failed to connect to the AI service. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = handleSubmit(generatePost);

  const handleRegenerate = () => {
    const values = getValues();
    generatePost(values);
  };

  const handleCopy = () => {
    const text = isEditing ? editedContent : (generatedContent ?? "");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handlePublishNow = async () => {
    setActionFeedback("publishing");
    await new Promise((r) => setTimeout(r, 1200));
    setActionFeedback("published");
    setTimeout(() => setActionFeedback(null), 2500);
  };

  const handleSchedulePost = () => {
    router.push("/scheduled-posts");
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditedContent(generatedContent ?? "");
    }
    setIsEditing((v) => !v);
  };

  const displayContent = isEditing ? editedContent : (generatedContent ?? "");

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
  const labelClass = "block text-sm font-semibold text-on-surface mb-1.5";
  const errorClass = "text-xs text-error mt-1";

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary">AI Content Generator</h2>
        <p className="text-on-surface-variant mt-1">
          Generate SEO-optimized Google Business Profile posts with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6 bg-white rounded-xl border border-outline-variant p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-on-surface">Configure Your Post</h3>
          </div>

          <div>
            <label className={labelClass}>Business Name</label>
            <input {...register("businessName")} defaultValue="Rivera's Plumbing" className={inputClass} placeholder="Your business name" />
            {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Post Type</label>
            <select {...register("postType")} className={inputClass}>
              <option value="update">Update</option>
              <option value="offer">Offer / Promotion</option>
              <option value="event">Event</option>
              <option value="product">Product</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Topic / Description</label>
            <textarea
              {...register("topic")}
              rows={3}
              className={cn(inputClass, "resize-none")}
              placeholder="What is this post about? E.g., summer drain cleaning promotion..."
            />
            {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Tone of Voice</label>
            <select {...register("tone")} className={inputClass}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly &amp; Approachable</option>
              <option value="urgent">Urgent / Time-sensitive</option>
              <option value="informative">Informative &amp; Educational</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Target Keywords (optional)</label>
            <input {...register("keywords")} className={inputClass} placeholder="Chicago plumber, emergency plumbing..." />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all",
              isGenerating
                ? "bg-primary/60 cursor-not-allowed"
                : "bg-primary hover:opacity-90 active:scale-95 shadow-lg hover:shadow-primary/20"
            )}
          >
            {isGenerating ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Post</>
            )}
          </button>
        </form>

        {/* Output */}
        <div className="bg-white rounded-xl border border-outline-variant p-6 animate-fade-in flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-on-surface">Generated Content</h3>
            </div>
            {displayContent && !isGenerating && (
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold transition-colors",
                  copied ? "text-emerald-600" : "text-secondary hover:underline"
                )}
              >
                {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            )}
          </div>

          {isGenerating && (
            <div className="flex-1 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="shimmer h-4 rounded-lg" style={{ width: `${75 + i * 5}%` }} />
              ))}
            </div>
          )}

          {!isGenerating && displayContent && (
            <div className="flex-1 animate-fade-in flex flex-col">
              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={8}
                  className="flex-1 w-full px-4 py-3 bg-surface-container-low border border-primary/30 rounded-xl text-sm text-on-surface leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              ) : (
                <div className="flex-1 bg-surface-container-low rounded-xl p-5 text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                  {displayContent}
                </div>
              )}

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePublishNow}
                    disabled={actionFeedback === "publishing"}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                      actionFeedback === "published"
                        ? "bg-emerald-500 text-white"
                        : "bg-primary text-white hover:opacity-90 active:scale-95 shadow-md"
                    )}
                  >
                    {actionFeedback === "publishing" ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Publishing...</>
                    ) : actionFeedback === "published" ? (
                      <><CheckCircle2 className="w-3.5 h-3.5" /> Published!</>
                    ) : (
                      <><Send className="w-3.5 h-3.5" /> Publish Now</>
                    )}
                  </button>

                  <button
                    onClick={handleSchedulePost}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    <CalendarClock className="w-3.5 h-3.5" />
                    Schedule Post
                  </button>

                  <button
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={cn("w-3.5 h-3.5", isGenerating && "animate-spin")} />
                    Regenerate
                  </button>

                  <button
                    onClick={handleEditToggle}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors",
                      isEditing
                        ? "border-primary text-primary bg-primary/5"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                    )}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {isEditing ? "Done Editing" : "Edit"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isGenerating && !displayContent && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant py-12">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary/40" />
              </div>
              <p className="font-semibold text-on-surface mb-1">Ready to generate</p>
              <p className="text-sm max-w-xs">
                Configure your post details on the left and click &quot;Generate Post&quot; to create AI-powered content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
