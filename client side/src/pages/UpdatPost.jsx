import {
  Select,
  TextInput,
  FileInput,
  Button,
  Alert,
} from "flowbite-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Fetch existing post data to pre-fill the form
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        // Pre-fill form with existing post data
        if (data.posts && data.posts.length > 0) {
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  // Upload new image to Cloudinary
  const handleImageUpload = async () => {
    if (!imageFile) {
      setPublishError("Please select an image first");
      return;
    }

    try {
      setImageUploading(true);
      setPublishError(null);

      const data = new FormData();
      data.append("image", imageFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        setPublishError("Image upload failed");
        setImageUploading(false);
        return;
      }

      // Save Cloudinary URL to form data
      setFormData({ ...formData, image: result.url });
      setImageUploading(false);
      setImageUploadSuccess(true);
    } catch (error) {
      setPublishError("Image upload failed");
      setImageUploading(false);
    }
  };

  // Submit updated post to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Content validation — Quill returns "<p><br></p>" when empty
    if (
      !formData.content ||
      formData.content.trim() === "" ||
      formData.content === "<p><br></p>"
    ) {
      setPublishError("Please write some content before updating.");
      return;
    }

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">

          {/* Post title input */}
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title || ""}
          />

          {/* Category dropdown */}
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category || "uncategorized"}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* Image upload section */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setImageUploadSuccess(false);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={imageUploading}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {/* Upload success message */}
        {imageUploadSuccess && (
          <Alert color="success">Image uploaded successfully!</Alert>
        )}

        {/* Current or newly uploaded image preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Post cover"
            className="w-full h-72 object-cover rounded-lg"
          />
        )}

        {/* Post content editor */}
        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
        </Button>

        {publishError && (
          <Alert color="failure" className="mt-2">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}