import { Card } from "antd";
import { getCardStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
}

const InfoCard = ({ data }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="min-w-80 min-h-80 bg-gray-100 rounded-xl shadow-md"
        loading={true}
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
      className="bg-gray-100 rounded-xl shadow-md"
    >
      <div className="space-y-2 flex-wrap md:w-80 text-black font-medium">
        <div className=" flex flex-row gap-5">
          <span className="w-16">{Strings.dueDate}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.cardDueDate || Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.status}</span>
          <div>
            <CustomTag className="w-fit text-sm" color={cardStatus.status}>
              {cardStatus.text}
            </CustomTag>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.cardType}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.cardTypeMethodologyName || Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.problemType}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.preclassifierCode
                ? `${card.preclassifierCode} - ${card.preclassifierDescription}`
                : Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.priority}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.priorityCode
                ? `${card.priorityCode} - ${card.priorityDescription}`
                : Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.mechanic || Strings.NA}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.mechanicName || "N/A"}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.creator || Strings.NA}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.creatorName || Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex gap-5">
          <span className="w-16">{Strings.comments || Strings.NA}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.commentsAtCardCreation || Strings.NA}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
