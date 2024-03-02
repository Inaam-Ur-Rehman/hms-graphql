import prisma from "../database/db";
import ProfileService from "./profile";

export interface createUserPayload {
  name: string;
  email?: string;
  password: string;
  username: string;
  role?: "ADMIN" | "USER" | "MANAGER";
}
export interface updateUserByIdPayload {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  role?: "ADMIN" | "USER" | "MANAGER";
}

class UserService {
  // get all users
  public static async getUsers() {
    const users = await prisma.user.findMany({
      include: { profile: true, room: true },
    });
    return users;
  }
  // create user
  public static async createUser(payload: createUserPayload) {
    const isUserExist = await prisma.user.findUnique({
      where: { username: payload.username },
    });

    if (isUserExist) {
      throw new Error("User already exist");
    }

    const user = await prisma.user.create({
      data: { ...payload },
      include: { profile: true, room: true },
    });

    return user;
  }
  // get user by id
  public static async getUserByID(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        include: { profile: true, room: true },
      });

      return user;
    } catch (error: any) {
      throw new Error(error.message || "Unable to get user");
    }
  }
  // get user by name
  public static async getUserByUsername(name: string) {
    try {
      const user = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        include: { profile: true, room: true },
      });
      if (user) {
        return user;
      } else {
        throw new Error("User not found with provided name");
      }
    } catch (error: any) {
      throw new Error(error.message || "Unable to get user");
    }
  }
  // update user by user id
  public static async updateUserById(payload: updateUserByIdPayload) {
    try {
      const updateUser = await prisma.user.update({
        where: {
          id: payload.id,
        },
        data: {
          ...payload,
        },
        include: { room: true, profile: true },
      });

      if (updateUser) {
        return updateUser;
      } else {
        throw new Error("Unable to update user");
      }
    } catch (error: any) {
      throw new Error(error.message || "Unable to update user");
    }
  }
  // delete user by user Id
  public static async deleteUserByUserId(id: string) {
    try {
      const profileExists = await prisma.profile.findFirst({
        where: { userId: id },
      });
      if (profileExists) {
        await ProfileService.deleteProfile(id);
      }
      const deletedUser = await prisma.user.delete({
        where: {
          id,
        },
      });

      if (deletedUser) {
        return "User deleted successfully";
      } else {
        throw new Error("Unable to delete user");
      }
    } catch (error: any) {
      throw new Error(error.message || "Unable to delete user");
    }
  }
}

export default UserService;
