import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BASE_URL } from "../config";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ================================================================
     FETCH USERS
  ================================================================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/api/user/getusers",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setUsers(data.users || []);

          if (!data.users || data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================================================================
     SHOW MORE
  ================================================================= */
  const handleShowMore = async () => {
    try {
      const startIndex = users.length;

      const res = await fetch(
        `${BASE_URL}/api/user/getusers?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        const newUsers = data.users || [];

        setUsers((prev) => [...prev, ...newUsers]);

        if (newUsers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================================================================
     DELETE USER
  ================================================================= */
  const handleDeleteUser = async () => {
    if (!userIdToDelete) {
      return;
    }

    try {
      setDeleting(true);

      const res = await fetch(
        `${BASE_URL}/api/user/delete/${userIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.filter(
            (user) => user._id !== userIdToDelete
          )
        );

        setShowModal(false);
        setUserIdToDelete("");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ================================================================
     LOADING STATE
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
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  /* ================================================================
     EMPTY STATE
  ================================================================= */
  if (!users.length) {
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
          <span className="text-lg">○</span>
        </div>

        <h3
          className="
            text-[24px]
            leading-none
            text-gray-900
            dark:text-white
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
          }}
        >
          No users yet
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
          You have no users to display.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
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
              min-w-[760px]
              table-auto
              border-collapse
              text-left
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {/* ====================================================
                TABLE HEADER
            ===================================================== */}
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
                  <span className="block">Created</span>
                </th>

                <th
                  className="
                    w-[110px]
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
                  User Image
                </th>

                <th
                  className="
                    min-w-[150px]
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
                  Username
                </th>

                <th
                  className="
                    min-w-[190px]
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
                  Email
                </th>

                <th
                  className="
                    w-[90px]
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
                  Admin
                </th>

                <th
                  className="
                    w-[100px]
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
                  Action
                </th>
              </tr>
            </thead>

            {/* ====================================================
                TABLE BODY
            ===================================================== */}
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
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
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* USER IMAGE */}
                  <td className="px-4 py-4 sm:px-5">
                    <div
                      className="
                        h-10
                        w-10
                        overflow-hidden
                        rounded-full
                        border
                        border-gray-200
                        bg-gray-100
                        dark:border-gray-700
                        dark:bg-gray-800
                      "
                    >
                      <img
                        src={
                          user.profilePicture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt={user.username}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    </div>
                  </td>

                  {/* USERNAME */}
                  <td
                    className="
                      max-w-[190px]
                      px-4
                      py-4
                      text-[13px]
                      font-semibold
                      text-gray-800
                      sm:px-5
                      dark:text-gray-200
                    "
                  >
                    <span className="block truncate">
                      {user.username}
                    </span>
                  </td>

                  {/* EMAIL */}
                  <td
                    className="
                      max-w-[230px]
                      px-4
                      py-4
                      text-[12px]
                      text-gray-600
                      sm:px-5
                      dark:text-gray-300
                    "
                  >
                    <span className="block truncate">
                      {user.email}
                    </span>
                  </td>

                  {/* ADMIN */}
                  <td className="px-4 py-4 sm:px-5">
                    {user.isAdmin ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-teal-200
                          bg-teal-50
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.08em]
                          text-teal-700
                          dark:border-teal-800
                          dark:bg-teal-950/40
                          dark:text-teal-400
                        "
                      >
                        Yes
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-gray-200
                          bg-gray-50
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.08em]
                          text-gray-500
                          dark:border-gray-700
                          dark:bg-gray-800
                          dark:text-gray-400
                        "
                      >
                        No
                      </span>
                    )}
                  </td>

                  {/* DELETE */}
                  <td className="px-4 py-4 sm:px-5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
          aria-labelledby="delete-user-title"
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
            {/* Warning icon */}
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
              id="delete-user-title"
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
              Delete this user?
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
              user will be permanently removed.
            </p>

            {/* Modal buttons */}
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
                onClick={handleDeleteUser}
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
                    setUserIdToDelete("");
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