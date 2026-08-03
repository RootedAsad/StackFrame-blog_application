import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiAnnotation, HiDocumentText, HiArrowNarrowUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

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
        const res = await fetch("/api/user/getusers?limit=5", {
          credentials: "include",  // ✅ fix
        });
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
        const res = await fetch("/api/post/getposts?limit=5", {
          credentials: "include",  // ✅ fix
        });
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
        const res = await fetch("/api/comment/getcomments?limit=5", {
          credentials: "include",  // ✅ fix
        });
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

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-[#0f172a]">

      {/* Sidebar */}
      <div className="md:w-64 bg-white dark:bg-[#1e293b] shadow-lg">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* ── DASH TAB ─────────────────────────────────── */}
        {tab === "dash" && (
          <div className="flex flex-col gap-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Total Users */}
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {totalUsers}
                  </p>
                  <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
                    <HiArrowNarrowUp />
                    {lastMonthUsers} Last month
                  </p>
                </div>
                <div className="bg-teal-100 p-4 rounded-full">
                  <HiOutlineUserGroup className="text-teal-600 text-3xl" />
                </div>
              </div>

              {/* Total Comments */}
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Total Comments
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {totalComments}
                  </p>
                  <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
                    <HiArrowNarrowUp />
                    {lastMonthComments} Last month
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <HiAnnotation className="text-blue-600 text-3xl" />
                </div>
              </div>

              {/* Total Posts */}
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Total Posts
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {totalPosts}
                  </p>
                  <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
                    <HiArrowNarrowUp />
                    {lastMonthPosts} Last month
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <HiDocumentText className="text-green-600 text-3xl" />
                </div>
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Recent Users
                </h2>
                <Link to="/dashboard?tab=users">
                  <button className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700">
                    See all
                  </button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-[#0f172a] text-gray-500">
                    <tr>
                      <th className="px-4 py-3">User Image</th>
                      <th className="px-4 py-3">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a]">
                        <td className="px-4 py-3">
                          <img
                            src={user.profilePicture}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover bg-gray-200"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {user.username}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Posts + Comments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Recent Posts */}
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Posts
                  </h2>
                  <Link to="/dashboard?tab=posts">
                    <button className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700">
                      See all
                    </button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-[#0f172a] text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Post Image</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a]">
                          <td className="px-4 py-3">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-14 h-10 rounded object-cover bg-gray-200"
                            />
                          </td>
                          <td className="px-4 py-3 font-medium line-clamp-2">
                            {post.title}
                          </td>
                          <td className="px-4 py-3">
                            {post.category}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Comments */}
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Comments
                  </h2>
                  <Link to="/dashboard?tab=comments">
                    <button className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700">
                      See all
                    </button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-[#0f172a] text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Comment</th>
                        <th className="px-4 py-3">Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments.map((comment) => (
                        <tr key={comment._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a]">
                          <td className="px-4 py-3 line-clamp-2">
                            {comment.content}
                          </td>
                          <td className="px-4 py-3">
                            {comment.numberOfLikes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── PROFILE TAB ──────────────────────────────── */}
        {tab === "profile" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
            <DashProfile />
          </div>
        )}

        {/* ── POSTS TAB ────────────────────────────────── */}
        {tab === "posts" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
            <DashPosts />
          </div>
        )}

        {/* ── USERS TAB ────────────────────────────────── */}
        {tab === "users" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
            <DashUsers />
          </div>
        )}

        {/* ── COMMENTS TAB ─────────────────────────────── */}
        {tab === "comments" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-5">
            <DashComments />
          </div>
        )}

      </div>
    </div>
  );
}