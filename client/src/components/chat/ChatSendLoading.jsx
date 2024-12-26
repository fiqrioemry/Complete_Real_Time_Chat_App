import { File } from "lucide-react";

/* eslint-disable react/prop-types */
const ChatSendLoading = ({ user, formData, messageRef }) => {
  return (
    <div className="chat chat-end" ref={messageRef}>
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img src={user.avatar} alt="Profile pic" />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1"></time>
      </div>
      <div>
        <div className="chat-bubble relative flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
          {formData.file && (
            <div className="flex items-center gap-4 border p-2 mt-2 rounded-md">
              {formData.file.type === "image" && (
                <img
                  src={formData.file.path}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              {formData.file.type === "video" && (
                <div>
                  <h3>Video Preview:</h3>
                  <video width="300" controls>
                    <source src={formData.file.path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {formData.file.type === "document" && (
                <div className="flex items-center gap-2">
                  <File />
                  <span>{formData.file.name}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {formData.text && <p>{formData.text}</p>}
      </div>
    </div>
  );
};

export default ChatSendLoading;
