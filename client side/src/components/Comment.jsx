import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Button } from "flowbite-react";

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) setUser(data);
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
    try {
      const res = await fetch(
        `/api/comment/editComment/${comment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ add kiya
          body: JSON.stringify({ content: editedContent }),
        }
      );
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-start gap-3 border-b border-gray-200 py-4">

      {/* Profile picture */}
      <div className="w-10 h-10 rounded-full border-2 border-gray-500 overflow-hidden flex-shrink-0">
        <img
          src={
            user?.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={user?.username || "user"}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="flex-1">

        {/* Username + time */}
        <div className="flex items-center mb-1 gap-2">
          <span className="font-bold text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {/* Edit mode */}
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-2 w-full border rounded-md p-2 text-sm"
            />
            <div className="flex gap-2 justify-end text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 pb-2">{comment.content}</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-2">

          {/* Like */}
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`cursor-pointer text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) // ✅ _id use karo
                ? "!text-blue-500"
                : ""
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>

          {/* Like count */}
          <p className="text-gray-400 text-xs">
            {comment.numberOfLikes > 0 &&
              `${comment.numberOfLikes} ${
                comment.numberOfLikes === 1 ? "like" : "likes"
              }`}
          </p>

          {/* ✅ Edit/Delete — _id se compare karo */}
          {currentUser &&
            (String(currentUser._id) === String(comment.userId) ||
              currentUser.isAdmin) && (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="cursor-pointer text-gray-400 hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="cursor-pointer text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
}