import { Card } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
  isLoading: boolean;
}

const DefinitiveSolutionCard = ({ data, isLoading }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="max-w-sm bg-gray-100 rounded-xl shadow-md"
        loading={isLoading}
      />
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
      className="max-w-xs bg-gray-100 rounded-xl shadow-md"
    >
      <div className="grid gap-x-2 md:gap-x-0 gap-y-1 grid-cols-3 text-black font-medium">
        <span>{Strings.definitiveUser}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.userDefinitiveSolutionName || Strings.NA}
          </p>
        </div>

        <span>{Strings.definitiveDate}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.cardDefinitiveSolutionDate || Strings.NA}
          </p>
        </div>

        <span>{Strings.definitiveComments}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.commentsAtCardDefinitiveSolution || Strings.NA}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DefinitiveSolutionCard;
