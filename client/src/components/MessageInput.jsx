import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { File, Image, Paperclip, Send, Trash, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { fileOption } from "../config";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const { register, handleSubmit, setValue, reset } = useForm();

  const [filePreview, setFilePreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileUpload = (type) => {
    setFileType(type);
    const input = document.createElement("input");
    input.type = "file";

    if (type === "image") input.accept = "image/*";
    else if (type === "video") input.accept = "video/*";
    else if (type === "document") input.accept = ".pdf,.doc,.docx,.txt";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFilePreview({
          type,
          file,
          url: URL.createObjectURL(file),
        });
        setValue("file", file, { shouldValidate: true });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileType(null);
    setValue("file", null, { shouldValidate: true });
  };

  const onSubmit = (formData) => {
    if (filePreview) URL.revokeObjectURL(filePreview.url);
    setFilePreview(null);
    setFileType(null);
    reset();
    console.log(formData);
    sendMessage(filePreview.url);
  };

  return (
    <div className="px-2 py-2 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-x-2"
      >
        <div className="dropdown dropdown-top">
          <button
            type="button"
            tabIndex={0}
            role="button"
            className="btn btn-sm md:btn-md "
          >
            <Paperclip />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 mb-2 shadow"
          >
            {fileOption.map((item, index) => (
              <button
                type="button"
                onClick={() => handleFileUpload(item.title)}
                className="flex items-center hover:bg-base-100 rounded-md gap-x-2 py-2 px-2"
                key={index}
              >
                {<item.icon />}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          {...register("text")}
        />
        <button type="submit" className="btn btn-sm sm:btn-md">
          <Send size={22} />
        </button>
      </form>

      {/* Preview File */}
      {filePreview && (
        <div className="flex items-center gap-4 border p-2 mt-2 rounded-md">
          {fileType === "image" && (
            <img
              src={filePreview.url}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          {filePreview && fileType === "video" && (
            <div>
              <h3>Video Preview:</h3>
              <video width="300" controls>
                <source src={filePreview} type={File.type} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {fileType === "document" && (
            <div className="flex items-center gap-2">
              <File />
              <span>{filePreview.file.name}</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemoveFile}
            className="btn btn-error btn-sm"
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
