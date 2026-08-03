import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch recent posts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=9");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to Asad's Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      {/* Banner / Call To Action Section */}
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-6xl mx-auto">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              Want to learn more about web development?
            </h2>
            <p className="text-gray-500 my-2">
              Check out these resources with JavaScript projects
            </p>
            {/* External link to YouTube resources */}

            <a href="https://www.youtube.com/watch?v=G3e-cpL7ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 font-bold hover:underline"
            >
              View Resources
            </a>
          </div>
          <div className="p-7 flex-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              alt="JavaScript"
              className="w-40 h-40 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Recent Posts
            </h2>

            {/* Post cards grid */}
            <div className="flex flex-wrap gap-5 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Link to all posts page */}
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}