import { useEffect, useState } from "react";
import { Form, Input, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import CustomButton from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import { useCreatePreclassifierMutation, useGetPreclassifiersMutation } from "../../services/preclassifierService";
import PreclassifierTable from "./components/PreclassifierTable";
import PaginatedList from "../../components/PaginatedList";
import PreclassifierCard from "./components/PreclassifierCard";
import ModalForm from "../../components/ModalForm";
import { NotificationSuccess, handleErrorNotification, handleSucccessNotification } from "../../utils/Notifications";
import { CreatePreclassifier } from "../../data/preclassifier/preclassifier.request";
import RegisterPreclassifierForm from "./components/RegisterPreclassifierForm";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../core/store";
import { resetPreclassifierUpdatedIndicator, selectPreclassifierUpdatedIndicator } from "../../core/genericReducer";

interface stateType {
  cardTypeId: string;
  cardTypeName: string
}

const Preclassifiers = () => {
  const [getPreclassifiers] = useGetPreclassifiersMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { cardTypeId, cardTypeName } = state as stateType;
  const [data, setData] = useState<Preclassifier[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Preclassifier[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [registerPreclassifier] = useCreatePreclassifierMutation();
  const [modalIsLoading, setModalLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isPreclassifierUpdated = useAppSelector(selectPreclassifierUpdatedIndicator);

  useEffect(() => {
    if (isPreclassifierUpdated) {
      handleGetPriorities();
      dispatch(resetPreclassifierUpdatedIndicator());
    }
  }, [isPreclassifierUpdated, dispatch]);

  const handleOnClickCreateButton = () => {
    setModalOpen(true);
  };
  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      setModalOpen(false);
    }
  };

  const handleOnSearch = (event: any) => {
    const getSearch = event.target.value;

    if (getSearch.length > 0) {
      const filterData = dataBackup.filter((item) => search(item, getSearch));

      setData(filterData);
    } else {
      setData(dataBackup);
    }
    setQuerySearch(getSearch);
  };

  const search = (item: Preclassifier, search: string) => {
    const { preclassifierCode, preclassifierDescription } = item;

    return (
      preclassifierCode.toLowerCase().includes(search.toLowerCase()) ||
      preclassifierDescription.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGetPriorities = async () => {
    setLoading(true);
    if (cardTypeId) {
      try {
        const response = await getPreclassifiers(cardTypeId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetPriorities();
  }, [state, getPreclassifiers]);

  const handleOnFormCreateFinish = async (values: any) => {
    try {
      setModalLoading(true);
      await registerPreclassifier(
        new CreatePreclassifier(
          values.code.trim(),
          values.description.trim(),
          Number(cardTypeId)
        )
      ).unwrap();
      setModalOpen(false);
      handleGetPriorities();
      handleSucccessNotification(NotificationSuccess.REGISTER);
    } catch (error) {
      handleErrorNotification(error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
      <div className="flex flex-col gap-2 items-center m-3">
          <PageTitle mainText={Strings.preclassifiersof} subText={cardTypeName} />
          <div className="flex flex-col md:flex-row flex-wrap items-center md:justify-between w-full">
            <div className="flex flex-col md:flex-row items-center flex-1 mb-1 md:mb-0">
              <Space className="w-full md:w-auto mb-1 md:mb-0">
                <Input
                  className="w-full"
                  onChange={handleOnSearch}
                  value={querySearch}
                  addonAfter={<IoIosSearch />}
                />
              </Space>
            </div>
            <div className="flex mb-1 md:mb-0 md:justify-end w-full md:w-auto">
              <CustomButton
                type="success"
                onClick={handleOnClickCreateButton}
                className="w-full md:w-auto"
              >
                {Strings.create}
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto hidden lg:block">
          <PreclassifierTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={PreclassifierCard}
            isLoading={isLoading}
          />
        </div>
        <Form.Provider onFormFinish={async (_, { values }) => {await handleOnFormCreateFinish(values)}}>
        <ModalForm
          open={modalIsOpen}
          onCancel={handleOnCancelButton}
          FormComponent={RegisterPreclassifierForm}
          title={Strings.createPreclassifier}
          isLoading={modalIsLoading}
        />
      </Form.Provider>
      </div>
    </>
  );
};

export default Preclassifiers;
