export class UpdateCardPriority {
  cardId: number;
  priorityId: number;
  idOfUpdatedBy: number;

  constructor(cardId: number, priorityId: number, idOfUpdatedBy: number) {
    this.cardId = cardId;
    this.priorityId = priorityId;
    this.idOfUpdatedBy = idOfUpdatedBy;
  }
}

export class UpdateCardResponsible {
  cardId: number;
  responsibleId: number;
  idOfUpdatedBy: number;

  constructor(cardId: number, responsibleId: number, idOfUpdatedBy: number) {
    this.cardId = cardId;
    this.responsibleId = responsibleId;
    this.idOfUpdatedBy = idOfUpdatedBy;
  }
}
