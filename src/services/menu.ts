import prisma from "../database/db";

export interface dayPayload {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
}

export interface createMenuPayload {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface updateMenuPayload {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}
class MenuService {
  public static async menus() {
    try {
      const fullMenu = await prisma.menu.findMany();
      return fullMenu;
    } catch (error: any) {
      throw new Error(error.message || "Unable to get menu");
    }
  }
  public static async menu(payload: dayPayload) {
    try {
      const _menu = await prisma.menu.findFirst({
        where: { day: payload.day },
      });
      return _menu;
    } catch (error: any) {
      throw new Error("Unable to get menu");
    }
  }
  public static async createMenu(payload: createMenuPayload) {
    try {
      const isMenuExist = await prisma.menu.findUnique({
        where: { day: payload.day },
      });

      if (isMenuExist) {
        throw new Error("Menu already exist");
      }

      const menu = await prisma.menu.create({
        data: { ...payload },
      });

      return menu;
    } catch (error: any) {
      throw new Error(error.message || "Unable to create menu");
    }
  }
  public static async updateMenu(payload: updateMenuPayload) {
    try {
      const updateMenu = await prisma.menu.update({
        where: {
          day: payload.day,
        },
        data: {
          ...payload,
        },
      });

      if (updateMenu) {
        return updateMenu;
      } else {
        throw new Error("Unable to update menu");
      }
    } catch (error: any) {
      throw new Error(error.message || "Unable to update menu");
    }
  }

  public static async deleteMenu(payload: dayPayload) {
    try {
      const isMenuExist = await prisma.menu.findUnique({
        where: { day: payload.day },
      });
      if (!isMenuExist) {
        throw new Error("Menu does not exist");
      }
      const deleteMenu = await prisma.menu.delete({
        where: {
          day: payload.day,
        },
      });

      if (deleteMenu) {
        return "Menu deleted successfully";
      } else {
        throw new Error("Unable to delete menu");
      }
    } catch (error: any) {
      throw new Error(error.message || "Unable to delete menu");
    }
  }
}

export default MenuService;
