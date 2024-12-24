export const signUpFormControl = [
  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    required: "Fullname is required",
    lengthValue: 6,
    lengthMessage: "Fullname must be at least 6 characters long", // Panjang minimal fullname
    patternValue: null,
    patternMessage: null,
    style: "input input-bordered w-full",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    required: "Email is required",
    patternValue: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: "Please enter a valid email address", // Validasi format email
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: "Password is required",
    minLengthValue: 8,
    minLengthMessage: "Password must be at least 8 characters long", // Panjang minimal password
    patternValue: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    patternMessage:
      "Password must contain at least one uppercase letter, one number, and one special character", // Kombinasi karakter
    style: "input input-bordered w-full",
  },
];

export const signInFormControl = [
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    required: "Email address is required",
    patternValue: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: "Please enter a valid email address",
    style: "input input-bordered w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: "Password is required",
    minLengthValue: 8,
    minLengthMessage: "Password must be at least 8 characters long",
    patternValue: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    patternMessage:
      "Password must contain at least one uppercase letter, one number, and one special character",
    style: "input input-bordered w-full",
  },
];
