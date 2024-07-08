import { useMemo, useRef } from "react";
import { useTableHeight } from "../../../utils/tableHeight";
import { ColumnsType } from "antd/es/table";
import Strings from "../../../utils/localizations/Strings";
import {
  getCardStatusAndText,
  getStatusAndText,
} from "../../../utils/Extensions";
import { Badge, Table } from "antd";
import CustomButton from "../../../components/CustomButtons";
import Constants from "../../../utils/Constants";
import { Card } from "../../../data/card/card";

interface PrioritiesTableProps {
  data: Card[];
  isLoading: boolean;
}

const CardTable = ({ data, isLoading }: PrioritiesTableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);

  const columns: ColumnsType<Card> = useMemo(
    () => [
      {
        title: Strings.cardType,
        dataIndex: "cardTypeMethodologyName",
        key: "cardTypeMethodologyName",
        sorter: (a, b) =>
          a.cardTypeMethodologyName.localeCompare(b.cardTypeMethodologyName),
        sortDirections: ["ascend", "descend"],
        width: 180,
      },
      {
        title: Strings.preclassifier,
        render: (data) => (
          <p>
            {data.preclassifierCode} {data.preclassifierDescription}
          </p>
        ),
        sorter: (a, b) => {
          const aConcat = `${a.preclassifierCode} ${a.preclassifierDescription}`;
          const bConcat = `${b.preclassifierCode} ${b.preclassifierDescription}`;
          return aConcat.localeCompare(bConcat);
        },
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        width: 300,
      },
      {
        title: Strings.area,
        dataIndex: "areaName",
        key: "areaName",
        sorter: (a, b) => a.areaName.localeCompare(b.areaName),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        width: 150,
      },
      {
        title: Strings.createdBy,
        dataIndex: "creatorName",
        key: "creatorName",
        sorter: (a, b) => a.creatorName.localeCompare(b.creatorName),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        width: 220,
      },
      {
        title: Strings.date,
        key: "cardCreationDate",
        render: (record) => {
          const date: Date = new Date(record.cardCreationDate);
          const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "America/Chicago",
            timeZoneName: "short",
          };
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
          return <p>{formattedDate}</p>;
        },
        sorter: (a, b) => a.cardCreationDate.localeCompare(b.cardCreationDate),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        width: 230,
      },
      {
        title: Strings.dueDate,
        dataIndex: "cardDueDate",
        key: "cardDueDate",
        sorter: (a, b) => a.cardDueDate.localeCompare(b.cardDueDate),
        sortDirections: ["ascend", "descend"],
        width: 100,
      },
      {
        title: Strings.status,
        key: "status",
        render: (record) => {
          const { status, text } = getCardStatusAndText(record.status);
          return <Badge status={status} text={text} />;
        },
        filters: [
          { text: Strings.open, value: "open" },
          { text: Strings.closed, value: "closed" },
        ],
        onFilter: (value, record) => {
          if (value === "open") {
            return ["A", "P", "V"].includes(record.status);
          } else return ["R", "C"].includes(record.status);
        },
        ellipsis: true,
        width: 100,
        filterMultiple: false,
      },
      {
        title: Strings.actions,
        render: (_) => {
          return <CustomButton type="action">Show more</CustomButton>;
        },
        width: 100,
      },
    ],
    [Strings, getStatusAndText]
  );

  return (
    <div className="h-full" ref={contentRef}>
      <Table
        loading={isLoading}
        size="middle"
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: Constants.PAGE_SIZE,
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9"],
        }}
        key={data.length}
        scroll={{ y: tableHeight }}
      />
    </div>
  );
};

export default CardTable;
