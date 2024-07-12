import { Card } from "antd";
import { getCardStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";
import { CardInterface } from "../../../data/card/card";
import { useEffect } from "react";

interface CardProps {
  data: CardInterface;
  isLoading: boolean;
}

const InfoCard = ({
  data: {
    cardDueDate,
    status,
    cardTypeMethodologyName,
    preclassifierCode,
    preclassifierDescription,
    priorityCode,
    priorityDescription,
    creatorName,
    commentsAtCardCreation,
    mechanicName,
  },
  isLoading,
}: CardProps) => {
  const cardStatus = getCardStatusAndText(status);
  useEffect(() => {
    console.log(cardDueDate);
  });
  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          Information
        </h2>
      }
      className="max-w-sm h-96 mx-auto bg-gray-100 rounded-xl shadow-md"
      loading={isLoading}
    >
      <div className="grid gap-x-2 md:gap-x-0 gap-y-1 grid-cols-3 text-black font-medium">
        <span>{Strings.dueDate}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {cardDueDate}
          </p>
        </div>

        <span>{Strings.cardType}</span>
        <CustomTag
          className="col-span-2 w-min text-sm"
          color={cardStatus.status}
        >
          {cardStatus.text}
        </CustomTag>

        <span>{Strings.cardType}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {cardTypeMethodologyName}
          </p>
        </div>

        <span>{Strings.preclassifier}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {preclassifierCode} - {preclassifierDescription}
          </p>
        </div>

        <span>{Strings.priority}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {priorityCode} - {priorityDescription}
          </p>
        </div>

        <span>{Strings.mechanic}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {mechanicName || "N/A"}
          </p>
        </div>

        <span>{Strings.creator}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {creatorName}
          </p>
        </div>

        <span>{Strings.comments}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {commentsAtCardCreation || "N/A"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
