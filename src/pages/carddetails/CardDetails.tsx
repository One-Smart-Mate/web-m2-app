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
import AudiosCard from "./components/AudiosCard";

interface stateType {
  cardId: string;
  cardName: string;
}

const CardDetails = () => {
  const [getCardDetails] = useGetCardDetailsMutation();

  const { state } = useLocation();
  const { cardId, cardName } = state as stateType;
  const [data, setData] = useState<CardDetailsInterface | null>(null);

  const handleGetCards = async () => {
    if (cardId) {
      try {
        const response = await getCardDetails(cardId).unwrap();
        setData(response);
      } catch (error) {}
    }
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
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex flex-col gap-2">
              <InfoCard data={data} />

              {Array.isArray(data?.evidences) && data.evidences.length > 0 && (
                <AudiosCard data={data.evidences} />
              )}
            </div>
            <div className="flex justify-center flex-col gap-2">
              {Array.isArray(data?.evidences) && data.evidences.length > 0 && (
                <EvidenceCard data={data.evidences} />
              )}
              <div className="flex justify-center h-full flex-wrap gap-2">
                <ProvisionalSolutionCard data={data} />
                <DefinitiveSolutionCard data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;