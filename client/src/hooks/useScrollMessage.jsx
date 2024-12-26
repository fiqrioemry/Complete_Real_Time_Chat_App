import { useEffect } from "react";

export const useScrollMessage = (messageRef, messages, isSendLoading) => {
  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageRef, messages, isSendLoading]);
};
