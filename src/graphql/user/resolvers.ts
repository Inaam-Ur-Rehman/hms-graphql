import UserService, {
  createUserPayload,
  updateUserByIdPayload,
} from "../../services/user";

const queries = {
  users: async () => {
    return UserService.getUsers();
  },
  user: async (_: any, args: { id: string }) => {
    return UserService.getUserByID(args.id);
  },
};
const mutations = {
  createUser: async (_: any, args: createUserPayload) => {
    return UserService.createUser(args);
  },
  updateUserById: async (_: any, args: updateUserByIdPayload) => {
    return UserService.updateUserById(args);
  },
  deleteUser: async (_: any, args: { id: string }) => {
    return UserService.deleteUserByUserId(args.id);
  },
};
export const resolvers = { queries, mutations };
