import ChatHeader from "./ChatHeader";
import { useRef } from "react";
import ChatDisplay from "./chat/ChatDisplay";
import { Image, Paperclip, Send, Trash, X } from "lucide-react";
import ChatSkeleton from "./skeletons/ChatSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFormState } from "../hooks/useFormState";
import { useLoadMessage } from "../hooks/useLoadMessage";
import { useScrollMessage } from "../hooks/useScrollMessage";
import { fileOption, messageFormState } from "../config";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const fileRef = useRef(null);
  const messageRef = useRef(null);
  const { authUser } = useAuthStore();

  const { formData, setFormData, handleInputChange, handleRemove } =
    useFormState(messageFormState);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() && !formData.file) return;

    console.log("Sending message:", formData);

    setFormData(messageFormState);
  };

  useLoadMessage(
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser
  );

  useScrollMessage(messageRef, messages);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isMessagesLoading ? (
          <ChatSkeleton />
        ) : (
          <ChatDisplay
            messages={messages}
            authUser={authUser}
            selectedUser={selectedUser}
            messageRef={messageRef}
          />
        )}
      </div>

      <div className="p-4 w-full">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
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
                {fileOption.map((item) => (
                  <button
                    type="button"
                    name="file"
                    onClick={handleInputChange}
                    className="flex items-center hover:bg-base-100 rounded-md gap-x-2 py-2 px-2"
                    key={item.title}
                  >
                    {<item.icon />}
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              name="text"
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message..."
              value={formData.text}
              onChange={handleInputChange}
            />

            <button
              type="button"
              className={`hidden sm:flex btn btn-circle
                     ${formData.file ? "text-emerald-500" : "text-zinc-400"}`}
              onClick={() => fileRef.current?.click()}
            >
              <Image size={20} />
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!formData.text.trim() && !formData.file}
          >
            <Send size={22} />
          </button>
        </form>

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
            {formData.file.name === "document" && (
              <div className="flex items-center gap-2">
                <File />
                <span>{filePreview.file.name}</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-error btn-sm"
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
