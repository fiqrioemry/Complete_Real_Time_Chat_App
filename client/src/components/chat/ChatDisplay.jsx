/* eslint-disable react/prop-types */
import { formatMessageTime } from "../../utils/formatTime";

const ChatDisplay = ({ messages, authUser, selectedUser, messageRef }) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${
            message.senderId === authUser.userId ? "chat-end" : "chat-start"
          }`}
          ref={messageRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser.userId
                    ? authUser.avatar || "/avatar.png"
                    : selectedUser.avatar || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatDisplay;
