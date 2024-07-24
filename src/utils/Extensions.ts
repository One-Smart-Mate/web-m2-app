import { RuleObject } from "antd/lib/form";
import User from "../data/user/user";
import Routes from "../utils/Routes";
import Strings from "./localizations/Strings";
import { v4 as uuidv4 } from "uuid";
import Constants from "./Constants";
import { Evidences } from "../data/card/card";

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

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );

  return isAdmin ? Routes.AdminDirectionHome : "";
};

export const getUserRol = (user: User): UserRoles | null => {
  const adminRole = "admin";

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );

  return isAdmin ? UserRoles.ADMIN : null;
};

export const enum UserRoles {
  ADMIN,
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
  if (input === "A") {
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
