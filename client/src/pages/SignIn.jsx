import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import { signInFormControl } from "../config";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isLoggingIn } = useAuthStore();

  const onSubmit = (formData) => signIn(formData);

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {signInFormControl.map((form, index) => (
              <div className="mb-6" key={index}>
                <label htmlFor={form.name} className="block text-gray-700 mb-2">
                  {form.name}
                </label>
                <input
                  id={form.name}
                  type={form.type}
                  placeholder={form.placeholder}
                  {...register(form.name, {
                    required: form.message,
                  })}
                  className={form.style}
                />

                {errors[form.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[form.name].message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Dont have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};
export default SignIn;
