import { Form, FormInstance, Input, InputNumber } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { BsCardText } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useAppSelector } from "../../../core/store";
import { Site } from "../../../data/site/site";
import { selectCurrentRowData } from "../../../core/genericReducer";
import { useEffect } from "react";

interface FormProps {
  form: FormInstance;
}

const UpdatePriorityForm = ({ form }: FormProps) => {
  const rowData = useAppSelector(selectCurrentRowData) as unknown as Site;
  useEffect(() => {
    form.setFieldsValue({ ...rowData });
  }, []);
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item name="id" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item
            name="priorityCode"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredCode },
              { max: 4 },
            ]}
            className="mr-1"
          >
            <Input
              size="large"
              maxLength={4}
              addonBefore={<CiBarcode />}
              placeholder={Strings.code}
            />
          </Form.Item>
          <Form.Item
            name="priorityDescription"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredDescription },
              { max: 50 },
            ]}
            className="flex-1"
          >
            <Input
              size="large"
              maxLength={50}
              addonBefore={<BsCardText />}
              placeholder={Strings.description}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="priorityDays"
          validateFirst
          rules={[{ required: true, message: Strings.requiredDaysNumber }]}
          className="flex-1"
        >
          <InputNumber
            size="large"
            maxLength={3}
            addonBefore={<AiOutlineFieldNumber />}
            placeholder={Strings.daysNumber}
          />
        </Form.Item>
        <Form.Item name="status" className="hidden">
          <Input />
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdatePriorityForm;
