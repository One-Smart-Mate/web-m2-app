import { Card } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
  isLoading: boolean;
}

const ProvisionalSolutionCard = ({ data, isLoading }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="max-w-md  mx-auto bg-gray-100 rounded-xl shadow-md"
        loading={isLoading}
      />
    );
  }
  const { card } = data;

  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          {Strings.provisionalSolution}
        </h2>
      }
      className="max-w-xs bg-gray-100 rounded-xl shadow-md"
    >
      <div className="grid gap-x-2 md:gap-x-0 gap-y-1 grid-cols-3 text-black font-medium">
        <span>{Strings.provisionalUser}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.userDefinitiveSolutionName || Strings.NA}
          </p>
        </div>

        <span>{Strings.provisionalDate}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.cardDefinitiveSolutionDate || Strings.NA}
          </p>
        </div>

        <span>{Strings.provisionalComments}</span>
        <div className="col-span-2">
          <p className="max-w-48 w-fit text-white bg-card-fields rounded-lg p-1">
            {card.commentsAtCardDefinitiveSolution || Strings.NA}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProvisionalSolutionCard;
