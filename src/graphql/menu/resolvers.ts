import {
  createMenuPayload,
  dayPayload,
  updateMenuPayload,
} from "../../services/menu";
import MenuService from "../../services/menu";

const queries = {
  getMenus: async () => {
    return MenuService.menus();
  },
  getMenuByDay: async (_: any, args: { payload: dayPayload }) => {
    return MenuService.menu(args.payload);
  },
};
const mutations = {
  createMenu: async (_: any, args: { payload: createMenuPayload }) => {
    return MenuService.createMenu(args.payload);
  },
  updateMenu: async (_: any, args: { payload: updateMenuPayload }) => {
    return MenuService.updateMenu(args.payload);
  },
  deleteMenu: async (_: any, args: dayPayload) => {
    return MenuService.deleteMenu(args);
  },
};

export const resolvers = { mutations, queries };
