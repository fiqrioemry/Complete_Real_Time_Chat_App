import { useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./chat/ChatDisplay";
import ChatFormInput from "./chat/ChatFormInput";
import ChatSkeleton from "./skeletons/ChatSkeleton";
import ChatFormPreview from "./chat/ChatFormPreview";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFormState } from "../hooks/useFormState";
import { useLoadMessage } from "../hooks/useLoadMessage";
import { fileOption, messageFormState } from "../config";
import { useScrollMessage } from "../hooks/useScrollMessage";
import ChatSendLoading from "./chat/ChatSendLoading";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messageRef = useRef(null);
  const { authUser } = useAuthStore();
  const { sendMessage, isSendLoading } = useChatStore();

  const { formData, setFormData, handleChange, handleRemove, fileInputRef } =
    useFormState(messageFormState);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() && !formData.file) return;

    try {
      await sendMessage({ text: formData.text.trim(), file: formData.file });
      setFormData({ text: "", file: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  useLoadMessage(
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser
  );

  useScrollMessage(messageRef, messages, isSendLoading);

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
            messageRef={messageRef}
            selectedUser={selectedUser}
          />
        )}
        {isSendLoading && (
          <ChatSendLoading
            user={authUser}
            formData={formData}
            messageRef={messageRef}
          />
        )}
      </div>

      <div className="p-4 w-full">
        <ChatFormInput
          formData={formData}
          fileOption={fileOption}
          handleChange={handleChange}
          fileInputRef={fileInputRef}
          handleSendMessage={handleSendMessage}
        />
        {!isSendLoading && (
          <ChatFormPreview formData={formData} handleRemove={handleRemove} />
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
