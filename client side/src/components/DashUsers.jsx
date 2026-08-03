import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) setShowMore(false);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log(error.message);
        setUsers([]);
      } finally {
        setLoading(false); // ✅ add
      }
    };

    fetchUsers();
  }, []);

  const handleShowMore = async () => {
    try {
      const startIndex = users.length;
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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

      {/* ✅ Loading state */}
      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-gray-500 text-sm animate-pulse">Loading users...</p>
        </div>
      )}

      {/* ✅ Empty state */}
      {!loading && users.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          You have no users yet
        </p>
      )}

      {/* ✅ Table — sirf data aane ke baad */}
      {!loading && users.length > 0 && (
        <>
          <table className="w-full min-w-[1100px] border-collapse table-fixed">
            <thead className="border-b text-[11px] uppercase text-gray-500">
              <tr>
                <th className="w-[120px] px-4 py-3 text-left font-semibold leading-4">
                  DATE <br /> CREATED
                </th>
                <th className="w-[120px] px-4 py-3 text-left font-semibold">
                  USER IMAGE
                </th>
                <th className="w-[300px] px-4 py-3 text-left font-semibold">
                  USERNAME
                </th>
                <th className="w-[300px] px-4 py-3 text-left font-semibold">
                  EMAIL
                </th>
                <th className="w-[140px] px-4 py-3 text-left font-semibold">
                  ADMIN
                </th>
                <th className="w-[90px] px-4 py-3 text-left font-semibold">
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-4 text-sm text-gray-500 align-middle">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <img
                      src={
                        user.profilePicture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt={user.username}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {user.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 align-middle">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm align-middle">
                    {user.isAdmin ? (
                      <span className="text-green-500 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
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