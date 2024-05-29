import { Card, Dropdown, MenuProps, Tag, theme } from "antd";
import { Company } from "../../../data/company/company";
import CustomButton from "../../../components/CustomButtons";
import { getStatusAndText } from "../../../utils/Extensions";
import { SlOptionsVertical } from "react-icons/sl";
import Strings from "../../../utils/localizations/Strings";
import UpdateCompany from "./UpdateCompany";
import { useAppDispatch } from "../../../core/store";
import {
  resetChangeIndicator,
  resetRowData,
  setRowData,
} from "../../../core/genericReducer";

interface CompanyCardProps {
  data: Company;
}

const CompanyCard = ({ data }: CompanyCardProps) => {
  const { status, text } = getStatusAndText(data.status);
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const handleUpdateClick = (row: Company) => {
    dispatch(resetRowData());
    dispatch(setRowData(row));
    dispatch(resetChangeIndicator());
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <CustomButton type="action">{Strings.viewPriorities}</CustomButton>
      ),
    },
    {
      key: "2",
      label: <CustomButton type="action">{Strings.viewLevels}</CustomButton>,
    },
    {
      key: "3",
      label: <CustomButton type="action">{Strings.viewCardTypes}</CustomButton>,
    },
    {
      key: "4",
      label: <CustomButton type="action">{Strings.viewCards}</CustomButton>,
    },
    {
      key: "5",
      label: <UpdateCompany onClick={handleUpdateClick} row={data} />,
    },
    {
      key: "6",
      label: <CustomButton type="action">{Strings.importExcel}</CustomButton>,
    },
  ];

  const titleCard = (
    <div className="flex flex-row justify-center items-center">
      <img className="size-9 border-white border" src={data.logo} alt="logo" />
      <div className="ml-2 max-w-xs">
        <p className="break-words text-wrap text-sm md:text-base text-white">
          {data.name}
        </p>
      </div>
      <div className="absolute left-1">
        <Dropdown menu={{ items }} arrow>
          <SlOptionsVertical
            color={colorPrimary}
            size={20}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      </div>
    </div>
  );

  return (
    <Card
      styles={{ body: { backgroundColor: colorBgContainer } }}
      key={data.id}
      type="inner"
      title={titleCard}
      className="h-max shadow-xl overflow-hidden text-sm md:text-base relative"
    >
      <div className="absolute right-0 top-11">
        {" "}
        <Tag color={status}>{text}</Tag>
      </div>
      <div className="">
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.rfc}: </h1>
          <p>{data.rfc}</p>
        </div>
        <div className="flex  flex-row">
          <h1 className="font-semibold mr-1">{Strings.companyAddress}: </h1>
          <p>{data.address}</p>
        </div>
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.contact}: </h1>
          <p>{data.contact}</p>
        </div>
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.position}: </h1>
          <p>{data.position}</p>
        </div>
        <div className="flex flex-row flex-wrap">
          <h1 className="font-semibold mr-1">{Strings.phone}: </h1>
          <p>{data.phone}</p>
          <h1 className="font-semibold  ml-2 mr-1">{Strings.extension}: </h1>
          <p>{data.extension}</p>
        </div>
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.cellular}: </h1>
          <p>{data.cellular}</p>
        </div>
        <div className="flex flex-row flex-wrap">
          <h1 className="font-semibold mr-1">{Strings.email}: </h1>
          <p>{data.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;
