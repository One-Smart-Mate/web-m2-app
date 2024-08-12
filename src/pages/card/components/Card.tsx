import { Card } from "antd";
import {
  formatDate,
  getCardStatusAndText,
  hasAudios,
  hasImages,
  hasVideos,
} from "../../../utils/Extensions";
import { CardInterface, Evidences } from "../../../data/card/card";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { IoHeadsetOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";

interface CardProps {
  data: CardInterface;
  cardDetailsRoute: string;
}

const InformationPanel = ({ data, cardDetailsRoute }: CardProps) => {
  const { status, text } = getCardStatusAndText(data.status);
  const navigate = useNavigate();

  const evidenceIndicator = (evidences: Evidences[]) => {
    const elements = useMemo(() => {
      const elems: JSX.Element[] = [];
      if (hasImages(evidences)) {
        elems.push(<AiOutlinePicture key="images" />);
      }
      if (hasVideos(evidences)) {
        elems.push(<GoDeviceCameraVideo key="videos" />);
      }
      if (hasAudios(evidences)) {
        elems.push(<IoHeadsetOutline key="audios" />);
      }
      return elems;
    }, [evidences]);

    return <div className="flex gap-1 text-black flex-row">{elements}</div>;
  };

  return (
    <Card
      title={
        <div className="mt-2 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-black">
            {data.cardTypeMethodologyName} {data.siteCardId}
          </h2>
          {evidenceIndicator(data.evidences)}
        </div>
      }
      className="max-w-sm h-96 mx-auto bg-gray-100 rounded-xl shadow-md"
      onClick={() => {
        navigate(cardDetailsRoute, {
          state: {
            cardId: data.id,
            cardName: `${data.cardTypeMethodologyName} ${data.siteCardId}`,
          },
        });
      }}
      hoverable
    >
      <div className="grid gap-x-2 md:gap-x-1 gap-y-1 grid-cols-3 text-black font-medium">
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

        <span>{Strings.problemType}</span>
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
