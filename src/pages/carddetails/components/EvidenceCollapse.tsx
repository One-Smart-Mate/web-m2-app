import { Collapse } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { hasAudios, hasImages, hasVideos } from "../../../utils/Extensions";
import { useMemo } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoHeadsetOutline } from "react-icons/io5";
import { Evidences } from "../../../data/card/card";
import AudiosList from "./AudiosList";
import ImagesCarousel from "./ImagesCarousel";
import VideosCarousel from "./VideosCarousel";

interface CardProps {
  data: Evidences[];
}

const EvidenceCollapse = ({ data }: CardProps) => {
  const evidenceIndicator = (evidences: Evidences[]) => {
    const elements = useMemo(() => {
      const elems: JSX.Element[] = [];
      if (hasImages(evidences)) {
        elems.push(<AiOutlinePicture className="h-full size-5" key="images" />);
      }
      if (hasVideos(evidences)) {
        elems.push(
          <GoDeviceCameraVideo className="h-full size-5" key="videos" />
        );
      }
      if (hasAudios(evidences)) {
        elems.push(<IoHeadsetOutline className="h-full size-5" key="audios" />);
      }
      return elems;
    }, [evidences]);

    return <div className="flex gap-1 text-black flex-row">{elements}</div>;
  };

  return (
    <Collapse
      collapsible={data.length === 0 ? "disabled" : undefined}
      defaultActiveKey={data.length !== 0 ? ["1"] : undefined}
      className="bg-gray-100 rounded-xl shadow-md"
    >
      <Collapse.Panel
        header={
          <>
            <div className="flex gap-3">
              <h2 className="text-base font-semibold text-black">
                {Strings.evidences}
              </h2>
              {data.length === 0 && (
                <p className="text-base text-gray-700">{Strings.NA}</p>
              )}
              {evidenceIndicator(data)}
            </div>
          </>
        }
        key={"1"}
      >
        <div className="flex justify-center gap-2 flex-wrap">
          {hasImages(data) && <ImagesCarousel data={data} />}
          {hasVideos(data) && <VideosCarousel data={data} />}
          {hasAudios(data) && <AudiosList data={data} />}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default EvidenceCollapse;
