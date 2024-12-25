/* eslint-disable react/prop-types */
const AuthControlForm = ({
  onSubmit,
  register,
  errors,
  disabled,
  buttonTitle,
  loading,
  inputFormControl,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {inputFormControl.map((form, index) => (
        <div className="h-[90px]" key={index}>
          <label
            htmlFor={form.name}
            className="block text-base-content/60 mb-3"
          >
            {form.name}
          </label>
          <input
            id={form.name}
            type={form.type}
            placeholder={form.placeholder}
            {...register(form.name, {
              required: true,
              minLength: {
                value: form.lengthValue,
                message: form.lengthMessage,
              },
              pattern: {
                value: form.patternValue,
                message: form.patternMessage,
              },
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

      <div className="pt-3">
        <button
          type="submit"
          className="btn btn-primary w-full "
          disabled={disabled || loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            buttonTitle
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthControlForm;
