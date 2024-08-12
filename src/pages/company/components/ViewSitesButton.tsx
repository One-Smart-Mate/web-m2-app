import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  companyId: string;
  companyName: string;
}

const ViewSitesButton = ({ companyId, companyName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (companyId: string, companyName: string) => {
    navigate(Routes.AdminPrefix + Routes.SitesAllByCompany, {
      state: { companyId, companyName },
    });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(companyId, companyName)}
    >
      {Strings.viewSites}
    </CustomButton>
  );
};

export default ViewSitesButton;
