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
import { BASE_URL } from "../config";

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
        const res = await fetch(
          `${BASE_URL}/api/post/getposts?postId=${postId}`
        );

        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

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

  // Submit updated post to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        `${BASE_URL}/api/post/updatepost/${postId}/${currentUser._id}`,
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
    <main className="min-h-screen bg-[#f8fcfb] px-4 py-12 text-gray-900 dark:bg-[#0b1413] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* =========================================
            PAGE INTRO
        ========================================== */}
        <section className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-teal-500" />

            <span
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Editorial Studio
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <h1
                className="text-[48px] leading-[0.95] tracking-[-0.02em] text-gray-950 sm:text-[60px] lg:text-[76px] dark:text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                Refine your{" "}
                <span className="text-teal-500">story.</span>
              </h1>

              <p
                className="mt-5 max-w-[650px] text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Shape the headline, refine the visual, and polish the
                article before sending it back into the journal.
              </p>
            </div>

            <div className="hidden pb-2 lg:block" aria-hidden="true">
              <div className="flex items-end gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="h-px w-24 bg-teal-200 dark:bg-teal-900" />
                <span className="h-px w-10 bg-teal-100 dark:bg-teal-950" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            EDITORIAL WORKSPACE
        ========================================== */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_350px]">
            {/* =====================================
                MAIN EDITOR
            ====================================== */}
            <section className="min-w-0 rounded-[28px] border border-teal-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,118,110,0.06)] sm:p-7 lg:p-9 dark:border-teal-900/50 dark:bg-white/[0.035] dark:shadow-none">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-100 pb-5 dark:border-gray-800">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Story Editor
                  </p>

                  <h2
                    className="mt-1 text-2xl text-gray-900 dark:text-white sm:text-3xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Make every line count.
                  </h2>
                </div>

                <div
                  className="hidden text-right sm:block"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Draft
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="mb-7">
                <label
                  htmlFor="title"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  Story Title
                </label>

                <TextInput
                  type="text"
                  placeholder="Enter your story title"
                  required
                  id="title"
                  className="editorial-input"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  value={formData.title || ""}
                />
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    className="block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Article Content
                  </label>

                  <span
                    className="text-[10px] uppercase tracking-[0.15em] text-gray-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Rich Text
                  </span>
                </div>

                <div className="editorial-quill">
                  <ReactQuill
                    theme="snow"
                    value={formData.content || ""}
                    placeholder="Continue writing your story..."
                    className="h-[430px] sm:h-[500px]"
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        content: value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* =====================================
                SIDEBAR
            ====================================== */}
            <aside className="space-y-6">
              {/* Category */}
              <section className="rounded-[28px] border border-teal-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,118,110,0.06)] dark:border-teal-900/50 dark:bg-white/[0.035] dark:shadow-none">
                <div className="mb-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Classification
                  </p>

                  <h2
                    className="mt-1 text-2xl text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Story category
                  </h2>
                </div>

                <Select
                  id="category"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  value={formData.category || "uncategorized"}
                  className="editorial-select"
                >
                  <option value="uncategorized">
                    Select a category
                  </option>
                  <option value="javascript">JavaScript</option>
                  <option value="reactjs">React.js</option>
                  <option value="nextjs">Next.js</option>
                </Select>
              </section>

              {/* Image */}
              <section className="rounded-[28px] border border-teal-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,118,110,0.06)] dark:border-teal-900/50 dark:bg-white/[0.035] dark:shadow-none">
                <div className="mb-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Featured Media
                  </p>

                  <h2
                    className="mt-1 text-2xl text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Cover image
                  </h2>
                </div>

                <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/50 p-4 dark:border-teal-900 dark:bg-teal-950/20">
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setImageUploadSuccess(false);
                      setPublishError(null);
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={imageUploading}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-teal-500 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_12px_25px_rgba(20,184,166,0.2)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {imageUploading
                      ? "Uploading..."
                      : "Upload Image"}
                  </button>
                </div>

                {imageUploadSuccess && (
                  <div className="mt-4">
                    <Alert
                      color="success"
                      className="rounded-2xl border border-teal-100 dark:border-teal-900"
                    >
                      Image uploaded successfully!
                    </Alert>
                  </div>
                )}

                {formData.image && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                    <img
                      src={formData.image}
                      alt="Post cover"
                      className="h-52 w-full object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
                    />
                  </div>
                )}
              </section>

              {/* Publish Controls */}
              <section className="rounded-[28px] border border-teal-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,118,110,0.06)] dark:border-teal-900/50 dark:bg-white/[0.035] dark:shadow-none">
                <div className="mb-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Publication
                  </p>

                  <h2
                    className="mt-1 text-2xl text-gray-900 dark:text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Ready to update?
                  </h2>
                </div>

                <button
                  type="submit"
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 text-sm font-bold text-white shadow-[0_10px_25px_rgba(20,184,166,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 hover:shadow-[0_15px_30px_rgba(20,184,166,0.22)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  Update Post
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                  <span
                    className="text-[9px] uppercase tracking-[0.18em] text-gray-400"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    ASAD Journal
                  </span>
                  <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                </div>
              </section>

              {/* Error */}
              {publishError && (
                <Alert
                  color="failure"
                  className="rounded-2xl"
                >
                  {publishError}
                </Alert>
              )}
            </aside>
          </div>
        </form>
      </div>

      {/* =========================================
          PAGE-SPECIFIC STYLES
      ========================================== */}
      <style>{`
        .editorial-input input {
          height: 68px !important;
          border-radius: 18px !important;
          border: 1px solid #dcefeb !important;
          background: #fbfefd !important;
          padding: 0 20px !important;
          font-family: "Cormorant Garamond", serif !important;
          font-size: 28px !important;
          font-weight: 600 !important;
          color: #111827 !important;
          box-shadow: none !important;
          transition:
            border-color 220ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease !important;
        }

        .editorial-input input::placeholder {
          color: #9ca3af !important;
          opacity: 0.8 !important;
        }

        .editorial-input input:focus {
          border-color: #2dd4bf !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.10) !important;
        }

        .editorial-select select {
          height: 52px !important;
          border-radius: 16px !important;
          border-color: #dcefeb !important;
          background-color: #fbfefd !important;
          font-family: "Manrope", sans-serif !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #374151 !important;
          box-shadow: none !important;
        }

        .editorial-select select:focus {
          border-color: #2dd4bf !important;
          box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.10) !important;
        }

        .editorial-quill .ql-toolbar {
          border: 1px solid #dcefeb !important;
          border-bottom: 0 !important;
          border-radius: 16px 16px 0 0 !important;
          background: #fbfefd !important;
          padding: 12px 14px !important;
        }

        .editorial-quill .ql-container {
          border: 1px solid #dcefeb !important;
          border-radius: 0 0 16px 16px !important;
          background: #ffffff !important;
          font-family: "Manrope", sans-serif !important;
          font-size: 16px !important;
          color: #374151 !important;
        }

        .editorial-quill .ql-editor {
          min-height: 100% !important;
          padding: 24px !important;
          line-height: 1.85 !important;
        }

        .editorial-quill .ql-editor.ql-blank::before {
          color: #9ca3af !important;
          font-style: normal !important;
          left: 24px !important;
        }

        .editorial-quill .ql-toolbar button:hover,
        .editorial-quill .ql-toolbar button.ql-active {
          color: #0d9488 !important;
        }

        .editorial-quill .ql-toolbar button:hover .ql-stroke,
        .editorial-quill .ql-toolbar button.ql-active .ql-stroke {
          stroke: #0d9488 !important;
        }

        .editorial-quill .ql-toolbar button:hover .ql-fill,
        .editorial-quill .ql-toolbar button.ql-active .ql-fill {
          fill: #0d9488 !important;
        }

        @media (max-width: 640px) {
          .editorial-input input {
            height: 60px !important;
            font-size: 24px !important;
          }

          .editorial-quill .ql-toolbar {
            padding: 9px 8px !important;
          }

          .editorial-quill .ql-editor {
            padding: 18px !important;
          }
        }

        .dark .editorial-input input {
          border-color: #1f4b46 !important;
          background: rgba(255, 255, 255, 0.035) !important;
          color: #f9fafb !important;
        }

        .dark .editorial-input input::placeholder {
          color: #6b7280 !important;
        }

        .dark .editorial-input input:focus {
          border-color: #2dd4bf !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .dark .editorial-select select {
          border-color: #1f4b46 !important;
          background-color: #111d1b !important;
          color: #e5e7eb !important;
        }

        .dark .editorial-quill .ql-toolbar {
          border-color: #1f4b46 !important;
          background: #111d1b !important;
        }

        .dark .editorial-quill .ql-container {
          border-color: #1f4b46 !important;
          background: #101918 !important;
          color: #e5e7eb !important;
        }

        .dark .editorial-quill .ql-editor.ql-blank::before {
          color: #6b7280 !important;
        }

        .dark .editorial-quill .ql-stroke {
          stroke: #cbd5e1 !important;
        }

        .dark .editorial-quill .ql-fill {
          fill: #cbd5e1 !important;
        }

        .dark .editorial-quill .ql-picker {
          color: #cbd5e1 !important;
        }

        .dark .editorial-quill .ql-picker-options {
          background: #111d1b !important;
          border-color: #1f4b46 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .editorial-input input,
          .editorial-select select {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}