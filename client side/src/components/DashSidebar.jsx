import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
} from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiOutlineChat,
  HiChartPie,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { BASE_URL } from "../config";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("profile");
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const itemBaseClass = `
    group flex items-center rounded-xl px-3 py-3
    text-sm font-semibold
    transition-all duration-200
    hover:bg-teal-50 hover:text-teal-700
    dark:hover:bg-teal-950/30 dark:hover:text-teal-300
  `;

  const itemActiveClass = `
    !bg-teal-50 !text-teal-700
    shadow-sm
    dark:!bg-teal-950/35 dark:!text-teal-300
  `;

  return (
    <aside className="w-full md:w-[255px]">
      <Sidebar
        className="
          w-full
          overflow-hidden
          rounded-[22px]
          border border-gray-200/80
          bg-white
          shadow-[0_10px_35px_rgba(15,23,42,0.05)]
          dark:border-white/10
          dark:bg-white/[0.035]
          dark:shadow-none
        "
      >
        <SidebarItems>
          <SidebarItemGroup className="flex flex-col gap-1 p-3">

            {/* Sidebar Header */}
            <div className="mb-3 border-b border-gray-100 px-3 pb-4 dark:border-white/10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Workspace
              </p>

              <h2
                className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Dashboard
              </h2>

              <p
                className="mt-1 text-[11px] text-gray-400 dark:text-gray-500"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Manage your journal
              </p>
            </div>

            {/* =========================================
                ADMIN ONLY: DASHBOARD OVERVIEW
            ========================================== */}
            {currentUser?.isAdmin && (
              <Link
                to="/dashboard?tab=dash"
                className="block"
              >
                <SidebarItem
                  active={tab === "dash"}
                  icon={HiChartPie}
                  as="div"
                  className={`${itemBaseClass} ${
                    tab === "dash" ? itemActiveClass : ""
                  }`}
                >
                  Dashboard
                </SidebarItem>
              </Link>
            )}

            {/* =========================================
                PROFILE: ADMIN + NORMAL USER
            ========================================== */}
            <Link
              to="/dashboard?tab=profile"
              className="block"
            >
              <SidebarItem
                active={tab === "profile"}
                icon={HiUser}
                label={currentUser?.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div"
                className={`${itemBaseClass} ${
                  tab === "profile" ? itemActiveClass : ""
                }`}
              >
                Profile
              </SidebarItem>
            </Link>

            {/* =========================================
                POSTS: ADMIN + NORMAL USER
            ========================================== */}
            <Link
              to="/dashboard?tab=posts"
              className="block"
            >
              <SidebarItem
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
                className={`${itemBaseClass} ${
                  tab === "posts" ? itemActiveClass : ""
                }`}
              >
                Posts
              </SidebarItem>
            </Link>

            {/* =========================================
                ADMIN ONLY SECTION
            ========================================== */}
            {currentUser?.isAdmin && (
              <>
                <div className="px-3 pb-1 pt-5">
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Administration
                  </p>
                </div>

                {/* Users */}
                <Link
                  to="/dashboard?tab=users"
                  className="block"
                >
                  <SidebarItem
                    active={tab === "users"}
                    icon={HiOutlineUserGroup}
                    as="div"
                    className={`${itemBaseClass} ${
                      tab === "users" ? itemActiveClass : ""
                    }`}
                  >
                    Users
                  </SidebarItem>
                </Link>

                {/* Comments */}
                <Link
                  to="/dashboard?tab=comments"
                  className="block"
                >
                  <SidebarItem
                    active={tab === "comments"}
                    icon={HiOutlineChat}
                    as="div"
                    className={`${itemBaseClass} ${
                      tab === "comments" ? itemActiveClass : ""
                    }`}
                  >
                    Comments
                  </SidebarItem>
                </Link>
              </>
            )}

            {/* Divider */}
            <div className="my-3 border-t border-gray-100 dark:border-white/10" />

            {/* Sign Out */}
            <SidebarItem
              icon={HiArrowSmRight}
              className="
                group cursor-pointer
                rounded-xl px-3 py-3
                text-sm font-semibold
                text-gray-500
                transition-all duration-200
                hover:bg-red-50
                hover:text-red-600
                dark:text-gray-400
                dark:hover:bg-red-950/20
                dark:hover:text-red-400
              "
              onClick={handleSignout}
            >
              Sign Out
            </SidebarItem>

          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </aside>
  );
}