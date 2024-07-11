import React from "react";
import { List } from "antd";
import { RESPONSIVE_LIST } from "../utils/Extensions";
import Constants from "../utils/Constants";

interface Props<T> {
  data: T[];
  ItemComponent: React.ComponentType<{ data: T }>;
  isLoading: boolean;
}

const PaginatedList = <T,>({ data, ItemComponent, isLoading }: Props<T>) => {
  return (
    <>
      <List
        loading={isLoading}
        grid={RESPONSIVE_LIST}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: Constants.PAGE_SIZE,
          total: data.length,
          pageSizeOptions: Constants.PAGE_SIZE_OPTIONS,
        }}
        renderItem={(item) => (
          <List.Item>
            <ItemComponent data={item} />
          </List.Item>
        )}
      />
    </>
  );
};

export default PaginatedList;
