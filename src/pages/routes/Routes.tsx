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
import Strings from "../../utils/localizations/Strings";

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
  <Sites rol={UserRoles.IHSISADMIN} />,
  <></>
);

const adminCardTypes = new Route(
  "Card types",
  "cardtypes",
  Routes.AdminPrefix + Routes.CardTypesAllBySite,
  <CardTypess rol={UserRoles.IHSISADMIN} />,
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
  <Cards rol={UserRoles.IHSISADMIN} />,
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

const sysAdminSites = new Route(
  "Sites",
  "sites",
  Routes.SysadminPrefix + Routes.Sites,
  <Sites rol={UserRoles.LOCALSYSADMIN} />,
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
  <CardTypess rol={UserRoles.LOCALSYSADMIN} />,
  <BiCategory />
);

const sysAdminCards = new Route(
  "Cards",
  "cards",
  Routes.SysadminPrefix + Routes.AllCardsBySite,
  <Cards rol={UserRoles.LOCALSYSADMIN} />,
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
  sysAdminSites,
  sysAdminSiteUsers,
  sysAdminPriorities,
  sysAdminLevels,
  sysAdminCardTypes,
  sysAdminCards,
  sysAdminPreclassifiers,
  sysAdminCardDetails,
];

const sysAdminRoutesSiderOptions = (user: User): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(sysAdminSites.label, Strings.sites, sysAdminSites.icon, [
      getItem(Strings.viewSites, sysAdminSites.fullPath),
      ...user.sites.map((site) =>
        getItem(site.name, `${Strings.site}${site.id}`, null, [
          getItem(
            sysAdminSiteUsers.label,
            `${sysAdminSiteUsers.fullPath}?site-name=${site.name}`,
            sysAdminSiteUsers.icon
          ),
          getItem(
            sysAdminCharts.label,
            `${sysAdminCharts.fullPath}?site-name=${site.name}`,
            sysAdminCharts.icon
          ),
          getItem(
            sysAdminCards.label,
            `${sysAdminCards.fullPath}?site-name=${site.name}`,
            sysAdminCards.icon
          ),
          getItem(
            sysAdminLevels.label,
            `${sysAdminLevels.fullPath}?site-name=${site.name}`,
            sysAdminLevels.icon
          ),
          getItem(
            sysAdminCardTypes.label,
            `${sysAdminCardTypes.fullPath}?site-name=${site.name}`,
            sysAdminCardTypes.icon
          ),
          getItem(
            sysAdminPriorities.label,
            `${sysAdminPriorities.fullPath}?site-name=${site.name}`,
            sysAdminPriorities.icon
          ),
        ])
      ),
    ]),
  ];
  return items;
};

const localAdminSites = new Route(
  "Manage site users",
  "site users",
  Routes.LocalAdminPrefix + Routes.Sites,
  <Sites rol={UserRoles.LOCALADMIN} />,
  <MdOutlineManageAccounts />
);

const localAdminCards = new Route(
  "Cards",
  "cards",
  Routes.LocalAdminPrefix + Routes.AllCardsBySite,
  <Cards rol={UserRoles.LOCALADMIN} />,
  <TbCards />
);

const localAdminCardDetails = new Route(
  "Card details",
  "carddetails",
  Routes.LocalAdminPrefix + Routes.CardDetails,
  <CardDetails />,
  <></>
);

const localAdminCharts = new Route(
  "Charts",
  "charts",
  Routes.LocalAdminPrefix + Routes.Charts,
  <Charts />,
  <BsBarChartLine />
);

const localAdminRoutes: Route[] = [
  localAdminCharts,
  localAdminCards,
  localAdminCardDetails,
  localAdminSites,
];

const localAdminRoutesSiderOptions = (user: User): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(Strings.viewSites, Strings.sites, <BsBuildings />, [
      getItem(Strings.viewSites, localAdminSites.fullPath),
      ...user.sites.map((site) =>
        getItem(site.name, `${Strings.site}${site.id}`, null, [
          getItem(
            localAdminCharts.label,
            `${localAdminCharts.fullPath}?site-name=${site.name}`,
            localAdminCharts.icon
          ),
          getItem(
            localAdminCards.label,
            `${localAdminCards.fullPath}?site-name=${site.name}`,
            localAdminCards.icon
          ),
        ])
      ),
    ]),
  ];
  return items;
};

const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  switch (rol) {
    case UserRoles.IHSISADMIN:
      return adminRoutesSiderOptions();
    case UserRoles.LOCALSYSADMIN:
      return sysAdminRoutesSiderOptions(user);
    case UserRoles.LOCALADMIN:
      return localAdminRoutesSiderOptions(user);
  }
  return [];
};

export {
  adminRoutesSiderOptions,
  adminRoutes,
  getUserSiderOptions,
  sysAdminRoutes,
  localAdminRoutes,
  localAdminRoutesSiderOptions,
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
