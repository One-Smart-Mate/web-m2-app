import { Form, FormInstance, Select } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { useAppSelector } from "../../../core/store";
import { useEffect, useState } from "react";
import { selectSiteId } from "../../../core/genericReducer";
import { useGetSiteResponsiblesMutation } from "../../../services/userService";
import { Responsible } from "../../../data/user/user";

interface FormProps {
  form: FormInstance;
}

const UpdateResponsibleForm = ({ form }: FormProps) => {
  const [getResponsibles] = useGetSiteResponsiblesMutation();
  const siteId = useAppSelector(selectSiteId);
  const [data, setData] = useState<Responsible[]>([]);

  const handleGetResponsibles = async () => {
    const responsibles = await getResponsibles(siteId).unwrap();
    setData(responsibles);
  };
  useEffect(() => {
    handleGetResponsibles();
  }, []);

  const selectOptions = () => {
    return data.map((responsible) => (
      <Select.Option key={responsible.id} value={responsible.id}>
        {responsible.name}
      </Select.Option>
    ));
  };
  return (
    <Form form={form}>
      <div className="flex flex-row">
        <Form.Item
          name="responsibleId"
          validateFirst
          rules={[{ required: true, message: Strings.requiredResponsableId }]}
          className="flex-1"
        >
          <Select size="large" placeholder={Strings.responsible}>
            {selectOptions()}
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateResponsibleForm;
