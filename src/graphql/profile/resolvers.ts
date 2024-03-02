import ProfileService, { createProfileInput } from "../../services/profile";

const queries = {
  profile: (parent: any, args: { id: string }) => {
    return ProfileService.profile(args);
  },
};
const mutations = {
  createProfile: (parent: any, args: createProfileInput) => {
    return ProfileService.createProfile(args);
  },
  updateProfile: (parent: any, args: createProfileInput) => {
    return ProfileService.updateProfile(args);
  },
  deleteProfile: (parent: any, args: { id: string }) => {
    return ProfileService.deleteProfile(args.id);
  },
};
export const resolvers = { queries, mutations };
