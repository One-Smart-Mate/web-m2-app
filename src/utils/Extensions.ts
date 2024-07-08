import { RuleObject } from "antd/lib/form";
import User from "../data/user/user";
import Routes from "../utils/Routes";
import Strings from "./localizations/Strings";
import { v4 as uuidv4 } from "uuid";

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

export const RESPONSIVE_LIST = {
  gutter: 4,
  xs: 1,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 3,
  xxl: 4,
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

/* const confirmPasswordValidator = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(Strings.passwordsDoNotMatch));
  },
}); */
