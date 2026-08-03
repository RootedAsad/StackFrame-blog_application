import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateSuccess_msg, setUpdateSuccess_msg] = useState(null); // ✅ add
  const [updateError_msg, setUpdateError_msg] = useState(null);     // ✅ add

  const filePickerRef = useRef();

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploadError(null);
    try {
      setImageUploading(true);
      const data = new FormData();
      data.append("image", file);
      const res = await fetch("/api/upload", {
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
      setFormData((prev) => ({
        ...prev,
        profilePicture: result.secure_url || result.url,
      }));
      setImageFileUrl(result.secure_url || result.url);
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
      return; // ✅ dispatch nahi — loading affect nahi hoga
    }

    if (imageUploading) {
      setUpdateError_msg("Please wait for image upload");
      return; // ✅ dispatch nahi
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateError_msg(data.message);
      } else {
        dispatch(updateSuccess(data));
        setFormData({});
        setUpdateSuccess_msg("Profile updated successfully!"); // ✅ alert nahi
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
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
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
      const res = await fetch("/api/user/signout", {
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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={filePickerRef}
          onChange={handleImageChange}
        />

        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser?.profilePicture || defaultProfileImage}
            onError={(e) => { e.target.src = defaultProfileImage; }}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
          {imageUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full">
              <span className="text-white text-xs font-semibold">Uploading...</span>
            </div>
          )}
        </div>

        {imageUploadError && (
          <p className="text-red-500 text-sm text-center">{imageUploadError}</p>
        )}
        {!imageUploading && imageFileUrl && !imageUploadError && (
          <p className="text-green-500 text-sm text-center">Image uploaded successfully!</p>
        )}

        <input type="text" id="username" placeholder="Username"
          defaultValue={currentUser?.username} onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2.5" />

        <input type="email" id="email" placeholder="Email"
          defaultValue={currentUser?.email} onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2.5" />

        <input type="password" id="password" placeholder="Password"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2.5" />

        <button
          type="submit"
          disabled={loading || imageUploading}
          className="border border-purple-500 text-purple-500 rounded-lg py-2 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {currentUser.isAdmin && (
          <Link to="/create-post">
            <button type="button"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg">
              Create a Post
            </button>
          </Link>
        )}
      </form>

      {/* ✅ Success message */}
      {updateSuccess_msg && (
        <p className="text-green-500 mt-4 text-center font-medium">
          {updateSuccess_msg}
        </p>
      )}

      {/* ✅ Error message */}
      {updateError_msg && (
        <p className="text-red-500 mt-4 text-center">
          {updateError_msg}
        </p>
      )}

      {error && (
        <p className="text-red-500 mt-3 text-center">{error}</p>
      )}

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteUser}
                className="bg-red-600 text-white px-5 py-2 rounded-lg">
                Yes, I'm sure
              </button>
              <button onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}