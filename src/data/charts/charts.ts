export interface Preclassifier {
  preclassifier: string;
  totalCards: number;
  methodology: string;
}

export interface Methodology {
  methodology: string;
  totalCards: number;
}

export interface Areas {
  area: string;
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
