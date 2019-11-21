import * as React from "react";
import { Helmet } from "react-helmet";

import "./assets/index.css";

const Wrapper = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <title>Helsinki Design System</title>
      <link
        rel="icon"
        type="image/x-icon"
        href={require("./assets/favicon.ico")}
      />
    </Helmet>
    <div className="text-body">{children}</div>
  </React.Fragment>
);
export default Wrapper;
