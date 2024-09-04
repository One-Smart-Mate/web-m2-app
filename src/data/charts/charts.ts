export interface Preclassifier {
  preclassifier: string;
  totalCards: number;
  methodology: string;
  color: string;
}

export interface Methodology {
  methodology: string;
  color: string;
  totalCards: number;
}

export interface Area {
  area: string;
  totalCards: number;
}

export interface Machine {
  machine: string;
  location: string
  totalCards: number;
}

export interface Creators {
  creator: string;
  totalCards: number;
}

export interface Weeks {
  year: number;
  week: number;
  issued: number;
  eradicated: number;
  cumulativeIssued: number;
  cumulativeEradicated: number;
}
