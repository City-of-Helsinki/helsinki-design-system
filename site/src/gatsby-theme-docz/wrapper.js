import * as React from "react";
import { Helmet } from "react-helmet";

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
    {children}
  </React.Fragment>
);
export default Wrapper;
