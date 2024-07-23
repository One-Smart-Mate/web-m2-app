import { Card, Carousel, Image, List } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { CardDetailsInterface } from "../../../data/card/card";

interface CardProps {
  data: CardDetailsInterface | null;
  isLoading: boolean;
}

const EvidenceCard = ({ data, isLoading }: CardProps) => {
  if (!data) {
    return (
      <Card
        className="max-w-xs mx-auto bg-gray-100 rounded-xl shadow-md"
        loading={isLoading}
      />
    );
  }

  const sectionsTitle = (title: string) => {
    return (
      <div className="rounded-md p-1 mb-1 bg-white">
        <h1>{title}</h1>
      </div>
    );
  };

  const { evidences } = data;

  const audios = [
    {
      name: '"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"',
    },
    {
      name: '"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"',
    },
    {
      name: '"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"',
    },
    {
      name: '"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"',
    },
    {
      name: '"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"',
    },
  ];

  return (
    <Card
      title={
        <h2 className="mt-2 text-xl font-semibold mb-4 text-black text-center">
          {Strings.evidences}
        </h2>
      }
      className="  bg-gray-100 rounded-xl shadow-md"
      loading={isLoading}
    >
      <div className="flex text-black font-medium flex-row flex-wrap gap-2">
        <div className="w-72 rounded-lg p-1 bg-card-fields">
          {sectionsTitle(Strings.images)}
          <Carousel draggable infinite={false}>
            <div>
              <Image width={280} src={evidences[0].evidenceName} />
            </div>
            <div>
              <Image
              width={290}
              className="my-20"
                src={
                  "https://th.bing.com/th/id/R.18f14463a91f8316ec8daea09ab5baaf?rik=1ONxPv6onaga7A&pid=ImgRaw&r=0"
                }
              />
            </div>
          </Carousel>
        </div>
        <div className="w-72 rounded-lg p-1 bg-card-fields">
          {sectionsTitle(Strings.videos)}
          <Carousel arrows draggable infinite={false}>
            <div>
              <video className="size-96" controls>
                <source src={evidences[1].evidenceName} />
              </video>
            </div>
            <div>
              <video className="size-96" controls>
                <source
                  src={
                    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  }
                />
              </video>
            </div>
          </Carousel>
        </div>
        <div className="w-72 rounded-lg p-1 bg-card-fields">
          {sectionsTitle(Strings.audios)}
          <List
            className="h-96 px-2 overflow-auto"
            dataSource={audios}
            renderItem={(item) => (
              <List.Item>
                <audio controls>
                  <source
                    src={
                      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"
                    }
                  />
                </audio>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export default EvidenceCard;
