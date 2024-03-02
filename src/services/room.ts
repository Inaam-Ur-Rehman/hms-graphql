import prisma from "../database/db";

export interface createRoomPayload {
  roomNumber: number;
  capacity: number;
  floor?: number;
  status?: boolean;
}
export interface updateRoomPayload {
  id: string;
  roomNumber: number;
  capacity: number;
  floor?: number;
  status?: boolean;
}
export interface assignRoomPayload {
  userId: string;
  roomNumber: number;
}
class RoomService {
  // get all rooms
  public static async getAllRooms() {
    try {
      const rooms = await prisma.room.findMany({
        include: { users: { include: { profile: true } } },
      });
      return rooms;
    } catch (error: any) {
      throw new Error(error.message || "Unable to find rooms");
    }
  }
  // create Room
  public static async createRoom(payload: createRoomPayload) {
    try {
      const isRoomExists = await prisma.room.findFirst({
        where: { roomNumber: payload.roomNumber },
      });
      if (isRoomExists) {
        throw new Error("Room already exists");
      }
      // create room
      const newRoom = await prisma.room.create({
        data: { ...payload },
        include: { users: { include: { profile: true } } },
      });

      if (!newRoom) {
        throw new Error("Unable to create room");
      }
      return newRoom;
    } catch (error: any) {
      throw new Error(error.message || "Unable to create Room");
    }
  }
  // get Room By Room Number
  public static async getRoomByRoomNumber(roomNumber: number) {
    try {
      const room = await prisma.room.findFirst({
        where: { roomNumber },
        include: { users: { include: { profile: true } } },
      });
      if (!room) {
        throw new Error("Room is not available");
      }
      return room;
    } catch (error: any) {
      throw new Error(error.message || "Unable to get room");
    }
  }
  // get room By Room Id
  public static async getRoomById(id: string) {
    try {
      const room = await prisma.room.findFirst({
        where: { id },
        include: { users: { include: { profile: true } } },
      });
      if (!room) {
        throw new Error("Room is not available");
      }
      return room;
    } catch (error: any) {
      throw new Error(error.message || "Unable to get room");
    }
  }
  // update room by room number
  public static async updateRoomById(payload: updateRoomPayload) {
    try {
      const { id, ...other } = payload;
      const updatedRoom = await prisma.room.update({
        where: { id: payload.id },
        data: { ...other },
        include: { users: { include: { profile: true } } },
      });

      return updatedRoom;
    } catch (error: any) {
      throw new Error(error.message || "Unable to upadate room");
    }
  }
  // delete room by room Number
  public static async deleteRoomById(id: string) {
    try {
      const deletedRoom = await prisma.room.delete({ where: { id } });
      if (!deletedRoom) {
        throw new Error("Unable to delete room");
      }
      return "Room deleted successfully";
    } catch (error: any) {
      throw new Error(error.message || "Unable to delete room");
    }
  }
  // assign room to a user
  public static async assignRoom(payload: assignRoomPayload) {
    try {
      // check: user exists
      const isUserExists = await prisma.user.findUnique({
        where: { id: payload.userId },
      });
      if (!isUserExists) {
        throw new Error("User is not exists");
      }
      // check: user already belongs to a room
      if (isUserExists.roomId) {
        throw new Error("A room is already assigned to this user");
      }
      // check: is space available in room
      const room = await prisma.room.findFirst({
        where: { roomNumber: payload.roomNumber },
        include: { users: { include: { profile: true } } },
      });

      if (!room) {
        throw new Error("Unable to find room");
      }

      if (room.users.length >= room.capacity) {
        throw new Error("Room has not enough capacity");
      }

      await prisma.user.update({
        where: { id: payload.userId },
        data: {
          room: {
            connect: { roomNumber: room.roomNumber },
          },
        },
        include: { room: true },
      });

      return room;
    } catch (error: any) {
      throw new Error(error.message || "Unable to assign room");
    }
  }
  public static async removeUserFromRoom(userId: string) {
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          roomId: null,
        },
        include: { profile: true, room: { include: { users: true } } },
      });

      return "User removed from room successfully";
    } catch (error: any) {
      throw new Error(error.message || "Unable to remove user from room");
    }
  }
}

export default RoomService;
