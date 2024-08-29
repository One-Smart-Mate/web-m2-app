import { Collapse, Form } from "antd";
import {
  formatDate,
  getCardStatusAndText,
  getDaysSince,
} from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";
import CustomTag from "../../../components/CustomTag";
import { CardDetailsInterface } from "../../../data/card/card";
import ModalForm from "../../../components/ModalForm";
import { useState } from "react";
import UpdateResponsibleForm from "./UpdateResponsibleForm";
import UpdatePriorityForm from "./UpdatePriorityForm";
import {
  useUpdateCardPriorityMutation,
  useUpdateCardResponsibleMutation,
} from "../../../services/cardService";
import {
  UpdateCardPriority,
  UpdateCardResponsible,
} from "../../../data/card/card.request";
import { useAppDispatch, useAppSelector } from "../../../core/store";
import { selectCurrentUser } from "../../../core/authReducer";
import {
  handleErrorNotification,
  handleSucccessNotification,
  NotificationSuccess,
} from "../../../utils/Notifications";
import { setCardUpdatedIndicator } from "../../../core/genericReducer";

interface CardProps {
  data: CardDetailsInterface;
}

const InfoCollapse = ({ data }: CardProps) => {
  const [modalIsLoading, setModalLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(Strings.empty);
  const currentUser = useAppSelector(selectCurrentUser);
  const [updateCardPriority] = useUpdateCardPriorityMutation();
  const [updateCardResponsible] = useUpdateCardResponsibleMutation();
  const dispatch = useAppDispatch();

  const { card } = data;
  const cardStatus = getCardStatusAndText(card.status);

  const handleOnOpenModal = (modalType: string) => {
    setModalOpen(true);
    setModalType(modalType);
  };
  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      setModalOpen(false);
    }
  };

  const selectFormByModalType = (modalType: string) => {
    if (modalType === Strings.priority) {
      return UpdatePriorityForm;
    } else {
      return UpdateResponsibleForm;
    }
  };

  const selecTitleByModalType = (modalType: string) => {
    if (modalType === Strings.priority) {
      return Strings.updatePriority;
    } else {
      return Strings.updateResponsible;
    }
  };

  const handleOnFormUpdateFinish = async (values: any) => {
    try {
      setModalLoading(true);
      if (modalType === Strings.priority) {
        await updateCardPriority(
          new UpdateCardPriority(
            Number(card.id),
            Number(values.priorityId),
            Number(currentUser.userId)
          )
        ).unwrap();
      } else {
        await updateCardResponsible(
          new UpdateCardResponsible(
            Number(card.id),
            Number(values.responsibleId),
            Number(currentUser.userId)
          )
        ).unwrap();
      }
      setModalOpen(false);
      dispatch(setCardUpdatedIndicator());
      handleSucccessNotification(NotificationSuccess.UPDATE);
    } catch (error) {
      handleErrorNotification(error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        className="bg-gray-100 rounded-xl shadow-md"
      >
        <Collapse.Panel
          header={
            <>
              <div className="flex gap-3">
                <h2 className="text-base font-semibold text-black">
                  {Strings.creation}
                </h2>
                <p className="text-base text-gray-700">
                  {formatDate(card.createdAt) || Strings.NA}
                </p>
                <CustomTag color={cardStatus.status}>
                  {cardStatus.text}
                </CustomTag>
                <div
                  className="w-10 md:w-16 rounded-lg border border-black"
                  style={{ backgroundColor: `#${card.cardTypeColor}` }}
                />
              </div>
            </>
          }
          key="1"
        >
          <div className="flex flex-wrap text-sm gap-2">
            <div className="flex gap-1">
              <span className="font-semibold">{Strings.dueDate}: </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {card.cardDueDate || Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">
                {Strings.daysSinceCreation}:{" "}
              </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {getDaysSince(card.createdAt) || Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold"> {Strings.cardType}: </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {card.cardTypeName || Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{Strings.problemType}: </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {card.preclassifierCode
                  ? `${card.preclassifierCode} - ${card.preclassifierDescription}`
                  : Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{Strings.priority}: </span>
              <span
                onClick={() => handleOnOpenModal(Strings.priority)}
                className="bg-gray-500 rounded-lg py-1 px-1 text-white cursor-pointer hover:bg-gray-600"
              >
                {card.priorityCode
                  ? `${card.priorityCode} - ${card.priorityDescription}`
                  : Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold"> {Strings.responsible}: </span>
              <span
                onClick={() => handleOnOpenModal(Strings.responsible)}
                className="bg-gray-500 rounded-lg py-1 px-1 text-white cursor-pointer hover:bg-gray-600"
              >
                {card.responsableName || "N/A"}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold"> {Strings.creator}: </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {card.creatorName || Strings.NA}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">
                {Strings.anomalyDetected} :{" "}
              </span>
              <span className="bg-card-fields rounded-lg py-1 px-1 text-white">
                {card.commentsAtCardCreation || Strings.NA}
              </span>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          await handleOnFormUpdateFinish(values);
        }}
      >
        <ModalForm
          open={modalIsOpen}
          isLoading={modalIsLoading}
          onCancel={handleOnCancelButton}
          title={selecTitleByModalType(modalType)}
          FormComponent={selectFormByModalType(modalType)}
        />
      </Form.Provider>
    </>
  );
};

export default InfoCollapse;
