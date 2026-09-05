import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BASE_URL } from "../config";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ================================================================
     FETCH POSTS
  ================================================================= */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/api/post/getposts",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          const posts = data.posts || [];

          setUserPosts(posts);

          if (posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* ================================================================
     SHOW MORE
  ================================================================= */
  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;

      const res = await fetch(
        `${BASE_URL}/api/post/getposts?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        const newPosts = data.posts || [];

        setUserPosts((prev) => [
          ...prev,
          ...newPosts,
        ]);

        if (newPosts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================================================================
     DELETE POST
  ================================================================= */
  const handleDeletePost = async () => {
    if (!postIdToDelete || !currentUser?._id) {
      return;
    }

    try {
      setDeleting(true);

      const res = await fetch(
        `${BASE_URL}/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setUserPosts((prev) =>
        prev.filter(
          (post) => post._id !== postIdToDelete
        )
      );

      setShowModal(false);
      setPostIdToDelete("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ================================================================
     LOADING
  ================================================================= */
  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[280px]
          w-full
          items-center
          justify-center
        "
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="
              h-7
              w-7
              animate-spin
              rounded-full
              border-2
              border-teal-100
              border-t-teal-500
              dark:border-teal-900
              dark:border-t-teal-400
            "
            aria-hidden="true"
          />

          <p
            className="
              text-xs
              font-medium
              text-gray-500
              dark:text-gray-400
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Loading posts...
          </p>
        </div>
      </div>
    );
  }

  /* ================================================================
     EMPTY STATE
  ================================================================= */
  if (!userPosts.length) {
    return (
      <div
        className="
          flex
          min-h-[280px]
          w-full
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-teal-50
            text-teal-600
            dark:bg-teal-950/40
            dark:text-teal-400
          "
        >
          <span className="text-lg">+</span>
        </div>

        <h3
          className="
            text-[25px]
            leading-none
            text-gray-900
            dark:text-white
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
          }}
        >
          No posts yet
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
            dark:text-gray-400
          "
          style={{
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          You have no posts to display.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* ==========================================================
            SECTION INTRO
        =========================================================== */}
        <div
          className="
            mb-5
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-teal-600
                dark:text-teal-400
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Publishing
            </span>

            <h2
              className="
                mt-1
                text-[30px]
                leading-none
                text-gray-900
                dark:text-white
              "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              Your posts
            </h2>
          </div>

          <p
            className="
              text-xs
              text-gray-400
              dark:text-gray-500
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Manage your published stories
          </p>
        </div>

        {/* ==========================================================
            TABLE
        =========================================================== */}
        <div
          className="
            w-full
            overflow-x-auto
            rounded-[14px]
            border
            border-gray-100
            dark:border-gray-800
          "
        >
          <table
            className="
              w-full
              min-w-[820px]
              table-auto
              border-collapse
              text-left
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            <thead
              className="
                border-b
                border-gray-200
                bg-[#fbfefd]
                dark:border-gray-800
                dark:bg-white/[0.025]
              "
            >
              <tr>
                <th
                  className="
                    w-[125px]
                    px-4
                    py-4
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    sm:px-5
                  "
                >
                  <span className="block">Date</span>
                  <span className="block">Updated</span>
                </th>

                <th
                  className="
                    w-[105px]
                    px-4
                    py-4
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    sm:px-5
                  "
                >
                  Post Image
                </th>

                <th
                  className="
                    min-w-[230px]
                    px-4
                    py-4
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    sm:px-5
                  "
                >
                  Post Title
                </th>

                <th
                  className="
                    w-[120px]
                    px-4
                    py-4
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    sm:px-5
                  "
                >
                  Category
                </th>

                {currentUser?.isAdmin && (
                  <th
                    className="
                      w-[95px]
                      px-4
                      py-4
                      text-left
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-gray-400
                      sm:px-5
                    "
                  >
                    Delete
                  </th>
                )}

                {currentUser?.isAdmin && (
                  <th
                    className="
                      w-[85px]
                      px-4
                      py-4
                      text-left
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-gray-400
                      sm:px-5
                    "
                  >
                    Edit
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="
                    border-b
                    border-gray-100
                    transition-colors
                    duration-200
                    last:border-b-0
                    hover:bg-[#f7fcfb]
                    dark:border-gray-800
                    dark:hover:bg-white/[0.025]
                  "
                >
                  {/* DATE */}
                  <td
                    className="
                      whitespace-nowrap
                      px-4
                      py-4
                      text-[12px]
                      font-medium
                      text-gray-500
                      sm:px-5
                      dark:text-gray-400
                    "
                  >
                    {new Date(
                      post.updatedAt
                    ).toLocaleDateString()}
                  </td>

                  {/* IMAGE */}
                  <td className="px-4 py-4 sm:px-5">
                    <Link
                      to={`/post/${post.slug}`}
                      aria-label={`View ${post.title}`}
                      className="block w-fit"
                    >
                      <div
                        className="
                          h-11
                          w-16
                          overflow-hidden
                          rounded-lg
                          border
                          border-gray-200
                          bg-gray-100
                          dark:border-gray-700
                          dark:bg-gray-800
                        "
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-300
                            hover:scale-105
                            motion-reduce:transition-none
                            motion-reduce:hover:scale-100
                          "
                        />
                      </div>
                    </Link>
                  </td>

                  {/* TITLE */}
                  <td
                    className="
                      max-w-[330px]
                      px-4
                      py-4
                      sm:px-5
                    "
                  >
                    <Link
                      to={`/post/${post.slug}`}
                      className="
                        block
                        max-w-[330px]
                        truncate
                        text-[14px]
                        font-semibold
                        leading-5
                        text-gray-800
                        transition-colors
                        duration-200
                        hover:text-teal-600
                        dark:text-gray-200
                        dark:hover:text-teal-400
                      "
                    >
                      {post.title}
                    </Link>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-4 sm:px-5">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-teal-100
                        bg-teal-50
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-teal-700
                        dark:border-teal-900
                        dark:bg-teal-950/30
                        dark:text-teal-400
                      "
                    >
                      {post.category}
                    </span>
                  </td>

                  {/* DELETE */}
                  {currentUser?.isAdmin && (
                    <td className="px-4 py-4 sm:px-5">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-red-100
                          bg-red-50
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          text-red-500
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-red-200
                          hover:bg-red-100
                          hover:text-red-600
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-red-400
                          focus-visible:outline-offset-2
                          dark:border-red-900/50
                          dark:bg-red-950/20
                          dark:text-red-400
                          dark:hover:border-red-800
                          dark:hover:bg-red-950/40
                          motion-reduce:transform-none
                        "
                      >
                        Delete
                      </button>
                    </td>
                  )}

                  {/* EDIT */}
                  {currentUser?.isAdmin && (
                    <td className="px-4 py-4 sm:px-5">
                      <Link
                        to={`/update-post/${post._id}`}
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-teal-100
                          bg-teal-50
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          text-teal-700
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-teal-200
                          hover:bg-teal-100
                          hover:text-teal-800
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-teal-500
                          focus-visible:outline-offset-2
                          dark:border-teal-900
                          dark:bg-teal-950/30
                          dark:text-teal-400
                          dark:hover:border-teal-800
                          dark:hover:bg-teal-950/50
                          motion-reduce:transform-none
                        "
                      >
                        Edit
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==========================================================
            SHOW MORE
        =========================================================== */}
        {showMore && (
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handleShowMore}
              className="
                rounded-full
                border
                border-teal-200
                px-5
                py-2.5
                text-xs
                font-semibold
                text-teal-700
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-teal-400
                hover:bg-teal-50
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-teal-500
                focus-visible:outline-offset-2
                dark:border-teal-800
                dark:text-teal-400
                dark:hover:border-teal-700
                dark:hover:bg-teal-950/30
                motion-reduce:transform-none
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* ============================================================
          DELETE MODAL
      ============================================================= */}
      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-gray-950/50
            px-5
            backdrop-blur-[2px]
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-post-title"
        >
          <div
            className="
              w-full
              max-w-[410px]
              rounded-[24px]
              border
              border-gray-200
              bg-white
              p-7
              text-center
              shadow-[0_25px_70px_rgba(0,0,0,0.18)]
              dark:border-gray-700
              dark:bg-[#101918]
              dark:shadow-[0_25px_70px_rgba(0,0,0,0.45)]
              sm:p-8
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
                dark:bg-red-950/30
              "
            >
              <HiOutlineExclamationCircle
                className="
                  h-8
                  w-8
                  text-red-500
                  dark:text-red-400
                "
                aria-hidden="true"
              />
            </div>

            <h3
              id="delete-post-title"
              className="
                text-[27px]
                leading-[1.05]
                text-gray-900
                dark:text-white
              "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              Delete this post?
            </h3>

            <p
              className="
                mx-auto
                mt-3
                max-w-[300px]
                text-[13px]
                leading-6
                text-gray-500
                dark:text-gray-400
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              This action cannot be undone. The selected
              post will be permanently removed.
            </p>

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:justify-center
              "
            >
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={deleting}
                className="
                  inline-flex
                  min-h-[44px]
                  flex-1
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-5
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-red-600
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-red-500
                  focus-visible:outline-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  motion-reduce:transform-none
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, I'm sure"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!deleting) {
                    setShowModal(false);
                    setPostIdToDelete("");
                  }
                }}
                disabled={deleting}
                className="
                  inline-flex
                  min-h-[44px]
                  flex-1
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  px-5
                  text-xs
                  font-bold
                  text-gray-600
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-gray-300
                  hover:bg-gray-50
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-gray-400
                  focus-visible:outline-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-gray-700
                  dark:bg-white/[0.03]
                  dark:text-gray-300
                  dark:hover:bg-white/[0.06]
                  motion-reduce:transform-none
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}