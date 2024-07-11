import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useGetCardsMutation } from "../../services/cardService";
import PaginatedList from "../../components/PaginatedList";
import InformationPanel from "./components/Card";
import { CardInterface } from "../../data/card/card";

interface stateType {
  siteId: string;
  siteName: string;
}

const Cards = () => {
  const [getCards] = useGetCardsMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { siteId, siteName } = state as stateType;
  const [data, setData] = useState<CardInterface[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<CardInterface[]>([]);

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

  const search = (item: CardInterface, search: string) => {
    const { creatorName, areaName, cardTypeMethodologyName } = item;

    return (
      creatorName.toLowerCase().includes(search.toLowerCase()) ||
      areaName.toLowerCase().includes(search.toLowerCase()) ||
      cardTypeMethodologyName.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const handleGetCards = async () => {
    setLoading(true);
    if (siteId) {
      try {
        const response = await getCards(siteId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCards();
  }, [state, getCards]);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col items-center m-3">
          <PageTitle mainText={Strings.cardsOf} subText={siteName} />
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
            <div className="flex mb-1 md:mb-0 md:justify-end w-full md:w-auto"></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-clip">
          <PaginatedList
            data={data}
            ItemComponent={InformationPanel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
