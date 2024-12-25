/* eslint-disable react/prop-types */

const AuthHeadingForm = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex flex-col items-center gap-2 group">
        <h1 className="text-2xl font-bold mt-2">{title}</h1>
        <p className="text-base-content/60">{description}</p>
      </div>
    </div>
  );
};

export default AuthHeadingForm;
