// src/components/DashComments.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) fetchComments();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deletecomment/${commentToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((c) => c._id !== commentToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-10">
      <p className="text-gray-500">Loading comments...</p>
    </div>
  );

  if (!currentUser?.isAdmin) return (
    <p className="text-center text-gray-500 py-10">
      You are not authorized to view this page.
    </p>
  );

  return (
    <div className="overflow-x-auto">
      {comments.length > 0 ? (
        <>
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-[#0f172a] text-gray-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3">Likes</th>
                <th className="px-4 py-3">Post ID</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a]"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 max-w-xs line-clamp-2">
                    {comment.content}
                  </td>
                  <td className="px-4 py-3">
                    {comment.numberOfLikes}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {comment.postId}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {comment.userId}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentToDelete(comment._id);
                      }}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 py-4 text-sm hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No comments yet.
        </p>
      )}

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1e293b] rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteComment}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}