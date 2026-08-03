import {
  Select,
  TextInput,
  FileInput,
  Button,
  Alert,
} from "flowbite-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  const navigate = useNavigate();

  // Image Upload
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

      setFormData({
        ...formData,
        image: result.url,
      });

      setImageUploading(false);
      setImageUploadSuccess(true);

    } catch (error) {

      setPublishError("Image upload failed");
      setImageUploading(false);

    }

  };

  // Publish Post
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.title ||
      !formData.content ||
      formData.content.trim() === "" ||
      formData.content === "<p><br></p>"
    ) {

      setPublishError(
        "Please fill all required fields."
      );

      return;

    }

    try {

      console.log(formData);

      const res = await fetch("/api/post/create", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(formData),

      });

      const data = await res.json();

      if (!res.ok) {

        setPublishError(data.message);

        return;

      }

      if (res.ok) {

        setPublishError(null);

        navigate(`/post/${data.slug}`);

      }

    } catch (error) {

      setPublishError("Something went wrong");

    }

  };

  return (

    <div className="p-3 max-w-3xl mx-auto min-h-screen">

      <h1 className="text-center text-3xl my-7 font-semibold">

        Create a post

      </h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col gap-4 sm:flex-row justify-between">

          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <Select
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >

            <option value="uncategorized">
              Select a category
            </option>

            <option value="javascript">
              JavaScript
            </option>

            <option value="reactjs">
              React.js
            </option>

            <option value="nextjs">
              Next.js
            </option>

          </Select>

        </div>

        {/* Image Upload */}

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

            {
              imageUploading
                ? "Uploading..."
                : "Upload Image"
            }

          </Button>

        </div>

        {imageUploadSuccess && (

          <Alert color="success">
            Image uploaded successfully!
          </Alert>

        )}

        {formData.image && (

          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover rounded-lg"
          />

        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value) =>
            setFormData({
              ...formData,
              content: value,
            })
          }
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
        >

          Publish

        </Button>

        {publishError && (

          <Alert
            color="failure"
            className="mt-2"
          >

            {publishError}

          </Alert>

        )}

      </form>

    </div>

  );

}