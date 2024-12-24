/* eslint-disable react/prop-types */
const AuthControlForm = ({
  onSubmit,
  register,
  errors,
  disabled,
  buttonTitle,
  required,
  inputFormControl,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {inputFormControl.map((form, index) => (
        <div className="mb-6" key={index}>
          <label htmlFor={form.name} className="block text-gray-700 mb-2">
            {form.name}
          </label>
          <input
            id={form.name}
            type={form.type}
            placeholder={form.placeholder}
            {...register(form.name, {
              required: required,
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

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={disabled}
      >
        {disabled ? (
          <span className="loading loading-spinner"></span>
        ) : (
          buttonTitle
        )}
      </button>
    </form>
  );
};

export default AuthControlForm;
