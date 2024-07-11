import { Form, GetRef, Input, InputNumber, Select } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import Strings from "../../../utils/localizations/Strings";
import { validateEmail } from "../../../utils/Extensions";
import { useEffect, useState } from "react";
import { Role, UserTable } from "../../../data/user/user";
import { useGetRolesMutation } from "../../../services/roleService";
import { Site } from "../../../data/site/site";
import { useGetSitesMutation } from "../../../services/siteService";
import { useGetUsersMutation } from "../../../services/userService";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const RegisterUserForm = ({ form }: FormProps) => {
  const [getRoles] = useGetRolesMutation();
  const [getSites] = useGetSitesMutation();
  const [getUsers] = useGetUsersMutation();
  const [roles, setRoles] = useState<Role[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [users, setUsers] = useState<UserTable[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleGetData = async () => {
    const rolesResponse = await getRoles().unwrap();
    const sitesResponse = await getSites().unwrap();
    const usersResponse = await getUsers().unwrap();
    setRoles(rolesResponse);
    setSites(sitesResponse);
    setUsers(usersResponse);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const siteOptions = () => {
    return sites.map((site) => {
      const filteredUsers = users.filter((user) => user.site.id === site.id);
      const userCount = filteredUsers.length;
      const userCountDisplay = userCount < 10 ? `0${userCount}` : userCount;
      const userQuantityDisplay =
        Number(site.userQuantity) < 10
          ? `0${site.userQuantity}`
          : site.userQuantity;
      return {
        value: site.id,
        labelText: site.rfc,
        label: (
          <p className="flex justify-between items-center">
            {site.name} ({site.rfc})
            <span className="mr-7">
              {site.userLicense} -{" "}
              <span
                className={`${
                  site.userLicense !== Strings.concurrente && "mr-8"
                } rounded-xl w-4 text-sm p-0.5 text-white bg-gray-600`}
              >
                {userCountDisplay}
              </span>{" "}
              {site.userLicense === Strings.concurrente && (
                <span>
                  /{" "}
                  <span className="rounded-xl w-10 p-0.5 text-white text-sm bg-gray-800">
                    {userQuantityDisplay}
                  </span>
                </span>
              )}
            </span>
          </p>
        ),
      };
    });
  };

  const filteredOptions = roles.filter((o) => !selectedRoles.includes(o));

  return (
    <Form form={form} layout="vertical">
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
              { min: 8, message: Strings.passwordLenght },
              { required: true, message: Strings.requiredPassword },
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
              addonBefore={<LockOutlined />}
              placeholder={Strings.confirmPassword}
            />
          </Form.Item>
        </div>
        <Form.Item
          label={
            <p>
              {Strings.site} ({Strings.rfc}) - {Strings.userLicense} -{" "}
              <span className="rounded-xl p-0.5 text-white bg-gray-600">
                Current users
              </span>{" "}
              /{" "}
              <span className="rounded-xl p-0.5 text-white bg-gray-800">
                User quantity
              </span>
            </p>
          }
          name="siteId"
          validateFirst
          rules={[{ required: true, message: Strings.requiredSite }]}
          className="mr-1"
        >
          <Select
            size="large"
            placeholder={Strings.site}
            value={selectedSite}
            onChange={setSelectedSite}
            options={siteOptions()}
            showSearch
            filterOption={(input, option) => {
              if (!option) {
                return false;
              }
              return option.labelText
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          />
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
            id="co"
            mode="multiple"
            size="large"
            placeholder={Strings.roles}
            value={selectedRoles}
            onChange={setSelectedRoles}
            options={filteredOptions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default RegisterUserForm;
