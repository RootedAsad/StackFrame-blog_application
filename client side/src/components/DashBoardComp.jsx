import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  // Fetch all comments — only for admin users
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          // Hide "show more" if less than 9 comments returned
          if (data.comments.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  // Load more comments starting from current list length
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (res.ok) {
        // Append new comments to existing list
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete comment after confirmation
  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();

      if (res.ok) {
        // Remove deleted comment from local state
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full overflow-x-auto p-4">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="w-full min-w-[1000px] border-collapse table-fixed">

            {/* Table headers */}
            <thead className="border-b text-[11px] uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">DATE UPDATED</th>
                <th className="px-4 py-3 text-left">COMMENT CONTENT</th>
                <th className="px-4 py-3 text-left">NUMBER OF LIKES</th>
                <th className="px-4 py-3 text-left">POST ID</th>
                <th className="px-4 py-3 text-left">USER ID</th>
                <th className="px-4 py-3 text-left">DELETE</th>
              </tr>
            </thead>

            {/* Table rows — one per comment */}
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {/* Last updated date */}
                  <td className="px-4 py-4 text-sm text-gray-500 align-middle">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>

                  {/* Comment text content */}
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {comment.content}
                  </td>

                  {/* Total likes count */}
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {comment.numberOfLikes}
                  </td>

                  {/* Post this comment belongs to */}
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {comment.postId}
                  </td>

                  {/* User who wrote the comment */}
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {comment.userId}
                  </td>

                  {/* Delete button — opens confirmation modal */}
                  <td className="px-4 py-4 align-middle">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Load more comments button */}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-7 cursor-pointer hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        // Empty state
        <p className="text-center py-10 text-gray-500">
          You have no comments yet
        </p>
      )}

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <HiOutlineExclamationCircle className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteComment}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}