import { Card } from "antd";
import { getCardStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
  isLoading: boolean;
}

const InfoCard = ({ data, isLoading }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="max-w-sm bg-gray-100 rounded-xl shadow-md"
        loading={isLoading}
      />
    );
  }
  const { card } = data;

  const cardStatus = getCardStatusAndText(card.status);

  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          {Strings.information}
        </h2>
      }
      className="w-fit bg-gray-100 rounded-xl shadow-md"
    >
      <div className="space-y-1 flex-wrap text-black font-medium">
        <div className=" flex flex-row gap-2">
          <span className="w-10">{Strings.dueDate}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.cardDueDate}
          </p>
        </div>
        <div className=" flex gap-2">
          <span className="w-10">{Strings.status}</span>
          <div>
            <CustomTag className="w-fit text-sm" color={cardStatus.status}>
              {cardStatus.text}
            </CustomTag>
          </div>
        </div>
        <div className=" flex gap-2">
          <span className="w-10">{Strings.cardType}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.cardTypeMethodologyName}
          </p>
        </div>

        <span>{Strings.problemType}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.preclassifierCode} - {card.preclassifierDescription}
          </p>
        </div>
        <div></div>
        <div>
          <span>{Strings.priority}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.priorityCode} - {card.priorityDescription}
          </p>
        </div>
        <div>
          <span>{Strings.mechanic}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.mechanicName || "N/A"}
          </p>
        </div>
        <div>
          <span>{Strings.creator}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.creatorName}
          </p>
        </div>
        <div>
          <span>{Strings.comments}</span>
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.commentsAtCardCreation || Strings.NA}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
