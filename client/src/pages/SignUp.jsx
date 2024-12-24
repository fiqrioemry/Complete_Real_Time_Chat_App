import { useForm } from "react-hook-form";

import { signUpFormControl } from "../config";
import { useAuthStore } from "../store/useAuthStore";

import AuthHeadingForm from "../components/auth/AuthHeadingForm";
import AuthControlForm from "../components/auth/AuthControlForm";
import AuthImage from "../components/auth/AuthImage";
import AuthFooterForm from "../components/auth/AuthFooterForm";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isSigningUp } = useAuthStore();

  const onSubmit = (formData) => signUp(formData);

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AuthHeadingForm
            title="welcome back"
            description="Sign in to your account"
          />
          {/* Form */}
          <AuthControlForm
            onSubmit={handleSubmit(onSubmit)}
            buttonTitle="Sign Up"
            register={register} // Mengirim register ke FormControl
            errors={errors}
            disabled={isSigningUp}
            inputFormControl={signUpFormControl}
          />

          <AuthFooterForm
            title="create account"
            path="/signup"
            description="Don't have an account"
          />
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImage
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};
export default SignUp;
