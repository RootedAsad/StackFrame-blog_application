import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { BASE_URL } from "../config";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updateSuccess_msg, setUpdateSuccess_msg] = useState(null);
  const [updateError_msg, setUpdateError_msg] = useState(null);

  const filePickerRef = useRef();

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageUploadError(null);

    try {
      setImageUploading(true);

      const data = new FormData();
      data.append("image", file);

      const res = await fetch(BASE_URL + "/api/upload", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        setImageUploadError("Image upload failed");
        setImageUploading(false);
        return;
      }

      const uploadedUrl = result.secure_url || result.url;

      setFormData((prev) => ({
        ...prev,
        profilePicture: uploadedUrl,
      }));

      setImageFileUrl(uploadedUrl);
      setImageUploading(false);
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateSuccess_msg(null);
    setUpdateError_msg(null);

    if (Object.keys(formData).length === 0) {
      setUpdateError_msg("Change something first");
      return;
    }

    if (imageUploading) {
      setUpdateError_msg("Please wait for image upload");
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(
        `${BASE_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateError_msg(data.message);
      } else {
        dispatch(updateSuccess(data));
        setFormData({});
        setUpdateSuccess_msg("Profile updated successfully!");
        setShowPassword(false);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateError_msg(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${BASE_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[760px]">

        {/* Page Header */}
        <div className="mb-7">
          <p
            className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-400"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Account settings
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Profile
              </h1>

              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Manage your personal information and account settings.
              </p>
            </div>

            <span
              className="w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/30 dark:text-teal-300"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              ASAD Journal
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="rounded-[24px] border border-gray-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-7 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={filePickerRef}
              onChange={handleImageChange}
            />

            {/* Profile Image */}
            <div className="flex flex-col items-center border-b border-gray-100 pb-6 dark:border-white/10">
              <button
                type="button"
                onClick={() => filePickerRef.current?.click()}
                className="group relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-800"
                aria-label="Change profile picture"
              >
                <img
                  src={
                    imageFileUrl ||
                    currentUser?.profilePicture ||
                    defaultProfileImage
                  }
                  onError={(e) => {
                    e.target.src = defaultProfileImage;
                  }}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white transition-all duration-300 group-hover:bg-black/40">
                  <span className="translate-y-2 text-[11px] font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Change
                  </span>
                </div>

                {imageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55">
                    <span className="text-xs font-semibold text-white">
                      Uploading...
                    </span>
                  </div>
                )}
              </button>

              <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                Click your photo to upload a new one
              </p>

              {imageUploadError && (
                <p className="mt-2 text-center text-sm font-medium text-red-500">
                  {imageUploadError}
                </p>
              )}

              {!imageUploading &&
                imageFileUrl &&
                !imageUploadError && (
                  <p className="mt-2 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Image uploaded successfully!
                  </p>
                )}
            </div>

            {/* Form Fields */}
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={currentUser?.username}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-700 dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={currentUser?.email}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-700 dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Password */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter a new password"
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-700 dark:focus:bg-white/[0.06]"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-teal-50 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading || imageUploading}
              className="group relative mt-1 h-12 w-full overflow-hidden rounded-xl bg-teal-600 px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(13,148,136,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-[0_12px_28px_rgba(13,148,136,0.24)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              <span className="relative z-10">
                {loading ? "Updating..." : "Update Profile"}
              </span>
            </button>

            {/* Admin Create Post */}
            {currentUser?.isAdmin && (
              <Link
                to="/create-post"
                className="w-full"
              >
                <button
                  type="button"
                  className="h-12 w-full rounded-xl border border-teal-200 bg-teal-50 px-5 text-sm font-bold text-teal-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-100 dark:border-teal-900/60 dark:bg-teal-950/25 dark:text-teal-300 dark:hover:bg-teal-950/45"
                >
                  Create a Post
                </button>
              </Link>
            )}
          </form>

          {/* Status Messages */}
          {(updateSuccess_msg ||
            updateError_msg ||
            error) && (
            <div className="mt-5 space-y-2">
              {updateSuccess_msg && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400">
                  {updateSuccess_msg}
                </div>
              )}

              {updateError_msg && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                  {updateError_msg}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Account Actions */}
          <div className="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-left text-xs font-bold uppercase tracking-[0.12em] text-red-500 transition-colors hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete Account
            </button>

            <button
              type="button"
              onClick={handleSignout}
              className="text-left text-xs font-bold uppercase tracking-[0.12em] text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:text-right"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-[24px] border border-gray-200 bg-white p-6 shadow-2xl sm:p-7 dark:border-white/10 dark:bg-[#101816]"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl dark:bg-red-950/30">
              ⚠️
            </div>

            <h3
              className="mt-5 text-2xl font-semibold text-gray-900 dark:text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Delete your account?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              This action cannot be undone. Your account and
              associated information will be permanently removed.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                No, cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteUser}
                className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Yes, delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}