export class CreateLevel {
  name: string;
  description: string;
  responsibleId: number;
  levelMachineId: string;
  siteId: number;
  constructor(
    name: string,
    description: string,
    responsibleId: number,
    siteId: number,
    levelMachineId: string
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.siteId = siteId;
    this.levelMachineId = levelMachineId;
  }
}

export class CreateNode {
  name: string;
  description: string;
  responsibleId: number;
  siteId: number;
  superiorId: number;
  levelMachineId: string;
  constructor(
    name: string,
    description: string,
    responsibleId: number,
    siteId: number,
    superiorId: number,
    levelMachineId: string
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.siteId = siteId;
    this.superiorId = superiorId;
    this.levelMachineId = levelMachineId;
  }
}

export class UpdateLevel {
  id: number;
  name: string;
  description: string;
  responsibleId: number;
  status: string;
  levelMachineId: string;
  constructor(
    id: number,
    name: string,
    description: string,
    responsibleId: number,
    status: string,
    levelMachineId: string
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.id = id;
    this.status = status;
    this.levelMachineId = levelMachineId;
  }
}
