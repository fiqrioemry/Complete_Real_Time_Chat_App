import { useForm } from "react-hook-form";
import { signUpFormControl } from "../config";
import { useAuthStore } from "../store/useAuthStore";
import AuthImage from "../components/auth/AuthImage";
import AuthFooterForm from "../components/auth/AuthFooterForm";
import AuthHeadingForm from "../components/auth/AuthHeadingForm";
import AuthControlForm from "../components/auth/AuthControlForm";

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
      <div className="flex flex-col justify-center bg-base-100 items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AuthHeadingForm
            title="Create Account"
            description="Get started with your free account"
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
            title="Sign In"
            path="/signin"
            description="Already have an account ?"
          />
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImage
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUp;
