// /hooks/useComments.js
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSessionUser } from "@/actions/users";

/**
 * Generic comments hook for any parent entity (event, venue, post, etc.)
 *
 * props:
 * - initialComments: array of comments (must include author.id for delete button visibility)
 * - resourceId: the parent entity id (eventId, venueId, etc.)
 * - parentField: name of the key to send to createFn (e.g. "eventId" or "venueId")
 * - createFn: server action to create comment: ({ authorId, data: { content, [parentField]: resourceId }})
 * - deleteFn: server action to delete comment: ({ commentId })
 * - invalidateKey: the react-query key to invalidate after mutations (e.g. [QUERY_KEYS.EVENTS, id])
 */
export default function useComments({
  initialComments,
  resourceId,
  parentField, // "eventId" | "venueId" | ...
  createFn,
  deleteFn,
  invalidateKey,
}) {
  const [userId, setUserId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [comments, setComments] = useState(() => initialComments || []);
  const [deletingIds, setDeletingIds] = useState(new Set());

  useEffect(() => setComments(initialComments || []), [initialComments]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getSessionUser();
        if (mounted) setUserId(user?.id || null);
      } catch {
        if (mounted) setUserId(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const queryClient = useQueryClient();

  const { mutateAsync: addComment, isPending: isPosting } = useMutation({
    mutationFn: (vars) => createFn(vars),
  });
  const { mutateAsync: removeComment } = useMutation({
    mutationFn: (vars) => deleteFn(vars),
  });

  const INITIAL_SLICE = 3;
  const hasAny = (comments?.length || 0) > 0;
  const canToggle = (comments?.length || 0) > INITIAL_SLICE;

  const visibleComments = useMemo(() => {
    if (!Array.isArray(comments)) return [];
    return showAll ? comments : comments.slice(0, INITIAL_SLICE);
  }, [comments, showAll]);

  async function handleAddComment() {
    const content = newComment.trim();
    if (!content || !userId || isPosting) return;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      content,
      author: { id: userId, name: "You" },
      _optimistic: true,
    };
    setComments((prev) => [optimistic, ...prev]);
    setNewComment("");

    try {
      const created = await addComment({
        authorId: userId,
        data: { content, [parentField]: resourceId },
      });

      if (created) {
        setComments((prev) => prev.map((c) => (c.id === tempId ? created : c)));
      } else {
        setComments((prev) => prev.filter((c) => c.id !== tempId));
        setNewComment(content);
      }
      if (invalidateKey)
        queryClient.invalidateQueries({ queryKey: invalidateKey });
    } catch {
      setComments((prev) => prev.filter((c) => c.id !== tempId));
      setNewComment(content);
    }
  }

  async function handleDelete(commentId) {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Delete this comment?");
      if (!ok) return;
    }

    setDeletingIds((s) => new Set(s).add(commentId));
    const snapshot = comments;
    setComments((prev) => prev.filter((c) => c.id !== commentId));

    try {
      const res = await removeComment({ commentId });
      if (!res?.ok) throw new Error(res?.error || "Failed to delete");
      if (invalidateKey)
        queryClient.invalidateQueries({ queryKey: invalidateKey });
    } catch {
      setComments(snapshot);
    } finally {
      setDeletingIds((s) => {
        const next = new Set(s);
        next.delete(commentId);
        return next;
      });
    }
  }

  return {
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
  };
}
