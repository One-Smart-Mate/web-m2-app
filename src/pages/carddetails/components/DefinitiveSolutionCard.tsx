import { Card } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
}

const DefinitiveSolutionCard = ({ data }: CardProps) => {
  if (!data) {
    return (
      <Card className="w-64 bg-gray-100 rounded-xl shadow-md" loading={true} />
    );
  }
  const { card } = data;

  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          {Strings.definitiveSolution}
        </h2>
      }
      className=" bg-gray-100 rounded-xl shadow-md"
    >
      <div className="space-y-2 flex-wrap w-64 text-black font-medium">
        <div className=" flex flex-row gap-5">
          <span className="w-16">{Strings.definitiveUser}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.userDefinitiveSolutionName || Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex flex-row gap-5">
          <span className="w-16">{Strings.definitiveDate}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.cardDefinitiveSolutionDate || Strings.NA}
            </p>
          </div>
        </div>
        <div className=" flex flex-row gap-5">
          <span className="w-16">{Strings.definitiveComments}</span>
          <div>
            <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
              {card.commentsAtCardDefinitiveSolution || Strings.NA}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DefinitiveSolutionCard;
