import { Collapse } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { hasAudios, hasImages, hasVideos } from "../../../utils/Extensions";
import { Evidences } from "../../../data/card/card";
import AudiosList from "./AudiosList";
import ImagesCarousel from "./ImagesCarousel";
import VideosCarousel from "./VideosCarousel";
import EvidenceIndicator from "../../../components/EvidenceIndicator";

interface CardProps {
  data: Evidences[];
}

const EvidenceCollapse = ({ data }: CardProps) => {
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
              {EvidenceIndicator(data)}
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
