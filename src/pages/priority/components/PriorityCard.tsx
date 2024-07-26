import { Card, Dropdown, MenuProps, Tag, theme } from "antd";
import { getStatusAndText } from "../../../utils/Extensions";
import { SlOptionsVertical } from "react-icons/sl";
import Strings from "../../../utils/localizations/Strings";
import UpdatePriority from "./UpdatePriority";
import { Priority } from "../../../data/priority/priority";

interface CardProps {
  data: Priority;
}

const PriorityCard = ({ data }: CardProps) => {
  const { status, text } = getStatusAndText(data.status);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <UpdatePriority priorityId={data.id} />,
    },
  ];

  const titleCard = (
    <div className="flex flex-row justify-center items-center">
      <div className="ml-2 max-w-xs">
        <p className="break-words text-wrap text-sm md:text-base text-white">
          {data.priorityCode}
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
          <h1 className="font-semibold mr-1">{Strings.description}: </h1>
          <p>{data.priorityDescription}</p>
        </div>
        <div className="flex  flex-row">
          <h1 className="font-semibold mr-1">{Strings.daysNumber}: </h1>
          <p>{data.priorityDays}</p>
        </div>
      </div>
    </Card>
  );
};

export default PriorityCard;