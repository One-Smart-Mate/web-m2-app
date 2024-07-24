import { Form, FormInstance, Input } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { BsCardText } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { useEffect } from "react";
import { useAppSelector } from "../../../core/store";
import { selectCurrentRowData } from "../../../core/genericReducer";

interface FormProps {
  form: FormInstance;
}

const UpdatePreclassifierForm = ({ form }: FormProps) => {
  const rowData = useAppSelector(
    selectCurrentRowData
  ) as unknown as Preclassifier;
  useEffect(() => {
    form.setFieldsValue({
      ...rowData,
      code: rowData.preclassifierCode,
      description: rowData.preclassifierDescription,
    });
  }, []);
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item name="id" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            validateFirst
            rules={[{ required: true, message: Strings.requiredCode }]}
            className="mr-1"
          >
            <Input
              size="large"
              maxLength={3}
              addonBefore={<CiBarcode />}
              placeholder={Strings.code}
            />
          </Form.Item>
          <Form.Item
            name="description"
            validateFirst
            rules={[{ required: true, message: Strings.requiredDescription }]}
            className="flex-1"
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<BsCardText />}
              placeholder={Strings.description}
            />
          </Form.Item>
          <Form.Item name="status" className="hidden">
            <Input />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default UpdatePreclassifierForm;
