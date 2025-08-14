"use client";

import React from "react";
import useComments from "@/hooks/useComments";
import { RenderIf } from "@/utils/RenderIf";

/**
 * Props:
 * - initialComments
 * - isError
 * - isLoading
 * - hookOptions: { resourceId, parentField, createFn, deleteFn, invalidateKey }
 */
export default function CommentsSection({
  initialComments,
  isError,
  isLoading,
  hookOptions,
  title = "Comments",
  listId = "comments",
}) {
  const {
    userId,
    newComment,
    setNewComment,
    showAll,
    setShowAll,
    visibleComments,
    hasAny,
    canToggle,
    isPosting,
    deletingIds,
    handleAddComment,
    handleDelete,
  } = useComments({ initialComments, ...hookOptions });

  return (
    <section
      aria-labelledby={`${listId}-heading`}
      className="glass md:p-6 p-4 backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-xl"
    >
      <h2
        id={`${listId}-heading`}
        className="text-2xl font-semibold text-white mb-4"
      >
        {title}
      </h2>

      <div className="space-y-4">
        <RenderIf condition={hasAny && !isError}>
          <div
            id={listId}
            className=" grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="list"
            aria-label={`${title} list`}
            aria-busy={isLoading ? "true" : "false"}
          >
            {visibleComments.map((comment) => {
              const isMine = comment?.author?.id === userId;
              const isDeleting = deletingIds.has(comment.id);

              return (
                <div
                  key={comment.id ?? comment.content}
                  role="listitem"
                  className="flex items-center justify-between rounded-lg border border-white/15 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-4"
                >
                  <div className="min-w-0">
                    <p className="text-gray-900 dark:text-gray-100 break-words">
                      {comment.content}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      {comment.author?.name ??
                        comment.author?.username ??
                        comment.author?.email ??
                        "Unknown"}
                    </p>
                  </div>

                  {isMine && (
                    <button
                      type="button"
                      onClick={() => handleDelete(comment.id)}
                      disabled={isDeleting}
                      className="btn-glass ml-4 shrink-0"
                      aria-label="Delete your comment"
                      title="Delete"
                    >
                      {isDeleting ? "Deleting…" : "Delete"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </RenderIf>

        <RenderIf condition={isLoading}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="glass-skeleton h-12 w-full border border-white/15 dark:border-white/10"
            />
          ))}
        </RenderIf>

        <RenderIf condition={!hasAny && !isLoading && !isError}>
          <p className="text-white/90">No comments yet.</p>
        </RenderIf>

        <RenderIf condition={!isError && canToggle}>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setShowAll((s) => !s)}
            className="btn-glass mt-2"
            aria-expanded={showAll}
            aria-controls={listId}
          >
            {showAll
              ? "Hide Comments"
              : `Show All Comments (${(initialComments || []).length})`}
          </button>
        </RenderIf>
      </div>

      <div className="glass-divider my-4" />

      <div className="mt-4 flex items-center gap-2">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Add a comment
        </label>
        <input
          id={`${listId}-input`}
          type="text"
          autoComplete="off"
          placeholder={`${
            !userId ? "You need to sign in to " : ""
          }Add a comment...`}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!userId || isPosting}
          className="glass-input flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
          aria-disabled={!userId || isPosting}
        />
        <button
          type="button"
          onClick={handleAddComment}
          disabled={!userId || !newComment.trim() || isPosting}
          className="btn-glass"
        >
          {isPosting ? "Posting…" : "Post"}
        </button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {isPosting ? "Posting your comment" : ""}
      </p>
    </section>
  );
}
