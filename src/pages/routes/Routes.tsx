import { ItemType } from "antd/es/menu/interface";
import { MenuProps } from "antd";
import { Route } from "./models/Route";
import User from "../../data/user/user";
import { UserRoles, getUserRol } from "../../utils/Extensions";
import { BsBarChartLine, BsBuildings } from "react-icons/bs";
import Routes from "../../utils/Routes";
import Company from "../company/Companies";
import Priorities from "../priority/Priorities";
import Sites from "../site/Sites";
import CardTypess from "../cardtypes/CardTypes";
import Preclassifiers from "../preclassifier/Preclassifiers";
import Users from "../user/Users";
import { MdLowPriority, MdOutlineManageAccounts } from "react-icons/md";
import Levels from "../level/Levels";
import Cards from "../card/Cards";
import CardDetails from "../carddetails/CardDetails";
import Charts from "../charts/Charts";
import SiteUsers from "../user/SiteUsers";
import { PiMapPinAreaLight } from "react-icons/pi";
import { TbCards } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";

const adminCompanies = new Route(
  "Companies",
  "companies",
  Routes.AdminPrefix + Routes.AdminDirectionHome,
  <Company />,
  <BsBuildings />
);
const adminPriorities = new Route(
  "Priorities",
  "priorities",
  Routes.AdminPrefix + Routes.PriorityAll,
  <Priorities />,
  <></>
);

const adminUsers = new Route(
  "Manage users",
  "users",
  Routes.AdminPrefix + Routes.Users,
  <Users />,
  <MdOutlineManageAccounts />
);

const adminSiteUsers = new Route(
  "Manage site users",
  "site users",
  Routes.AdminPrefix + Routes.SiteUsers,
  <SiteUsers />,
  <MdOutlineManageAccounts />
);

const adminSites = new Route(
  "Sites",
  "sites",
  Routes.AdminPrefix + Routes.SitesAllByCompany,
  <Sites rol={UserRoles.ADMIN} />,
  <></>
);

const adminCardTypes = new Route(
  "Card types",
  "cardtypes",
  Routes.AdminPrefix + Routes.CardTypesAllBySite,
  <CardTypess rol={UserRoles.ADMIN} />,
  <></>
);

const adminPreclassifiers = new Route(
  "Preclassifiers",
  "preclassifiers",
  Routes.AdminPrefix + Routes.PreclassifiersAllByCardType,
  <Preclassifiers />,
  <></>
);

const adminLevels = new Route(
  "Levels",
  "levels",
  Routes.AdminPrefix + Routes.LevelsAllByCardType,
  <Levels />,
  <></>
);

const adminCards = new Route(
  "Cards",
  "cards",
  Routes.AdminPrefix + Routes.AllCardsBySite,
  <Cards rol={UserRoles.ADMIN} />,
  <></>
);

const adminCardDetails = new Route(
  "Card details",
  "carddetails",
  Routes.AdminPrefix + Routes.CardDetails,
  <CardDetails />,
  <></>
);

const adminCharts = new Route(
  "Charts",
  "charts",
  Routes.AdminPrefix + Routes.Charts,
  <Charts />,
  <></>
);

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(adminCompanies.label, adminCompanies.fullPath, adminCompanies.icon),
    getItem(adminUsers.label, adminUsers.fullPath, adminUsers.icon),
  ];
  return items;
};

const adminRoutes: Route[] = [
  adminCompanies,
  adminUsers,
  adminPriorities,
  adminSites,
  adminCardTypes,
  adminPreclassifiers,
  adminLevels,
  adminCards,
  adminCardDetails,
  adminCharts,
  adminSiteUsers,
];

const sysAdminCharts = new Route(
  "Charts",
  "charts",
  Routes.SysadminPrefix + Routes.Charts,
  <Charts />,
  <BsBarChartLine />
);

const sysAdminSite = new Route(
  "Site",
  "sites",
  Routes.SysadminPrefix + Routes.Site,
  <Sites rol={UserRoles.SYSADMIN} />,
  <BsBuildings />
);

