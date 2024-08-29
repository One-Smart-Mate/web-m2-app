import { Collapse } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";
import { formatDate, getDaysBetween } from "../../../utils/Extensions";

interface CardProps {
  data: CardDetailsInterface;
}

const DefinitiveSolutionCollapse = ({ data }: CardProps) => {
  const { card } = data;

  return (
    <Collapse
      collapsible={
        card.cardDefinitiveSolutionDate === null ? "disabled" : undefined
      }
      defaultActiveKey={
        card.cardDefinitiveSolutionDate !== null ? ["1"] : undefined
      }
      className="bg-gray-100 rounded-xl shadow-md"
    >
      <Collapse.Panel
        header={
          <>
            <div className="flex gap-3">
              <h2 className="text-base font-semibold text-black">
                {Strings.definitiveSolution}
              </h2>
              <p className="text-base text-gray-700">
                {formatDate(card.cardDefinitiveSolutionDate) || Strings.NA}
              </p>
            </div>
          </>
        }
        key="1"
      >
        <div className="flex flex-wrap text-sm gap-2">
          <div className="flex gap-1">
            <span className="font-semibold"> {Strings.days}: </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {getDaysBetween(
                card.cardDefinitiveSolutionDate,
                card.createdAt
              ) || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">
              {" "}
              {Strings.appDefinitiveUser}:{" "}
            </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.userAppDefinitiveSolutionName || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold"> {Strings.definitiveUser} : </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.userDefinitiveSolutionName || Strings.NA}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">
              {" "}
              {Strings.definitiveSolutionApplied} :{" "}
            </span>
            <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
              {card.commentsAtCardDefinitiveSolution || Strings.NA}
            </span>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default DefinitiveSolutionCollapse;
