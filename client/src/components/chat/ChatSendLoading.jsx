const ChatSendLoading = ({ user, preview = null }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img src={user.avatar} alt="Profile pic" />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1"></time>
      </div>
      <div className="chat-bubble relative flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
        {preview && (
          <img
            src={preview}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2"
          />
        )}
      </div>
    </div>
  );
};

export default ChatSendLoading;
