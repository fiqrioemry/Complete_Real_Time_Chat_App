export const signInFormControl = [
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    required: "Email address is required",
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: "Password is required",
    style: "input input-bordered w-full",
  },
];

export const signUpFormControl = [
  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    required: "Fullname is required",
    lengthValue: 8,
    lengthMessage: "Fullname must be at least 6 characters long",
    patternValue: null,
    patternMessage: null,
    style: "input input-bordered w-full",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    required: "Email is required",
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: "Password is required",
    style: "input input-bordered w-full",
  },
];
