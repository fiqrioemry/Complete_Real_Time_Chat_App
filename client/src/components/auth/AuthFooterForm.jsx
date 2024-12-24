/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const AuthFooterForm = ({ title, path, description }) => {
  return (
    <div className="text-center">
      <p className="text-base-content/60">
        {description}
        <Link to={path} className="link link-primary">
          {title}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooterForm;
