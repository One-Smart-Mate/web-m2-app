import { Card, Carousel, Empty } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { Evidences } from "../../../data/card/card";
import sectionsTitlesCardDetails from "../../../components/SectionsTitlesCardDetails";
import CustomImage from "../../../components/CustomImage";
import { isImageURL, isVideoURL } from "../../../utils/Extensions";
import { useEffect, useRef } from "react";

interface CardProps {
  data: Evidences[] | null;
}

const EvidenceCard = ({ data }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="min-h-96 min-w-96 bg-gray-100 rounded-xl shadow-md"
        loading={true}
      />
    );
  }
  const images = data.filter((evidence) => isImageURL(evidence.evidenceName));
  const videos = data.filter((evidence) => isVideoURL(evidence.evidenceName));

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleBeforeChange = (from: number) => {
    if (videoRefs.current[from]) {
      videoRefs.current[from]?.pause();
    }
  };

  useEffect(() => {
    return () => {
      videoRefs.current = [];
    };
  }, []);

  const renderCustomEmpty = () => (
    <div className="flex h-full justify-center">
      <Empty className="mt-16" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );

  return (
    <Card className="  bg-gray-100 rounded-xl shadow-md">
      <div className="flex text-black   font-medium flex-row justify-center flex-wrap gap-1">
        <div className="md:w-72 w-60 rounded-lg p-1 bg-card-fields">
          {sectionsTitlesCardDetails(Strings.images)}
          {images.length > 0 ? (
            <Carousel arrows infinite={false}>
              {images.map((image) => (
                <div key={image.id}>
                  <CustomImage
                    src={image.evidenceName}
                    alt={`Image of evidence with ID ${image.id}`}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            renderCustomEmpty()
          )}
        </div>
        <div className="md:w-72 w-60 rounded-lg p-1 bg-card-fields">
          {sectionsTitlesCardDetails(Strings.videos)}
          {videos.length > 0 ? (
            <Carousel arrows infinite={false} beforeChange={handleBeforeChange}>
              {videos.map((video, index) => (
                <div key={video.id}>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="size-96"
                    src={video.evidenceName}
                    controls
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            renderCustomEmpty()
          )}
        </div>
      </div>
    </Card>
  );
};

export default EvidenceCard;
