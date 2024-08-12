import { List } from "antd";
import { RESPONSIVE_LIST } from "../utils/Extensions";
import Constants from "../utils/Constants";

interface ListProps {
  [key: string]: any;
}

const PaginatedList = ({ ...rest }: ListProps) => {
  const list = (
    <List
      grid={RESPONSIVE_LIST}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: Constants.PAGE_SIZE,
        pageSizeOptions: Constants.PAGE_SIZE_OPTIONS,
      }}
      {...rest}
    />
  );

  return list;
};

export default PaginatedList;
