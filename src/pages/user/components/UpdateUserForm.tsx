import { Form, GetRef, Input, InputNumber, Select } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import Strings from "../../../utils/localizations/Strings";
import { validateEmail } from "../../../utils/Extensions";
import { useEffect, useMemo, useState } from "react";
import { Role, UserTable, UserUpdateForm } from "../../../data/user/user";
import { useGetRolesMutation } from "../../../services/roleService";
import { Site } from "../../../data/site/site";
import { useGetSitesMutation } from "../../../services/siteService";
import { useGetUsersMutation } from "../../../services/userService";
import { useAppSelector } from "../../../core/store";
import { selectCurrentRowData } from "../../../core/genericReducer";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const UpdateUserForm = ({ form }: FormProps) => {
  const [getRoles] = useGetRolesMutation();
  const [getSites] = useGetSitesMutation();
  const [getUsers] = useGetUsersMutation();
  const [roles, setRoles] = useState<Role[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [users, setUsers] = useState<UserTable[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const rowData = useAppSelector(
    selectCurrentRowData
  ) as unknown as UserUpdateForm;

  const handleGetData = async () => {
    const [rolesResponse, sitesResponse, usersResponse] = await Promise.all([
      getRoles().unwrap(),
      getSites().unwrap(),
      getUsers().unwrap(),
    ]);
    setRoles(rolesResponse);
    setSites(sitesResponse);
    setUsers(usersResponse);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (sites.length > 0 && users.length > 0 && roles.length > 0) {
      form.setFieldsValue({ ...rowData });
    }
  }, [sites, roles]);

  const siteOptions = useMemo(() => {
    return sites.map((site) => {
      let filteredUsers = users.filter((user) => user.site.id === site.id);
      let userCount = filteredUsers.length;
      let userCountDisplay = userCount < 10 ? `0${userCount}` : userCount;
      let userQuantityDisplay =
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
  }, [sites, users]);

  const filteredOptions = roles.filter((o) => !selectedRoles.includes(o));

  return (
    <Form form={form} layout="vertical">
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item className="hidden" name="id">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredUserName },
              { max: 50 },
              { pattern: /^[A-Za-z\s]+$/, message: Strings.onlyLetters },
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
            rules={[{ min: 8, message: Strings.passwordLenght }]}
            className="flex-1 mr-1"
          >
            <Input.Password
              size="large"
              minLength={8}
              addonBefore={<LockOutlined />}
              type="password"
              placeholder={Strings.updatePassword}
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && getFieldValue("password")) {
                    return Promise.reject(new Error(Strings.requiredPassword));
                  }
                  if (value && getFieldValue("password") !== value) {
                    return Promise.reject(
                      new Error(Strings.passwordsDoNotMatch)
                    );
                  }
                  return Promise.resolve();
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
            options={siteOptions}
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
        <Form.Item className="hidden" name="status">
          <Input />
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateUserForm;
