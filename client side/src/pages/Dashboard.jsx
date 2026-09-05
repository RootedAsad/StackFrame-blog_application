import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

import { BASE_URL } from "../config";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/api/user/getusers?limit=5",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/api/post/getposts?limit=5",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/api/comment/getcomments?limit=5",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 dark:bg-[#0b1413] dark:text-gray-100">
      {/* =========================================================
          DASHBOARD LAYOUT
      ========================================================== */}
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        {/* =======================================================
            SIDEBAR
        ======================================================== */}
        <aside
          className="
            w-full
            shrink-0
            border-b
            border-teal-100
            bg-[#f7fcfb]
            dark:border-teal-900/40
            dark:bg-[#0d1716]
            md:w-[255px]
            md:border-b-0
            md:border-r
          "
        >
          <div className="md:sticky md:top-0 md:h-screen">
            <DashSidebar />
          </div>
        </aside>

        {/* =======================================================
            MAIN CONTENT
        ======================================================== */}
        <main className="min-w-0 flex-1">
          <div
            className="
              mx-auto
              w-full
              max-w-[1180px]
              px-5
              py-10
              sm:px-8
              sm:py-12
              lg:px-10
              lg:py-12
            "
          >
            {/* ===================================================
                DASHBOARD TAB
            ==================================================== */}
            {tab === "dash" && (
              <div className="animate-[fadeUp_0.45s_ease-out]">
                {/* ===============================================
                    HERO
                ================================================ */}
                <section className="mb-12">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-teal-500" />

                    <span
                      className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-teal-600
                        dark:text-teal-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      Your Journal
                    </span>
                  </div>

                  <h1
                    className="
                      mt-3
                      text-[44px]
                      leading-[0.98]
                      tracking-[-0.02em]
                      text-gray-950
                      sm:text-[54px]
                      lg:text-[58px]
                      dark:text-white
                    "
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Welcome back
                    {currentUser?.username
                      ? `, ${currentUser.username}`
                      : ""}
                    .
                  </h1>

                  <p
                    className="
                      mt-3
                      max-w-[560px]
                      text-sm
                      leading-6
                      text-gray-500
                      sm:text-[15px]
                      dark:text-gray-400
                    "
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Here&apos;s a snapshot of the journal right now.
                  </p>
                </section>

                {/* ===============================================
                    STATISTICS
                ================================================ */}
                <section
                  className="
                    mb-12
                    grid
                    grid-cols-1
                    border-y
                    border-teal-100
                    sm:grid-cols-3
                    dark:border-teal-900/40
                  "
                >
                  {/* Users */}
                  <div
                    className="
                      flex
                      min-h-[108px]
                      flex-col
                      justify-center
                      border-b
                      border-teal-100
                      py-5
                      sm:px-8
                      sm:py-4
                      sm:border-b-0
                      sm:border-r
                      dark:border-teal-900/40
                    "
                  >
                    <span
                      className="
                        text-[42px]
                        leading-none
                        text-gray-950
                        sm:text-[46px]
                        dark:text-white
                      "
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {totalUsers}
                    </span>

                    <span
                      className="
                        mt-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                        dark:text-gray-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      Total Users
                    </span>

                    <span
                      className="
                        mt-1
                        text-[11px]
                        text-teal-600
                        dark:text-teal-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      +{lastMonthUsers} last month
                    </span>
                  </div>

                  {/* Comments */}
                  <div
                    className="
                      flex
                      min-h-[108px]
                      flex-col
                      justify-center
                      border-b
                      border-teal-100
                      py-5
                      sm:px-8
                      sm:py-4
                      sm:border-b-0
                      sm:border-r
                      dark:border-teal-900/40
                    "
                  >
                    <span
                      className="
                        text-[42px]
                        leading-none
                        text-gray-950
                        sm:text-[46px]
                        dark:text-white
                      "
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {totalComments}
                    </span>

                    <span
                      className="
                        mt-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                        dark:text-gray-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      Total Comments
                    </span>

                    <span
                      className="
                        mt-1
                        text-[11px]
                        text-teal-600
                        dark:text-teal-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      +{lastMonthComments} last month
                    </span>
                  </div>

                  {/* Posts */}
                  <div
                    className="
                      flex
                      min-h-[108px]
                      flex-col
                      justify-center
                      py-5
                      sm:px-8
                      sm:py-4
                    "
                  >
                    <span
                      className="
                        text-[42px]
                        leading-none
                        text-gray-950
                        sm:text-[46px]
                        dark:text-white
                      "
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {totalPosts}
                    </span>

                    <span
                      className="
                        mt-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                        dark:text-gray-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      Total Posts
                    </span>

                    <span
                      className="
                        mt-1
                        text-[11px]
                        text-teal-600
                        dark:text-teal-400
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      +{lastMonthPosts} last month
                    </span>
                  </div>
                </section>

                {/* ===============================================
                    RECENT USERS
                ================================================ */}
                <section
                  className="
                    mb-8
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-teal-100
                    bg-white
                    shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                    dark:border-teal-900/40
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-gray-100
                      px-5
                      py-5
                      sm:px-7
                      dark:border-gray-800
                    "
                  >
                    <div>
                      <span
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-teal-600
                          dark:text-teal-400
                        "
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        Community
                      </span>

                      <h2
                        className="
                          mt-1
                          text-[28px]
                          leading-none
                          text-gray-900
                          dark:text-gray-100
                        "
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 600,
                        }}
                      >
                        Recent Users
                      </h2>
                    </div>

                    <Link to="/dashboard?tab=users">
                      <button
                        type="button"
                        className="
                          rounded-full
                          border
                          border-gray-200
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-gray-600
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-teal-400
                          hover:text-teal-600
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-teal-500
                          focus-visible:outline-offset-2
                          dark:border-gray-700
                          dark:text-gray-300
                          dark:hover:border-teal-700
                          dark:hover:text-teal-400
                          motion-reduce:transform-none
                        "
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        See all
                      </button>
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table
                      className="
                        w-full
                        min-w-[420px]
                        text-left
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                      "
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      <thead
                        className="
                          border-b
                          border-gray-100
                          text-[10px]
                          uppercase
                          tracking-[0.14em]
                          text-gray-400
                          dark:border-gray-800
                          dark:text-gray-500
                        "
                      >
                        <tr>
                          <th className="px-5 py-3 font-bold sm:px-7">
                            User Image
                          </th>

                          <th className="px-5 py-3 font-bold sm:px-7">
                            Username
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user._id}
                            className="
                              border-b
                              border-gray-100
                              transition-colors
                              duration-150
                              hover:bg-[#f7fcfb]
                              last:border-b-0
                              dark:border-gray-800
                              dark:hover:bg-white/[0.035]
                            "
                          >
                            <td className="px-5 py-3 sm:px-7">
                              <img
                                src={user.profilePicture}
                                alt={user.username}
                                className="
                                  h-9
                                  w-9
                                  rounded-full
                                  border
                                  border-gray-200
                                  bg-gray-100
                                  object-cover
                                  dark:border-gray-700
                                "
                              />
                            </td>

                            <td
                              className="
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-gray-800
                                sm:px-7
                                dark:text-gray-200
                              "
                            >
                              {user.username}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* ===============================================
                    POSTS + COMMENTS
                ================================================ */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                  {/* Recent Posts */}
                  <section
                    className="
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-teal-100
                      bg-white
                      shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                      dark:border-teal-900/40
                      dark:bg-white/[0.035]
                      dark:shadow-none
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-gray-100
                        px-5
                        py-5
                        sm:px-7
                        dark:border-gray-800
                      "
                    >
                      <div>
                        <span
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
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
                            text-[28px]
                            leading-none
                            text-gray-900
                            dark:text-gray-100
                          "
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 600,
                          }}
                        >
                          Recent Posts
                        </h2>
                      </div>

                      <Link to="/dashboard?tab=posts">
                        <button
                          type="button"
                          className="
                            rounded-full
                            border
                            border-gray-200
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-gray-600
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:border-teal-400
                            hover:text-teal-600
                            focus-visible:outline
                            focus-visible:outline-2
                            focus-visible:outline-teal-500
                            focus-visible:outline-offset-2
                            dark:border-gray-700
                            dark:text-gray-300
                            dark:hover:border-teal-700
                            dark:hover:text-teal-400
                            motion-reduce:transform-none
                          "
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          See all
                        </button>
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table
                        className="
                          w-full
                          min-w-[600px]
                          text-left
                          text-sm
                          text-gray-600
                          dark:text-gray-300
                        "
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        <thead
                          className="
                            border-b
                            border-gray-100
                            text-[10px]
                            uppercase
                            tracking-[0.14em]
                            text-gray-400
                            dark:border-gray-800
                            dark:text-gray-500
                          "
                        >
                          <tr>
                            <th className="px-5 py-3 font-bold sm:px-7">
                              Post Image
                            </th>

                            <th className="px-5 py-3 font-bold sm:px-7">
                              Title
                            </th>

                            <th className="px-5 py-3 font-bold sm:px-7">
                              Category
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {posts.map((post) => (
                            <tr
                              key={post._id}
                              className="
                                border-b
                                border-gray-100
                                transition-colors
                                duration-150
                                hover:bg-[#f7fcfb]
                                last:border-b-0
                                dark:border-gray-800
                                dark:hover:bg-white/[0.035]
                              "
                            >
                              <td className="px-5 py-3 sm:px-7">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="
                                    h-10
                                    w-14
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-gray-100
                                    object-cover
                                    dark:border-gray-700
                                  "
                                />
                              </td>

                              <td
                                className="
                                  max-w-[250px]
                                  px-5
                                  py-3
                                  text-sm
                                  font-medium
                                  leading-5
                                  text-gray-800
                                  sm:px-7
                                  dark:text-gray-200
                                "
                              >
                                {post.title}
                              </td>

                              <td
                                className="
                                  px-5
                                  py-3
                                  text-xs
                                  text-gray-500
                                  sm:px-7
                                  dark:text-gray-400
                                "
                              >
                                {post.category}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Recent Comments */}
                  <section
                    className="
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-teal-100
                      bg-white
                      shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                      dark:border-teal-900/40
                      dark:bg-white/[0.035]
                      dark:shadow-none
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-gray-100
                        px-5
                        py-5
                        sm:px-7
                        dark:border-gray-800
                      "
                    >
                      <div>
                        <span
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-teal-600
                            dark:text-teal-400
                          "
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          Discussion
                        </span>

                        <h2
                          className="
                            mt-1
                            text-[28px]
                            leading-none
                            text-gray-900
                            dark:text-gray-100
                          "
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 600,
                          }}
                        >
                          Recent Comments
                        </h2>
                      </div>

                      <Link to="/dashboard?tab=comments">
                        <button
                          type="button"
                          className="
                            rounded-full
                            border
                            border-gray-200
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-gray-600
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:border-teal-400
                            hover:text-teal-600
                            focus-visible:outline
                            focus-visible:outline-2
                            focus-visible:outline-teal-500
                            focus-visible:outline-offset-2
                            dark:border-gray-700
                            dark:text-gray-300
                            dark:hover:border-teal-700
                            dark:hover:text-teal-400
                            motion-reduce:transform-none
                          "
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          See all
                        </button>
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table
                        className="
                          w-full
                          min-w-[430px]
                          text-left
                          text-sm
                          text-gray-600
                          dark:text-gray-300
                        "
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        <thead
                          className="
                            border-b
                            border-gray-100
                            text-[10px]
                            uppercase
                            tracking-[0.14em]
                            text-gray-400
                            dark:border-gray-800
                            dark:text-gray-500
                          "
                        >
                          <tr>
                            <th className="px-5 py-3 font-bold sm:px-7">
                              Comment
                            </th>

                            <th className="px-5 py-3 font-bold sm:px-7">
                              Likes
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {comments.map((comment) => (
                            <tr
                              key={comment._id}
                              className="
                                border-b
                                border-gray-100
                                transition-colors
                                duration-150
                                hover:bg-[#f7fcfb]
                                last:border-b-0
                                dark:border-gray-800
                                dark:hover:bg-white/[0.035]
                              "
                            >
                              <td
                                className="
                                  max-w-[300px]
                                  px-5
                                  py-3
                                  text-sm
                                  leading-5
                                  text-gray-700
                                  sm:px-7
                                  dark:text-gray-300
                                "
                              >
                                {comment.content}
                              </td>

                              <td
                                className="
                                  px-5
                                  py-3
                                  text-xs
                                  text-gray-500
                                  sm:px-7
                                  dark:text-gray-400
                                "
                              >
                                {comment.numberOfLikes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* =====================================================
                PROFILE TAB
            ====================================================== */}
            {tab === "profile" && (
              <div className="animate-[fadeUp_0.45s_ease-out]">
                <section
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-teal-100
                    bg-white
                    p-5
                    shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                    sm:p-7
                    dark:border-teal-900/40
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <DashProfile />
                </section>
              </div>
            )}

            {/* =====================================================
                POSTS TAB
            ====================================================== */}
            {tab === "posts" && (
              <div className="animate-[fadeUp_0.45s_ease-out]">
                <section
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-teal-100
                    bg-white
                    p-5
                    shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                    sm:p-7
                    dark:border-teal-900/40
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <DashPosts />
                </section>
              </div>
            )}

            {/* =====================================================
                USERS TAB
            ====================================================== */}
            {tab === "users" && (
              <div className="animate-[fadeUp_0.45s_ease-out]">
                <section
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-teal-100
                    bg-white
                    p-5
                    shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                    sm:p-7
                    dark:border-teal-900/40
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <DashUsers />
                </section>
              </div>
            )}

            {/* =====================================================
                COMMENTS TAB
            ====================================================== */}
            {tab === "comments" && (
              <div className="animate-[fadeUp_0.45s_ease-out]">
                <section
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-teal-100
                    bg-white
                    p-5
                    shadow-[0_8px_30px_rgba(15,118,110,0.045)]
                    sm:p-7
                    dark:border-teal-900/40
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <DashComments />
                </section>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ===========================================================
          PAGE ANIMATION
      ============================================================ */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.45s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}