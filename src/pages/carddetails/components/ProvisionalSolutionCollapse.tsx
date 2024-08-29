import { Collapse } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";
import { formatDate, getDaysBetween } from "../../../utils/Extensions";

interface CardProps {
  data: CardDetailsInterface;
}

const ProvisionalSolutionCollapse = ({ data }: CardProps) => {
  const { card } = data;

  return (
    <Collapse
      collapsible={
        card.cardProvisionalSolutionDate === null ? "disabled" : undefined
      }
      defaultActiveKey={
        card.cardProvisionalSolutionDate !== null ? ["1"] : undefined
      }
      className="bg-gray-100 rounded-xl shadow-md"
    >
      <Collapse.Panel
        header={
          <>
            <div className="flex gap-3">
              <h2 className="text-base font-semibold text-black">
                {Strings.provisionalSolution}
              </h2>
              <p className="text-base text-gray-700">
                {formatDate(card.cardProvisionalSolutionDate) || Strings.NA}
              </p>
            </div>
          </>
        }
        key="1"
      >
        <div className="flex flex-wrap text-sm gap-2">
          <div className="flex gap-1">
            <span className="font-semibold">{Strings.days}: </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {getDaysBetween(
                card.cardProvisionalSolutionDate,
                card.createdAt
              ) || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">
              {" "}
              {Strings.appProvisionalUser}:{" "}
            </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.userAppProvisionalSolutionName || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold"> {Strings.provisionalUser}: </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.userProvisionalSolutionName || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">
              {" "}
              {Strings.provisionalSoluitonApplied}:{" "}
            </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.commentsAtCardProvisionalSolution || Strings.NA}
            </span>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default ProvisionalSolutionCollapse;
