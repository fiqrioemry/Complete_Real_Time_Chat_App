import { useRef, useState } from "react";

export const useFormState = (initialFormState) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          file: { name: file.name, type: name, path: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemove = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRemove,
    fileInputRef,
  };
};
