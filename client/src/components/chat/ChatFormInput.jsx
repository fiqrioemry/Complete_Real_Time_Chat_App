/* eslint-disable react/prop-types */
import { Paperclip, Send } from "lucide-react";
import toast from "react-hot-toast"; // Pastikan sudah menginstall react-hot-toast

const ChatFormInput = ({
  handleSendMessage,
  fileOption,
  handleChange,
  formData,
  fileInputRef,
}) => {
  const handleFileChange = (e) => {
    const name = e.target.name;

    if (name !== "image") {
      toast.error("Feature disabled in demo");

      e.target.value = "";
    } else {
      handleChange(e);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className="flex-1 flex gap-2">
        <div className="dropdown dropdown-top">
          <button
            type="button"
            tabIndex={0}
            role="button"
            className="btn btn-sm md:btn-md"
          >
            <Paperclip />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 mb-2 shadow"
          >
            {fileOption.map((item) => (
              <label
                key={item.title}
                className="flex items-center gap-2 py-2 px-2 hover:bg-base-100 rounded-md cursor-pointer duration-150 transition-all"
              >
                <item.icon />
                {item.title}
                <input
                  type="file"
                  ref={fileInputRef}
                  name={item.title}
                  accept={
                    item.title === "image"
                      ? "image/*"
                      : item.title === "video"
                      ? "video/*"
                      : ".pdf,.doc,.docx,.txt"
                  }
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={formData.text}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-circle"
        disabled={!formData.text.trim() && !formData.file}
      >
        <Send size={22} />
      </button>
    </form>
  );
};

export default ChatFormInput;
