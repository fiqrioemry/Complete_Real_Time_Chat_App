import { File, Image, Video } from "lucide-react";

export const signUpFormControl = [
  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    lengthValue: 6,
    lengthMessage: "Fullname must be at least 6 characters long",
    patternValue: null,
    patternMessage: null,
    style: "input input-bordered w-full",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    lengthValue: null,
    lengthMessage: null,
    patternValue: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: "Please enter a valid email address",
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    lengthValue: 6,
    lengthMessage: "Password must be at least 6 characters long", // Panjang minimal password
    patternValue: null,
    patternMessage: null,
    style: "input input-bordered w-full",
  },
];

export const signInFormControl = [
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    minLengthValue: null,
    minLengthMessage: null,
    patternValue: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: "Please enter a valid email address",
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    minLengthValue: null,
    minLengthMessage: null,
    patternValue: null,
    patternMessage: null,
    style: "input input-bordered w-full",
  },
];

export const nonAuthPath = ["/signin", "/signup"];

export const authPath = ["/", "/settings", "/profile"];

export const fileOption = [
  {
    icon: Video,
    title: "video",
  },
  {
    icon: Image,
    title: "image",
  },
  {
    icon: File,
    title: "document",
  },
];
export const messageFormState = {
  text: "",
  file: null,
};

export const signInFormState = {
  username: "",
  email: "",
  password: "",
};

export const signInFormConfig = [
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "input username ...",
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "input email ...",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "input password ...",
  },
];

{
  /* <ChatSendLoading user={authUser} preview={formData.image} />; */
}
