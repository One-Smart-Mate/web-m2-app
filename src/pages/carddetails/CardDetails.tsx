import { useEffect, useState } from "react";
import Strings from "../../utils/localizations/Strings";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useGetCardDetailsMutation } from "../../services/cardService";
import { CardDetailsInterface } from "../../data/card/card";
import InfoCard from "./components/InfoCard";
import EvidenceCard from "./components/EvidenceCard";
import DefinitiveSolutionCard from "./components/DefinitiveSolutionCard";
import ProvisionalSolutionCard from "./components/ProvisionalSolutionCard";

interface stateType {
  cardId: string;
  cardName: string;
}

const CardDetails = () => {
  const [getCardDetails] = useGetCardDetailsMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { cardId, cardName } = state as stateType;
  const [data, setData] = useState<CardDetailsInterface | null>(null);

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
        <div className="flex-1 overflow-auto">
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="flex flex-wrap flex-row gap-2">
              <ProvisionalSolutionCard data={data} isLoading={isLoading} />
              <DefinitiveSolutionCard data={data} isLoading={isLoading} />
            </div>
            <div className="flex flex-wrap flex-row gap-2">
              <InfoCard data={data} isLoading={isLoading} />
              <EvidenceCard data={data} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
