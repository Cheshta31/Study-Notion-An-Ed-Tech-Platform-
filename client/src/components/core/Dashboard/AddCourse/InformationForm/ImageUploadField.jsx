import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";

const ImageUploadField = ({
  name,
  errors,
  url,
  setValue,
  getValues,
  label,
  video = false,
}) => {
  const mediaInputRef = useRef();
  const [previewSource, setPreviewSource] = useState(url);
  function handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been dropped so do something
      const file = e.target.files[0];
      setValue(name, file);
      setPreviewSource(URL.createObjectURL(file));
    }
  }

  //for drag and drop
  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      //single function for dragenter and dragleave
      setDragActive(false);
    }
  };
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setValue(name, file);
      setPreviewSource(URL.createObjectURL(file));
    }
    setDragActive(false);
  }

  useEffect(() => {
    const preventDefaultDragOver = (e) => {
      if (e.target.tagName !== "INPUT") e.preventDefault();
    };

    const preventDefaultDrop = (e) => {
      if (e.target.tagName !== "INPUT") e.preventDefault();
    };

    window.addEventListener("dragover", preventDefaultDragOver, false);
    window.addEventListener("drop", preventDefaultDrop, false);

    return () => {
      window.removeEventListener("dragover", preventDefaultDragOver, false);
      window.removeEventListener("drop", preventDefaultDrop, false);
    };
  }, []);

  return (
    <div>
      <h3 className="text-richBlack-5">
        {label} <span className="text-lg text-pink-200">*</span>
      </h3>

      <div
        className={`mt-2 block rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow`}
      >
        {!previewSource ? (
          <label htmlFor={name}>
            <div
              onDragEnter={handleDrag}
              className="relative flex h-52 flex-col items-center justify-evenly overflow-hidden text-center text-sm text-richBlack-200"
            >
              <i className="cursor-pointer rounded-full bg-richBlack-900 p-2 text-xl text-yellow-50">
                {video ? <BiVideoPlus /> : <BiImageAdd />}
              </i>
              <p>
                Drag and drop or{" "}
                <span className="cursor-pointer text-yellow-50">browse</span>{" "}
                <br />
                Max 6MB each (12MB for videos)
              </p>
              <div className="flex gap-4">
                <span>◉ Aspect 16:9</span>
                <span>◉ Recommended size 1024x576</span>
              </div>

              {dragActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 top-0 rounded-xl bg-richBlack-500 bg-opacity-30"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                ></div>
              )}
            </div>
          </label>
        ) : (
          //preview
          <div className="mx-auto px-3">
            {!video ? (
              <img
                src={previewSource}
                alt=""
                className="aspect-video h-[300px] w-fit rounded-lg object-contain"
              />
            ) : (
              <video src={previewSource} className="aspect-video ">
                <source src={previewSource} />
              </video>
            )}
          </div>
        )}
        <button
          className="ml-[45%] cursor-pointer text-sm text-richBlack-300 underline"
          onClick={(e) => {
            e.preventDefault();
            previewSource === url
              ? setPreviewSource(null)
              : setPreviewSource(url || null);
            mediaInputRef.current.value = null;
          }}
        >
          cancel
        </button>
      </div>
      <input
        name={name}
        ref={mediaInputRef}
        id={name}
        type="file"
        accept={video ? "video/*" : "image/*"}
        className="block scale-x-0"
        onChange={handleChange}
      />
      {!previewSource && (
        <span role="alert" className="text-yellow-50">
          {video ? "video" : "Image"} is required
        </span>
      )}
    </div>
  );
};

export default ImageUploadField;
