import {
  Select,
  TextInput,
  FileInput,
} from "flowbite-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

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
      setImageUploadSuccess(false);

      const data = new FormData();
      data.append("image", imageFile);

      const res = await fetch(BASE_URL + "/api/upload", {
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

      setFormData((prev) => ({
        ...prev,
        image: result.url,
      }));

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
      setPublishError("Please fill all required fields.");
      return;
    }

    try {
      setPublishError(null);

      const res = await fetch(BASE_URL + "/api/post/create", {
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

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <main
      className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-8 dark:bg-[#0d1412]"
      style={{
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[920px]">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
            Editorial Workspace
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Create a Post
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Write, edit and publish a new story to ASAD Journal.
              </p>
            </div>

            <span className="w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/30 dark:text-teal-300">
              New Article
            </span>
          </div>
        </div>

        {/* Main Editor Card */}
        <div className="rounded-[26px] border border-gray-200/80 bg-white p-5 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-7 lg:p-8 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* Title + Category */}
            <div className="grid w-full gap-5 sm:grid-cols-2">

              {/* Title */}
              <div className="w-full min-w-0">
                <label
                  htmlFor="title"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400"
                >
                  Article Title
                </label>

                <TextInput
                  type="text"
                  id="title"
                  placeholder="Enter your article title..."
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="create-post-input w-full"
                />
              </div>

              {/* Category */}
              <div className="w-full min-w-0">
                <label
                  htmlFor="category"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400"
                >
                  Category
                </label>

                <Select
                  id="category"
                  defaultValue="uncategorized"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="create-post-input w-full"
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
            </div>

            {/* Image Upload */}
            <div className="rounded-2xl border border-dashed border-teal-300 bg-teal-50/40 p-5 dark:border-teal-900/60 dark:bg-teal-950/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    Featured Image
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Choose an image to represent your article.
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setImageUploadSuccess(false);
                      setPublishError(null);
                    }}
                    className="max-w-full"
                  />

                  <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={imageUploading}
                    className="h-10 shrink-0 rounded-xl bg-teal-600 px-5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    {imageUploading
                      ? "Uploading..."
                      : "Upload Image"}
                  </button>
                </div>
              </div>

              {/* Upload Success */}
              {imageUploadSuccess && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400">
                  Image uploaded successfully!
                </div>
              )}
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                <div className="border-b border-gray-100 px-4 py-3 dark:border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    Image Preview
                  </p>
                </div>

                <img
                  src={formData.image}
                  alt="Uploaded article preview"
                  className="h-64 w-full object-cover sm:h-80 lg:h-[400px]"
                />
              </div>
            )}

            {/* Content Editor */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="content"
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400"
                >
                  Article Content
                </label>

                <span className="text-[10px] text-gray-400">
                  Rich text editor
                </span>
              </div>

              <div className="create-post-editor overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
                <ReactQuill
                  theme="snow"
                  placeholder="Start writing your story..."
                  className="h-[360px] sm:h-[420px]"
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      content: value,
                    })
                  }
                />
              </div>
            </div>

            {/* Publish */}
            <div className="border-t border-gray-100 pt-6 dark:border-white/10">
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-teal-600 px-6 text-sm font-bold text-white shadow-[0_8px_22px_rgba(13,148,136,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-[0_12px_28px_rgba(13,148,136,0.24)] dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Publish Article
              </button>
            </div>

            {/* Publish Error */}
            {publishError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                {publishError}
              </div>
            )}
          </form>
        </div>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-[11px] text-gray-400 dark:text-gray-500">
          Your article will be published to ASAD Journal once submitted.
        </p>
      </div>

      {/* React Quill Styling */}
      <style>{`
        .create-post-editor .ql-toolbar {
          border: 0;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
          padding: 12px 14px;
        }

        .create-post-editor .ql-container {
          border: 0;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          color: #374151;
        }

        .create-post-editor .ql-editor {
          min-height: 360px;
          padding: 20px;
          line-height: 1.8;
        }

        .create-post-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          left: 20px;
        }

        .create-post-editor .ql-toolbar button:hover,
        .create-post-editor .ql-toolbar button.ql-active,
        .create-post-editor .ql-toolbar .ql-picker-label:hover,
        .create-post-editor .ql-toolbar .ql-picker-label.ql-active {
          color: #0d9488;
        }

        .create-post-editor .ql-snow .ql-stroke {
          stroke: currentColor;
        }

        .create-post-editor .ql-snow .ql-fill {
          fill: currentColor;
        }

        .create-post-editor .ql-snow .ql-picker {
          color: #6b7280;
        }

        @media (max-width: 640px) {
          .create-post-editor .ql-toolbar {
            padding: 10px;
          }

          .create-post-editor .ql-editor {
            min-height: 360px;
            padding: 16px;
          }
        }

        .dark .create-post-editor .ql-toolbar {
          border-bottom-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.025);
        }

        .dark .create-post-editor .ql-container {
          color: #e5e7eb;
        }

        .dark .create-post-editor .ql-snow .ql-stroke {
          stroke: #9ca3af;
        }

        .dark .create-post-editor .ql-snow .ql-fill {
          fill: #9ca3af;
        }

        .dark .create-post-editor .ql-snow .ql-picker {
          color: #9ca3af;
        }
      `}</style>
    </main>
  );
}