const sysAdminSiteUsers = new Route(
  "Manage site users",
  "site users",
  Routes.SysadminPrefix + Routes.SiteUsers,
  <SiteUsers />,
  <MdOutlineManageAccounts />
);

const sysAdminPriorities = new Route(
  "Priorities",
  "priorities",
  Routes.SysadminPrefix + Routes.PriorityAll,
  <Priorities />,
  <MdLowPriority />
);

const sysAdminLevels = new Route(
  "Levels",
  "levels",
  Routes.SysadminPrefix + Routes.LevelsAllByCardType,
  <Levels />,
  <PiMapPinAreaLight />
);

const sysAdminCardTypes = new Route(
  "Card types",
  "cardtypes",
  Routes.SysadminPrefix + Routes.CardTypesAllBySite,
  <CardTypess rol={UserRoles.SYSADMIN} />,
  <BiCategory />
);

const sysAdminCards = new Route(
  "Cards",
  "cards",
  Routes.SysadminPrefix + Routes.AllCardsBySite,
  <Cards rol={UserRoles.SYSADMIN} />,
  <TbCards />
);

const sysAdminCardDetails = new Route(
  "Card details",
  "carddetails",
  Routes.SysadminPrefix + Routes.CardDetails,
  <CardDetails />,
  <></>
);

const sysAdminPreclassifiers = new Route(
  "Preclassifiers",
  "preclassifiers",
  Routes.SysadminPrefix + Routes.PreclassifiersAllByCardType,
  <Preclassifiers />,
  <></>
);

const sysAdminRoutes: Route[] = [
  sysAdminCharts,
  sysAdminSite,
  sysAdminSiteUsers,
  sysAdminPriorities,
  sysAdminLevels,
  sysAdminCardTypes,
  sysAdminCards,
  sysAdminPreclassifiers,
  sysAdminCardDetails,
];

const sysAdminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(sysAdminSite.label, sysAdminSite.fullPath, sysAdminSite.icon),
    getItem(
      sysAdminSiteUsers.label,
      sysAdminSiteUsers.fullPath,
      sysAdminSiteUsers.icon
    ),
    getItem(sysAdminCharts.label, sysAdminCharts.fullPath, sysAdminCharts.icon),
    getItem(
      sysAdminPriorities.label,
      sysAdminPriorities.fullPath,
      sysAdminPriorities.icon
    ),
    getItem(sysAdminLevels.label, sysAdminLevels.fullPath, sysAdminLevels.icon),
    getItem(
      sysAdminCardTypes.label,
      sysAdminCardTypes.fullPath,
      sysAdminCardTypes.icon
    ),
    getItem(sysAdminCards.label, sysAdminCards.fullPath, sysAdminCards.icon),
  ];
  return items;
};

const mechanicCards = new Route(
  "Cards",
  "cards",
  Routes.MechanicPrefix + Routes.AllCardsBySite,
  <Cards rol={UserRoles.MECHANIC} />,
  <TbCards />
);

const mechanicCardDetails = new Route(
  "Card details",
  "carddetails",
  Routes.MechanicPrefix + Routes.CardDetails,
  <CardDetails />,
  <></>
);

const mechanicRoutes: Route[] = [mechanicCards, mechanicCardDetails];

const mechanicRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(mechanicCards.label, mechanicCards.fullPath, mechanicCards.icon),
  ];
  return items;
};

const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  switch (rol) {
    case UserRoles.ADMIN:
      return adminRoutesSiderOptions();
    case UserRoles.SYSADMIN:
      return sysAdminRoutesSiderOptions();
    case UserRoles.MECHANIC:
      return mechanicRoutesSiderOptions();
  }
  return [];
};

export {
  adminRoutesSiderOptions,
  adminRoutes,
  getUserSiderOptions,
  sysAdminRoutes,
  mechanicRoutes,
  mechanicRoutesSiderOptions,
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];
