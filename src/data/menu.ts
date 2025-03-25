import { RouteLocationRaw } from "vue-router";

export interface IMenu {
  heading: string;
  route: RouteLocationRaw;
  svgIcon?: string;
  meta?: {
    role: string[];
  };
  sub?: IMenu[];
}

export const menu: IMenu[] = [
  {
    heading: "Menu 1",
    route: "/",
    svgIcon: "icon-docs",
  },
  {
    heading: "Menu with sub",
    route: "",
    svgIcon: "icon-docs",
    sub: [
      {
        heading: "Submenu 1",
        route: "",
      },
      {
        heading: "Submenu 2",
        route: "",
      },
    ],
    meta: {
      role: ["super_admin"],
    },
  },
];
