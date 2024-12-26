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
      <div className="chat-bubble flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
        {formData.file && (
          <img
            src={formData.file.path}
            alt="preview"
            className="sm:max-w-[200px] rounded-md mb-2"
          />
        )}
        {formData.text && <p>{formData.text}</p>}
      </div>
    </div>
  );
};

export default ChatSendLoading;
