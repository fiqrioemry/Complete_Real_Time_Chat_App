import Navbar from "../Navbar";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </Fragment>
  );
};

export default PageLayout;
