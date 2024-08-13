export default class User {
  name: string;
  email: string;
  token: string;
  roles: string[];
  logo: string;
  siteName: string;
  siteId: string;
  companyId: string;
  companyName: string;

  constructor(
    name: string,
    email: string,
    token: string,
    roles: string[],
    logo: string,
    siteName: string,
    siteId: string,
    companyId: string,
    companyName: string
  ) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.roles = roles;
    this.logo = logo;
    this.siteName = siteName;
    this.siteId = siteId;
    this.companyId = companyId;
    this.companyName = companyName;
  }
}

export interface Role {
  id: string;
  name: string;
}

interface Site {
  id: string;
  name: string;
  logo: string;
}

export interface UserTable {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  site: Site;
}

export interface Responsible {
  id: string;
  name: string;
  email: string;
}

export interface UserUpdateForm {
  id: string;
  name: string;
  email: string;
  roles: string[];
  siteId: string;
  uploadCardDataWithDataNet: number;
  uploadCardEvidenceWithDataNet: number;
  status: string;
}
