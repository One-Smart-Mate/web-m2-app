import { RuleObject } from "antd/lib/form";
import User from "../data/user/user";
import Routes from "../utils/Routes";
import Strings from "./localizations/Strings";
import { v4 as uuidv4 } from "uuid";
import Constants from "./Constants";
import { Evidences } from "../data/card/card";
import { CardTypesCatalog } from "../data/cardtypes/cardTypes";

const colors = [
  "#5a5e7c",
  "#567064",
  "#6a6750",
  "#6b4e3d",
  "#536d78",
  "#5b6e54",
  "#6e6e48",
  "#5a5e7c",
  "#536d78",
  "#567064",
];

export const getColorForMethodology = (
  methodologies: CardTypesCatalog[],
  methodology: string
) => {
  const index = methodologies.findIndex(
    (m) => m.cardTypeMethodologyName === methodology
  );
  return colors[index % colors.length];
};

export const isAudioURL = (url: string) => {
  return Constants.AUDIO_FORMATS.some((ext) => url.includes(ext));
};

export const isImageURL = (url: string) => {
  return Constants.IMAGE_FORMATS.some((ext) => url.includes(ext));
};

export const isVideoURL = (url: string) => {
  return Constants.VIDEO_FORMATS.some((ext) => url.includes(ext));
};

export const hasVideos = (evidenceArray: Evidences[]) =>
  evidenceArray.some((evidence) => isVideoURL(evidence.evidenceName));

export const hasAudios = (evidenceArray: Evidences[]) =>
  evidenceArray.some((evidence) => isAudioURL(evidence.evidenceName));

export const hasImages = (evidenceArray: Evidences[]) =>
  evidenceArray.some((evidence) => isImageURL(evidence.evidenceName));

export const generateShortUUID = (): string => {
  const fullUUID = uuidv4();
  const shortUUID = fullUUID.replace(/-/g, "").substring(0, 6).toUpperCase();
  return shortUUID;
};

export const validateEmail = (
  _: RuleObject,
  value: string,
  callback: (error?: string) => void
) => {
  if (!value || value.trim() === "") {
    callback(Strings.requiredEmail);
  } else if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
    callback(Strings.requiredValidEmailAddress);
  } else {
    callback();
  }
};

export const getInitRoute = (user: User): string => {
  const adminRole = "admin";
  const sysAdminRole = "sysadmin";
  const mechanic = "mechanic";

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );
  if (isAdmin) {
    return Routes.AdminPrefix + Routes.AdminDirectionHome;
  }
  const isSysAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === sysAdminRole
  );
  const isMechanic = user.roles?.some(
    (role) => role.trim().toLowerCase() === mechanic
  );

  return isSysAdmin
    ? Routes.SysadminPrefix + Routes.Site
    : isMechanic
    ? Routes.MechanicPrefix + Routes.AllCardsBySite
    : "/";
};

export const getUserRol = (user: User): UserRoles | null => {
  const adminRole = "admin";
  const sysAdminRole = "sysadmin";
  const mechanic = "mechanic";

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );
  if (isAdmin) {
    return UserRoles.ADMIN;
  }
  const isSysAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === sysAdminRole
  );
  const isMechanic = user.roles?.some(
    (role) => role.trim().toLowerCase() === mechanic
  );

  return isSysAdmin
    ? UserRoles.SYSADMIN
    : isMechanic
    ? UserRoles.MECHANIC
    : UserRoles.UNDEFINED;
};

export const enum UserRoles {
  ADMIN,
  SYSADMIN,
  MECHANIC,
  UNDEFINED,
}

export const formatDate = (date: string) => {
  const dateObject: Date = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );
  return formattedDate;
};

export const RESPONSIVE_LIST = {
  gutter: 20,
  xs: 1,
  sm: 2,
  md: 2,
  lg: 2,
  xl: 3,
  xxl: 5,
};

export const RESPONSIVE_AVATAR = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 64,
  xl: 80,
  xxl: 80,
};

export const getStatusAndText = (
  input: string
): { status: "error" | "success"; text: string } => {
  if (input === Strings.activeStatus) {
    return {
      status: "success",
      text: Strings.active,
    };
  } else {
    return {
      status: "error",
      text: Strings.inactive,
    };
  }
};
export const getCardStatusAndText = (
  input: string
): { status: "error" | "success"; text: string } => {
  if (input === "A" || input === "P" || input === "V") {
    return {
      status: "success",
      text: Strings.open,
    };
  } else {
    return {
      status: "error",
      text: Strings.closed,
    };
  }
};
