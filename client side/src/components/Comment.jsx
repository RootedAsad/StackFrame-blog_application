import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaThumbsUp,
  FaRegClock,
  FaRegEdit,
  FaRegTrashAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { BASE_URL } from "../config";

export default function Comment({
  comment,
  onLike,
  currentUser,
  onEdit,
  onDelete,
}) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    const trimmedContent = editedContent.trim();

    if (!trimmedContent) return;

    try {
      setIsSaving(true);

      const res = await fetch(
        `${BASE_URL}/api/comment/editComment/${comment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: trimmedContent,
          }),
        }
      );

      if (res.ok) {
        setIsEditing(false);
        setEditedContent(trimmedContent);
        onEdit(comment, trimmedContent);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const isLiked =
    currentUser &&
    Array.isArray(comment.likes) &&
    comment.likes.includes(currentUser._id);

  const canManageComment =
    currentUser &&
    (String(currentUser._id) === String(comment.userId) ||
      currentUser.isAdmin);

  return (
    <article
      className="
        group relative mb-4 rounded-[22px]
        border border-[#dfe9e5]
        bg-white/90 p-5
        shadow-[0_8px_30px_rgba(31,64,54,0.05)]
        transition-all duration-300
        hover:-translate-y-[2px]
        hover:border-teal-200
        hover:shadow-[0_14px_35px_rgba(31,64,54,0.08)]
        dark:border-gray-800
        dark:bg-[#111916]/90
        dark:hover:border-teal-900
      "
    >
      <div className="flex items-start gap-4">
        {/* Profile image */}
        <div className="relative shrink-0">
          <div
            className="
              h-11 w-11 overflow-hidden rounded-full
              border border-[#cfe2dc]
              bg-[#edf6f3]
              p-[2px]
              dark:border-gray-700
              dark:bg-gray-800
            "
          >
            <img
              src={
                user?.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={user?.username || "user"}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <span
            className="
              absolute bottom-0 right-0
              h-3 w-3 rounded-full
              border-2 border-white
              bg-teal-500
              dark:border-[#111916]
            "
            aria-hidden="true"
          />
        </div>

        {/* Comment content */}
        <div className="min-w-0 flex-1">
          {/* User information */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="
                truncate text-[14px] font-bold
                tracking-[-0.01em] text-[#173b32]
                dark:text-gray-100
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {user ? `@${user.username}` : "anonymous user"}
            </span>

            <span
              className="
                inline-flex items-center gap-1
                text-[11px] font-medium
                text-gray-400
                dark:text-gray-500
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              <FaRegClock className="text-[10px]" />
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {/* Comment body / Edit mode */}
          {isEditing ? (
            <div className="mt-4">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                maxLength={200}
                autoFocus
                className="
                  min-h-[105px] w-full resize-none
                  rounded-[16px]
                  border border-teal-200
                  bg-[#f8fbfa]
                  px-4 py-3
                  text-[14px] leading-6
                  text-gray-700
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-teal-500
                  focus:ring-4
                  focus:ring-teal-500/10
                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-gray-200
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span
                  className="text-[11px] text-gray-400"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {200 - editedContent.length} characters remaining
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-gray-200
                      bg-white px-4 py-2
                      text-[12px] font-bold
                      text-gray-600
                      transition-all duration-200
                      hover:border-gray-300
                      hover:bg-gray-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      dark:border-gray-700
                      dark:bg-gray-900
                      dark:text-gray-300
                      dark:hover:bg-gray-800
                    "
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    <FaTimes className="text-[10px]" />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || !editedContent.trim()}
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      bg-[#16796f] px-4 py-2
                      text-[12px] font-bold
                      text-white
                      shadow-[0_6px_18px_rgba(22,121,111,0.18)]
                      transition-all duration-200
                      hover:-translate-y-[1px]
                      hover:bg-[#11675f]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    <FaCheck className="text-[10px]" />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p
              className="
                mt-3 whitespace-pre-wrap
                text-[14px] leading-7
                text-[#52655f]
                dark:text-gray-300
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {/* Like */}
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                aria-label={
                  isLiked ? "Unlike this comment" : "Like this comment"
                }
                className={`
                  inline-flex items-center gap-2
                  rounded-full
                  border px-3 py-1.5
                  text-[11px] font-bold
                  transition-all duration-200
                  ${
                    isLiked
                      ? "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300"
                      : "border-gray-200 bg-white text-gray-400 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-teal-900 dark:hover:bg-teal-950/30 dark:hover:text-teal-300"
                  }
                `}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <FaThumbsUp
                  className={`text-[10px] transition-transform duration-200 ${
                    isLiked ? "scale-110" : ""
                  }`}
                />

                {comment.numberOfLikes > 0
                  ? `${comment.numberOfLikes} ${
                      comment.numberOfLikes === 1 ? "like" : "likes"
                    }`
                  : "Like"}
              </button>

              {/* Edit */}
              {canManageComment && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full px-3 py-1.5
                    text-[11px] font-bold
                    text-gray-400
                    transition-all duration-200
                    hover:bg-gray-100
                    hover:text-[#16796f]
                    dark:hover:bg-gray-800
                    dark:hover:text-teal-300
                  "
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  <FaRegEdit className="text-[10px]" />
                  Edit
                </button>
              )}

              {/* Delete */}
              {canManageComment && (
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full px-3 py-1.5
                    text-[11px] font-bold
                    text-gray-400
                    transition-all duration-200
                    hover:bg-red-50
                    hover:text-red-500
                    dark:hover:bg-red-950/20
                    dark:hover:text-red-400
                  "
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  <FaRegTrashAlt className="text-[10px]" />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}