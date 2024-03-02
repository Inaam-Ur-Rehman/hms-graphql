import RoomService, {
  assignRoomPayload,
  createRoomPayload,
  updateRoomPayload,
} from "../../services/room";

const queries = {
  rooms: async () => {
    return RoomService.getAllRooms();
  },
  roomByNumber: async (_: any, args: { roomNumber: number }) => {
    return RoomService.getRoomByRoomNumber(args.roomNumber);
  },
  roomById: async (_: any, args: { id: string }) => {
    return RoomService.getRoomById(args.id);
  },
};
const mutations = {
  createRoom: async (_: any, args: createRoomPayload) => {
    return RoomService.createRoom(args);
  },
  updateRoom: async (_: any, args: updateRoomPayload) => {
    return RoomService.updateRoomById(args);
  },
  deleteRoom: async (_: any, args: { id: string }) => {
    return RoomService.deleteRoomById(args.id);
  },
  assignRoom: async (_: any, args: assignRoomPayload) => {
    return RoomService.assignRoom(args);
  },
  removeUserFromRoom: async (_: any, args: { userId: string }) => {
    return RoomService.removeUserFromRoom(args.userId);
  },
};

export const resolvers = { queries, mutations };
