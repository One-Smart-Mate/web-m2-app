import { Form, GetRef, Input, InputNumber, Select } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import Strings from "../../../utils/localizations/Strings";
import { validateEmail } from "../../../utils/Extensions";
import { useEffect, useState } from "react";
import { Role } from "../../../data/user/user";
import { useGetRolesMutation } from "../../../services/roleService";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

//provisional code
const harcodedSiteOptiones = [{id: 1, name: 'Universal Cuernacava'}, {id: 1, name: 'Aqua-live'}]

const RegisterUserForm = ({ form }: FormProps) => {
  const [getRoles] = useGetRolesMutation();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleGetRoles = async () => {
    const response = await getRoles().unwrap();
    setRoles(response);
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  const filteredOptions = roles.filter((o) => !selectedItems.includes(o));
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="name"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredUserName },
              { max: 50 },
              { pattern: /^[A-Za-z]+$/, message: Strings.onlyLetters },
            ]}
            className="mr-1 flex-1"
          >
            <Input
              size="large"
              maxLength={50}
              addonBefore={<FaRegUser />}
              placeholder={Strings.name}
            />
          </Form.Item>
          <Form.Item
            name="email"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredEmail },
              { validator: validateEmail },
            ]}
            className="flex-1"
          >
            <Input
              size="large"
              maxLength={60}
              addonBefore={<MailOutlined />}
              placeholder={Strings.email}
            />
          </Form.Item>
        </div>
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="password"
            validateFirst
            rules={[
              { min: 8, message: Strings.passwordLenght}, {required: true, message: Strings.requiredPassword },
            ]}
            className="flex-1 mr-1"
          >
            <Input.Password
              size="large"
              minLength={8}
              addonBefore={<LockOutlined />}
              type="password"
              placeholder={Strings.password}
              visibilityToggle={{
                visible: isPasswordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            validateFirst
            dependencies={["password"]}
            className="flex-1"
            rules={[
              { required: true, message: Strings.requiredConfirmPassword },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(Strings.passwordsDoNotMatch));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              min={8}
              addonBefore={<LockOutlined />}
              placeholder={Strings.confirmPassword}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="siteId"
          validateFirst
          rules={[{ required: true, message: Strings.requiredSite }]}
          className="mr-1"
        >
          <Select size="large" placeholder={Strings.site} options={harcodedSiteOptiones.map((item) => ({
              value: item.id,
              label: item.name,
            }))}/>
        </Form.Item>
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="uploadCardDataWithDataNet"
            validateFirst
            rules={[
              {
                required: true,
                message: Strings.requiredInfo,
              },
            ]}
            className="mr-1"
          >
            <InputNumber
              size="large"
              min={0}
              max={127}
              addonBefore={<FiUpload />}
              placeholder={Strings.uploadCardDataWithDataNet}
            />
          </Form.Item>
          <Form.Item
            name="uploadCardEvidenceWithDataNet"
            validateFirst
            rules={[
              {
                required: true,
                message: Strings.requiredInfo,
              },
            ]}
            className="flex-1"
          >
            <InputNumber
              size="large"
              max={127}
              min={0}
              addonBefore={<FiUpload />}
              placeholder={Strings.uploadCardEvidenceWithDataNet}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="roles"
          validateFirst
          rules={[{ required: true, message: Strings.requiredRoles }]}
          className="flex-1"
        >
          <Select
            mode="multiple"
            size="large"
            placeholder={Strings.roles}
            value={selectedItems}
            onChange={setSelectedItems}
            options={filteredOptions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          ></Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default RegisterUserForm;