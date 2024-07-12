import { useEffect, useState } from "react";
import Strings from "../../utils/localizations/Strings";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useGetCardDetailsMutation } from "../../services/cardService";
import { CardInterface } from "../../data/card/card";
import InfoCard from "./components/InfoCard";

interface stateType {
  cardId: string;
  cardName: string;
}

const CardDetails = () => {
  const [getCardDetails] = useGetCardDetailsMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { cardId, cardName } = state as stateType;
  const [data, setData] = useState<CardInterface>();

  const handleGetCards = async () => {
    setLoading(true);
    if (cardId) {
      try {
        const response = await getCardDetails(cardId).unwrap();
        setData(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCards();
  }, [state, getCardDetails]);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col items-center m-3">
          <PageTitle mainText={Strings.cardDetailsOf} subText={cardName} />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-clip">
          {data && <InfoCard data={data} isLoading={true} />}
        </div>
      </div>
    </>
  );
};

export default CardDetails;
