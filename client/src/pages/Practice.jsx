import { signInFormConfig, signInFormState } from "../config";
import { useFormState } from "../hooks/useFormState"; // Mengimpor custom hook
import { useAuthStore } from "../store/useAuthStore";

const Practice = () => {
  const { testing } = useAuthStore();
  const { formData, handleChange, handleValidate } =
    useFormState(signInFormState);

  const isValid = handleValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    testing(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="min-w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          {signInFormConfig.map((set, index) => (
            <div className="space-y-2" key={index}>
              <label htmlFor={set.id}>{set.name}</label>
              <input
                id={set.id}
                type={set.type}
                value={formData[set.name]}
                name={set.name}
                onChange={handleChange}
                placeholder={set.placeholder}
                className="w-full py-2 px-4 h-9 border rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={!isValid}
            className={`${
              !isValid ? "bg-gray-200" : " bg-blue-500"
            } "w-full py-2 px-4 text-white rounded duration-300 transition-all"`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Practice;
