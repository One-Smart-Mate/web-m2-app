import { Card } from "antd";
import { formatDate, getCardStatusAndText } from "../../../utils/Extensions";
import { CardInterface } from "../../../data/card/card";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";

interface CardProps {
  data: CardInterface;
}

const InformationPanel = ({ data }: CardProps) => {
  const { status, text } = getCardStatusAndText(data.status);
  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          {data.cardTypeMethodologyName} {data.siteCardId}
        </h2>
      }
      className="max-w-sm h-96 mx-auto bg-gray-100 rounded-xl shadow-md"
      onClick={() =>
        console.log(
          "Hola tarjeta",
          data.cardTypeMethodologyName + data.siteCardId
        )
      }
      hoverable
    >
      <div className="grid gap-x-2 md:gap-x-0 gap-y-1 grid-cols-3 text-black font-medium">
        <span>{Strings.status}</span>
        <CustomTag className="col-span-2 w-min text-sm" color={status}>
          {text}
        </CustomTag>

        <span>{Strings.cardType}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {data.cardTypeMethodologyName}
          </p>
        </div>

        <span>{Strings.preclassifier}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {data.preclassifierCode} {data.preclassifierDescription}
          </p>
        </div>

        <span>{Strings.area}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {data.areaName}
          </p>
        </div>

        <span>{Strings.createdBy}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {data.creatorName}
          </p>
        </div>

        <span>{Strings.date}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {formatDate(data.cardCreationDate)}
          </p>
        </div>

        <span>{Strings.dueDate}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {data.cardDueDate}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InformationPanel;
