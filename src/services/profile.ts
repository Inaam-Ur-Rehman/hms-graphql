import prisma from "../database/db";

export interface createProfileInput {
  id: string;
  fatherName: string;
  cnic: string;
  address: string;
  phone: string;
  emergencyContact: string;
  bloodGroup: string;
  userId: string;
  cnicFront: string;
  cnicBack: string;
  userType: "STUDENT" | "JOB_HOLDER" | "OTHER";
  image: string;
}

class ProfileService {
  // get user profile by id
  public static async profile(payload: { id: string }) {
    const userProfile = await prisma.profile.findUnique({
      where: { id: payload.id },
      include: { user: true },
    });
    return userProfile;
  }
  // create user profile
  public static async createProfile(payload: createProfileInput) {
    try {
      const isProfileExist = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: { profile: true, room: { include: { users: true } } },
      });

      if (isProfileExist?.profile) {
        throw new Error("Profile already exist");
      }

      const profile = await prisma.profile.create({
        data: { ...payload },
      });

      await prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          profile: { connect: { id: profile.id } },
        },
      });
      return profile;
    } catch (error: any) {
      throw new Error(error.message || "Unable to create user profile");
    }
  }
  // update User Profile
  public static async updateProfile(payload: createProfileInput) {
    try {
      // get user profile
      const profile = await prisma.profile.findUnique({
        where: { userId: payload.userId },
      });
      if (!profile) {
        throw new Error("Unable to find user profile");
      }
      const upadatedProfile = await prisma.profile.update({
        where: {
          userId: payload.userId,
        },
        data: {
          ...payload,
        },
        include: { user: { include: { room: true } } },
      });
      if (!upadatedProfile) {
        throw new Error("Unable to update user profile");
      }
      return upadatedProfile;
    } catch (error: any) {
      throw new Error(error.message || "Unable to update user profile");
    }
  }
  // delete user profile
  public static async deleteProfile(id: string) {
    try {
      const profile = await prisma.profile.delete({
        where: { userId: id },
      });
      if (!profile) {
        throw new Error("Unable to delete user profile");
      }
      return "User profile is deleted successfully";
    } catch (error: any) {
      throw new Error(error.message || "Unable to delete user profile");
    }
  }
}

export default ProfileService;
