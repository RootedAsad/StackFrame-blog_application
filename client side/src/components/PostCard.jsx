import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all duration-300 shadow-md hover:shadow-teal-200 dark:hover:shadow-teal-900">
      
      {/* Image */}
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        
        {/* Title */}
        <p className="text-lg font-semibold line-clamp-2 group-hover:text-teal-500 transition-colors duration-300">
          {post.title}
        </p>

        {/* Category Badge */}
        <span className="italic text-sm bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full w-fit">
          {post.category}
        </span>

        {/* Date */}
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>

        {/* Read Article Button — slides up on hover */}
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 font-medium tracking-wide"
        >
          Read Article →
        </Link>

      </div>
    </div>
  );
}