import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import Strings from "../../utils/localizations/Strings";

const NotFound: React.FC = () => (
  <Result
    status="404"
    title={Strings.notFoundPageTitle}
    subTitle={Strings.notFoundPageSubTitle}
    extra={
      <Link to={"/"}>
        <Button type="primary">{Strings.goBack}</Button>
      </Link>
    }
  />
);

export default NotFound;
