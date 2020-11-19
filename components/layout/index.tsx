import React, { FC } from "react";
import Container from "components/layout/container";
import Navbar from "components/navbar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
