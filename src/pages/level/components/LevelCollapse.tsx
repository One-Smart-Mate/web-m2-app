import { Badge, Collapse, Empty, Space, Spin } from "antd";
import { Level } from "../../../data/level/level";
import RegisterNodeButton from "./RegisterNodeButton";
import UpdateLevelButton from "./UpdateLevelButton";
import { getStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";

interface Props {
  data: Level[];
  isLoading: boolean;
}

const validateStatusBeforeCreateNodes = (
  status: string,
  id: string,
  updatedNodesName: string[]
) => {
  if (status === Strings.activeStatus) {
    return <RegisterNodeButton superiorId={id} nodesName={updatedNodesName} />;
  }
};

const generateItems = (
  parentId: number,
  data: Level[],
  nodesName: string[]
): any => {
  return data
    .filter((item) => Number(item.superiorId) === parentId)
    .map((item) => {
      const updatedNodesName = [...nodesName, item.name];
      const { status, text } = getStatusAndText(item.status);
      const childrenItems = generateItems(
        Number(item.id),
        data,
        updatedNodesName
      );
      return {
        key: item.id.toString(),
        label: (
          <div className="flex flex-col gap-1">
            <h1 className="flex-1 text-base md:text-lg">{item.name}</h1>
            <Badge status={status} text={text} />
          </div>
        ),
        extra: (
          <Space>
            {validateStatusBeforeCreateNodes(
              item.status,
              item.id,
              updatedNodesName
            )}
            <UpdateLevelButton levelId={item.id} />
          </Space>
        ),
        children: (
          <>
            <h2 className="mb-2 font-light text-base md:text-lg">
              {item.description}
            </h2>
            {childrenItems.length > 0 && <Collapse items={childrenItems} />}
          </>
        ),
      };
    });
};
const LevelCollapse = ({ data, isLoading }: Props) => {
  const items = generateItems(0, data, []);
  return (
    <>
      {data.length > 0 ? (
        <Collapse items={items} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};

export default LevelCollapse;
