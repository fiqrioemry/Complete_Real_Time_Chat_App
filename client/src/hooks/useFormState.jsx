import { useState } from "react";

export const useFormState = (initialFormState) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemove = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const handleValidate = () => {
    for (let field in formData) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRemove,
    handleValidate,
  };
};
