import { useMemo, useRef } from "react";
import { useTableHeight } from "../../../utils/tableHeight";
import { ColumnsType } from "antd/es/table";
import Strings from "../../../utils/localizations/Strings";
import { Badge, Space, Table} from "antd";
import { getStatusAndText } from "../../../utils/Extensions";
import Constants from "../../../utils/Constants";
import CustomButton from "../../../components/CustomButtons";
import { Site } from "../../../data/site/site";
import ViewPrioritiesButton from "./ViewPrioritiesButton";
import ViewCardTypesButton from "./ViewCardTypesButton";

interface TableProps {
    data: Site[];
    isLoading: boolean;
  }

const SiteTable = ({data, isLoading}: TableProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);
  //const dispatch = useAppDispatch();

  /* const handleUpdateClick = (row: Company) => {
    dispatch(resetRowData());
    dispatch(setRowData(row));
    dispatch(resetChangeIndicator());
  }; */

  const uniqueExtensions = [...new Set(data.map((item) => item.extension))];

  const extensionFilters = uniqueExtensions.map((extension) => ({
    text: extension === null ? Strings.noExtension : extension,
    value: extension,
  }));

  const columns: ColumnsType<Site> = useMemo(
    () => [
      {
        title: Strings.logo,
        dataIndex: "logo",
        key: "logo",
        render: (text) => (
          <img
            className="size-20 lg:size-16 md:size-12"
            src={text}
            alt="logo"
          />
        ),
      },
      {
        title: Strings.companyName,
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: Strings.rfc,
        dataIndex: "rfc",
        key: "rfc",
        sorter: (a, b) => a.rfc.localeCompare(b.rfc),
      },
      {
        title: Strings.companyAddress,
        dataIndex: "address",
        key: "address",
        sorter: (a, b) => a.address.localeCompare(b.address),
      },
      {
        title: Strings.contact,
        dataIndex: "contact",
        key: "contact",
        sorter: (a, b) => a.contact.localeCompare(b.contact),
      },
      {
        title: Strings.position,
        dataIndex: "position",
        key: "position",
        sorter: (a, b) => a.position.localeCompare(b.position),
      },
      {
        title: Strings.phone,
        dataIndex: "phone",
        key: "phone",
        sorter: (a, b) => a.phone.localeCompare(b.phone),
      },
      {
        title: Strings.extension,
        dataIndex: "extension",
        key: "extension",
        filters: extensionFilters,
        onFilter: (value, record) => record.extension === value,
        ellipsis: true,
      },
      {
        title: Strings.email,
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: Strings.cellular,
        dataIndex: "cellular",
        key: "cellular",
        sorter: (a, b) => a.cellular.localeCompare(b.cellular),
      },
      {
        title: Strings.status,
        key: "status",
        render: (record) => {
          const { status, text } = getStatusAndText(record.status);
          return <Badge status={status} text={text} />;
        },
        filters: [
          { text: "Active", value: "A" },
          { text: "Inactive", value: "I" },
        ],
        onFilter: (value, record) => record.status === value,
        filterMultiple: false,
        ellipsis: true,
      },
    ],
    [Strings, extensionFilters, getStatusAndText]
  );

  const actionsRow = {
    defaultExpandAllRows: true,
    showExpandColumn: false,
    expandedRowRender: (data: Site) => (
      <Space className="flex justify-end">
        <ViewPrioritiesButton siteId={data.id} siteName={data.name}/>
        <CustomButton type="action">{Strings.viewLevels}</CustomButton>
        <ViewCardTypesButton siteId={data.id} siteName={data.name}/>
        <CustomButton type="action">{Strings.viewCards}</CustomButton>
        <CustomButton type="edit">{Strings.edit}</CustomButton>
        <CustomButton type="action">{Strings.importExcel}</CustomButton>
      </Space>
    ),
  };

  return (
    <div className="h-full" ref={contentRef}>
      <Table
        loading={isLoading}
        size="middle"
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: Constants.PAGE_SIZE,
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9"],
        }}
        key={data.length}
        scroll={{ y: tableHeight }}
        expandable={actionsRow}
      />
    </div>
  );
}

export default SiteTable