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

  const { formData, handleChange, handleRemove } =
    useFormState(messageFormState);

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
            messageRef={messageRef}
            selectedUser={selectedUser}
          />
        )}
      </div>

      <div className="p-4 w-full">
        <ChatFormInput
          formData={formData}
          fileOption={fileOption}
          handleChange={handleChange}
          handleSendMessage={handleSendMessage}
        />
        <ChatFormPreview formData={formData} handleRemove={handleRemove} />
      </div>
    </div>
  );
};

export default ChatContainer;
