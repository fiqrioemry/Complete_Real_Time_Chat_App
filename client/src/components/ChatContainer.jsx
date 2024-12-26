import ChatHeader from "./ChatHeader";
import { useRef } from "react";
import ChatDisplay from "./chat/ChatDisplay";
import { File, Image, Paperclip, Send, Trash, X } from "lucide-react";
import ChatSkeleton from "./skeletons/ChatSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFormState } from "../hooks/useFormState";
import { useLoadMessage } from "../hooks/useLoadMessage";
import { useScrollMessage } from "../hooks/useScrollMessage";
import { fileOption, messageFormState } from "../config";
import FilePreview from "./chat/FilePreview";

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

  const { formData, setFormData, handleChange, handleRemove } =
    useFormState(messageFormState);

  const handleFile = (type) => {
    const input = document.createElement("input");
    input.type = "file";

    if (type === "image") input.accept = "image/*";
    else if (type === "video") input.accept = "video/*";
    else if (type === "document") input.accept = ".pdf,.doc,.docx,.txt";

    input.onchange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            file: { name: file.name, type, path: reader.result },
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() && !formData.file) return;
    console.log("Sending message:", formData);
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
                    onClick={() => handleFile(item.title)}
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
              onChange={handleChange}
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
        <FilePreview formData={formData} handleRemove={handleRemove} />
      </div>
    </div>
  );
};

export default ChatContainer;
