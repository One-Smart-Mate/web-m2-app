import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  siteId: string;
  siteName: string;
}

const ViewUsersButton = ({ siteId, siteName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (siteId: string, siteName: string) => {
    navigate(Routes.SiteUsers, { state: { siteId, siteName } });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(siteId, siteName)}
    >
      {Strings.viewUsers}
    </CustomButton>
  );
};

export default ViewUsersButton;
