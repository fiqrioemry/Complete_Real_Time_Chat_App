import { useEffect } from "react";

export const useLoadMessage = (
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
  selectedUser
) => {
  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);
};
