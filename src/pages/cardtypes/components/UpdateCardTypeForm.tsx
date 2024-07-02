import {
  Button,
  ColorPicker,
  ColorPickerProps,
  Form,
  GetProp,
  GetRef,
  Input,
  InputNumber,
  Select,
} from "antd";
import Strings from "../../../utils/localizations/Strings";
import { BsCardText } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { LuTextCursor } from "react-icons/lu";
import { CardTypeUpdateForm } from "../../../data/cardtypes/cardTypes";
import { useAppSelector } from "../../../core/store";
import {
  selectCurrentRowData,
  selectSiteId,
} from "../../../core/genericReducer";
import { useEffect, useMemo, useState } from "react";
import { useGetSiteResponsiblesMutation } from "../../../services/userService";
import { Responsible } from "../../../data/user/user";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoHeadsetOutline } from "react-icons/io5";
type Color = GetProp<ColorPickerProps, "value">;

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const UpdateCardTypeForm = ({ form }: FormProps) => {
  const rowData = useAppSelector(
    selectCurrentRowData
  ) as unknown as CardTypeUpdateForm;
  const [getResponsibles] = useGetSiteResponsiblesMutation();
  const siteId = useAppSelector(selectSiteId);
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [color, setColor] = useState<Color>(Strings.empty);

  const bgColor = useMemo<string>(
    () => (typeof color === "string" ? color : color!.toHexString()),
    [color]
  );

  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
  };

  const handleGetData = async () => {
    const response = await getResponsibles(siteId).unwrap();
    setResponsibles(response);
  };

  const responsibleOptions = () => {
    return responsibles.map((responsible) => ({
      value: responsible.id,
      label: responsible.name,
    }));
  };
  useEffect(() => {
    form.setFieldsValue({ ...rowData });
    setColor(`#${rowData.color}`);
    handleGetData();
  }, []);
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item className="hidden" name="id">
            <Input />
          </Form.Item>
          <Form.Item className="hidden" name="methodology">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredCardTypeName },
              { max: 45 },
            ]}
            className="flex-1"
          >
            <Input
              addonBefore={<LuTextCursor />}
              size="large"
              maxLength={45}
              placeholder={Strings.name}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          validateFirst
          rules={[
            { required: true, message: Strings.requiredDescription },
            { max: 100 },
          ]}
        >
          <Input
            size="large"
            maxLength={100}
            addonBefore={<BsCardText />}
            placeholder={Strings.description}
          />
        </Form.Item>
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="color"
            validateFirst
            rules={[{ required: true, message: Strings.requiredColor }]}
            className="mr-3"
          >
            <ColorPicker value={color} onChange={setColor}>
              <Button
                size="large"
                className="w-32"
                type="primary"
                style={btnStyle}
              >
                Color
              </Button>
            </ColorPicker>
          </Form.Item>
          <Form.Item
            name="responsableId"
            validateFirst
            rules={[{ required: true, message: Strings.requiredResponsableId }]}
            className="w-60"
          >
            <Select
              size="large"
              placeholder={Strings.responsible}
              options={responsibleOptions()}
              className=""
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.quantityCreate}</h1>
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="quantityPicturesCreate" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<AiOutlinePicture />}
              placeholder={Strings.picturesCreate}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosCreate" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.audiosCreate}
            />
          </Form.Item>
          <Form.Item name="quantityVideosCreate" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.videosCreate}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">
          {Strings.quantityCreateForProvisionalSolution}
        </h1>
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="quantityPicturesPs" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<AiOutlinePicture />}
              placeholder={Strings.picturesCreatePs}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosPs" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.audiosCreatePs}
            />
          </Form.Item>
          <Form.Item name="quantityVideosPs" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.videosCreatePs}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.durationCreate}</h1>
        <div className="flex flex-row  flex-wrap">
          <Form.Item name="audiosDurationCreate" validateFirst className="mr-2">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.audiosDurationCreate}
            />
          </Form.Item>
          <Form.Item name="videosDurationCreate" validateFirst>
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.videosDurationCreate}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">
          {Strings.durationCreateForProvisionalSolution}
        </h1>
        <div className="flex flex-row flex-wrap">
          <Form.Item name="audiosDurationPs" validateFirst className="mr-2">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.audiosDurationPs}
            />
          </Form.Item>
          <Form.Item name="videosDurationPs" validateFirst>
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.videosDurationPs}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.quantityClose}</h1>
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="quantityPicturesClose" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<AiOutlinePicture />}
              placeholder={Strings.quantityPicturesClose}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosClose" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.quantityAudiosClose}
            />
          </Form.Item>
          <Form.Item name="quantityVideosClose" validateFirst>
            <InputNumber
              size="large"
              max={255}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.quantityVideosClose}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.durationClose}</h1>
        <div className="flex flex-row flex-wrap">
          <Form.Item name="audiosDurationClose" validateFirst className="mr-2">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<IoHeadsetOutline />}
              placeholder={Strings.audiosDurationClose}
            />
          </Form.Item>
          <Form.Item name="videosDurationClose" validateFirst>
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<GoDeviceCameraVideo />}
              placeholder={Strings.videosDurationClose}
            />
          </Form.Item>
          <Form.Item className="hidden" name="status">
            <Input />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default UpdateCardTypeForm;
