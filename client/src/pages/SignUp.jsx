import { useForm } from "react-hook-form";
import { signUpFormControl } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImage from "../components/auth/AuthImage";
import AuthFooterForm from "../components/auth/AuthFooterForm";
import AuthHeadingForm from "../components/auth/AuthHeadingForm";
import AuthControlForm from "../components/auth/AuthControlForm";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const onSubmit = (formData) => signUp(formData, navigate);

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-base-100 items-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-8">
          <AuthHeadingForm
            title="Create Chatbox Account"
            description="Get started with your free account"
          />
          <AuthControlForm
            errors={errors}
            register={register}
            buttonTitle="Sign Up"
            loading={isSigningUp}
            disabled={!isValid}
            onSubmit={handleSubmit(onSubmit)}
            inputFormControl={signUpFormControl}
          />
          <AuthFooterForm
            title="Sign In"
            path="/signin"
            description="Already have an account ? "
          />
        </div>
      </div>
      <AuthImage
        title="Easy and Simple in a BOX"
        subtitle="Connect and stay in touch with your loved ones ."
      />
    </div>
  );
};

export default SignUp;
