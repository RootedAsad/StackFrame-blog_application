import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts", {
          credentials: "include",  // ✅ fix
        });
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`, {
        credentials: "include",  // ✅ fix
      });
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",  // ✅ fix
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full overflow-x-auto p-4">

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-gray-500 text-sm animate-pulse">
            Loading posts...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && userPosts.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          You have no posts yet
        </p>
      )}

      {/* Table */}
      {!loading && userPosts.length > 0 && (
        <>
          <table className="w-full min-w-[1100px] border-collapse table-fixed">
            <thead className="border-b text-[11px] uppercase text-gray-500">
              <tr>
                <th className="w-[120px] px-4 py-3 text-left font-semibold leading-4">
                  DATE <br /> UPDATED
                </th>
                <th className="w-[120px] px-4 py-3 text-left font-semibold">
                  POST IMAGE
                </th>
                <th className="w-[520px] px-4 py-3 text-left font-semibold">
                  POST TITLE
                </th>
                <th className="w-[140px] px-4 py-3 text-left font-semibold">
                  CATEGORY
                </th>
                {currentUser?.isAdmin && (
                  <th className="w-[90px] px-4 py-3 text-left font-semibold">
                    DELETE
                  </th>
                )}
                {currentUser?.isAdmin && (
                  <th className="w-[90px] px-4 py-3 text-left font-semibold">
                    EDIT
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-4 text-sm text-gray-500 align-middle">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-sm text-gray-800 dark:text-gray-200 hover:text-black font-medium leading-5"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 capitalize align-middle">
                    {post.category}
                  </td>
                  {currentUser?.isAdmin && (
                    <td className="px-4 py-4 align-middle">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  {currentUser?.isAdmin && (
                    <td className="px-4 py-4 align-middle">
                      <Link
                        to={`/update-post/${post._id}`}
                        className="text-teal-500 text-sm hover:text-teal-700 cursor-pointer"
                      >
                        Edit
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-7 cursor-pointer hover:underline"
            >
              Show more
            </button>
          )}
        </>
      )}

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <HiOutlineExclamationCircle className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeletePost}
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