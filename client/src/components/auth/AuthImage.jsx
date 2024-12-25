import Logo from "../Logo";

/* eslint-disable react/prop-types */
const AuthImage = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`flex items-center h-[120px] justify-center aspect-square rounded-2xl bg-primary/10  text-3xl  font-extrabold ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            >
              {i === 0 && "C"}
              {i === 1 && "H"}
              {i === 2 && "A"}
              {i === 3 && "T"}
              {i === 4 && <Logo />}
              {i === 5 && "Y"}
              {i === 6 && "B"}
              {i === 7 && "O"}
              {i === 8 && "X"}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImage;
