import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import Strings from "../../utils/localizations/Strings";

const Unauthorized: React.FC = () => (
  <Result
    status="403"
    title={Strings.unauthorizedPageTitle}
    subTitle={Strings.unauthorizedPageSubTitle}
    extra={
      <Link to={"/"}>
        <Button type="primary">{Strings.goBack}</Button>
      </Link>
    }
  />
);

export default Unauthorized;
