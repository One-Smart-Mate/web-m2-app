import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  siteId: string;
  siteName: string;
}

const ViewPrioritiesButton = ({ siteId, siteName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (siteId: string, siteName: string) => {
    navigate(Routes.AdminPrefix + Routes.PriorityAll, { state: { siteId, siteName } });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(siteId, siteName)}
    >
      {Strings.viewPriorities}
    </CustomButton>
  );
};

export default ViewPrioritiesButton
