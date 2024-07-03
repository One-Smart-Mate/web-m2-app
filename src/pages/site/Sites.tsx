import { useEffect, useState } from "react";
import {
  useCreateSiteMutation,
  useGetSitesMutation,
} from "../../services/siteService";
import Strings from "../../utils/localizations/Strings";
import { useLocation } from "react-router-dom";
import { Form, Input, Space } from "antd";
import CustomButton from "../../components/CustomButtons";
import SiteTable from "./components/SiteTable";
import { IoIosSearch } from "react-icons/io";
import PaginatedList from "../../components/PaginatedList";
import SiteCard from "./components/SiteCard";
import { Site } from "../../data/site/site";
import { CreateSite } from "../../data/site/site.request";
import ModalForm from "../../components/ModalForm";
import RegisterSiteForm from "./components/RegisterSiteForm";
import {
  NotificationSuccess,
  handleErrorNotification,
  handleSucccessNotification,
} from "../../utils/Notifications";
import Constants from "../../utils/Constants";
import { uploadImageToFirebaseAndGetURL } from "../../config/firebaseUpload";
import { useAppDispatch, useAppSelector } from "../../core/store";
import {
  resetGeneratedSiteCode,
  resetSiteUpdatedIndicator,
  selectSiteUpdatedIndicator,
  setGeneratedSiteCode,
} from "../../core/genericReducer";
import PageTitle from "../../components/PageTitle";
import { generateShortUUID } from "../../utils/Extensions";

interface stateType {
  companyId: string;
  companyName: string;
}

const Sites = () => {
  const [getSites] = useGetSitesMutation();
  const { state } = useLocation();
  const { companyId, companyName } = state as stateType;
  const [data, setData] = useState<Site[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Site[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [registerSite] = useCreateSiteMutation();
  const [modalIsLoading, setModalLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isSiteUpdated = useAppSelector(selectSiteUpdatedIndicator);

  const handleGetSites = async () => {
    setLoading(true);
    if (companyId) {
      try {
        const response = await getSites(companyId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetSites();
  }, []);

  useEffect(() => {
    if (isSiteUpdated) {
      handleGetSites();
      dispatch(resetSiteUpdatedIndicator());
    }
  }, [isSiteUpdated, dispatch]);

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

  const search = (item: Site, search: string) => {
    const { name, email } = item;

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase())
    );
  };
  const isSiteCodeNotUnique = (siteCode: string): boolean => {
    return data.some((item) => item.siteCode === siteCode);
  };
  const handleOnClickCreateButton = () => {
    var uuid;
    do {
      uuid = generateShortUUID();
    } while (isSiteCodeNotUnique(uuid));
    dispatch(setGeneratedSiteCode(uuid));
    setModalOpen(true);
  };

  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      dispatch(resetGeneratedSiteCode());
      setModalOpen(false);
    }
  };

  const handleOnFormCreateFinish = async (values: any) => {
    try {
      setModalLoading(true);
      const imgURL = await uploadImageToFirebaseAndGetURL(
        Strings.sites,
        values.logo[0]
      );
      await registerSite(
        new CreateSite(
          Number(companyId),
          values.siteCode,
          values.siteBusinessName,
          values.name,
          values.siteType,
          values.rfc,
          values.address,
          values.contact,
          values.position,
          values.phone.toString(),
          values.extension?.toString(),
          values.cellular?.toString(),
          values.email,
          imgURL,
          values.latitud.toString(),
          values.longitud.toString(),
          values.dueDate.format(Constants.DATE_FORMAT),
          values.monthlyPayment,
          values.currency,
          values.appHistoryDays,
          values.userLicense,
          values.userLicense === Strings.concurrente
            ? values.userQuantity
            : null
        )
      ).unwrap();
      setModalOpen(false);
      handleGetSites();
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
        <div className="flex flex-col items-center m-3">
          <PageTitle mainText={Strings.sitesOf} subText={companyName} />
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
          <SiteTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={SiteCard}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          await handleOnFormCreateFinish(values);
        }}
      >
        <ModalForm
          open={modalIsOpen}
          onCancel={handleOnCancelButton}
          FormComponent={RegisterSiteForm}
          title={Strings.createSite.concat(` ${companyName}`)}
          isLoading={modalIsLoading}
        />
      </Form.Provider>
    </>
  );
};

export default Sites;
