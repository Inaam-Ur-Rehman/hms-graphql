import prisma from "../database/db";

export interface createFeePayload {
  userId: string;
  month: string;
  amount: number;
}

export interface updateFeePayloadById {
  id: string;
  userId?: string;
  month?: string;
  amount?: number;
}

class FeeService {
  public static async createFee(payload: createFeePayload) {
    try {
      const fees_obj = {
        userId: payload.userId,
        month: payload.month,
        amount: payload.amount,
      };

      // check if fee already paid for this month
      const isPaid = await prisma.fee.findFirst({
        where: {
          userId: payload.userId,
          month: payload.month,
        },
      });

      if (isPaid) throw new Error("Fee already paid for this month");
      const fee = await prisma.fee.create({
        data: fees_obj,
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to create fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to create fee");
    }
  }
  public static async updateFeeById(payload: updateFeePayloadById) {
    try {
      const fee = await prisma.fee.update({
        where: {
          id: payload.id,
        },
        data: {
          ...payload,
        },
        include: {
          user: true,
        },
      });

      if (!fee) throw new Error("Unable to update fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to update fee");
    }
  }

  public static async deleteFee(id: string) {
    try {
      await prisma.fee
        .delete({
          where: {
            id,
          },
        })
        .then(() => "Fee deleted successfully")
        .catch(() => {
          throw new Error("Unable to delete fee");
        });
    } catch (error: any) {
      throw new Error(error.message || "Unable to delete fee");
    }
  }

  public static async getFees() {
    try {
      const fees = await prisma.fee.findMany({
        include: { user: true },
      });

      if (!fees) throw new Error("Unable to fetch fees");

      return fees;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fees");
    }
  }

  public static async getFeeById(id: string) {
    try {
      const fee = await prisma.fee.findUnique({
        where: {
          id,
        },
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to fetch fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fee");
    }
  }

  public static async getFeeByMonth(month: string) {
    try {
      const fee = await prisma.fee.findFirst({
        where: {
          month,
        },
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to fetch fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fee");
    }
  }

  public static async getFeeByYear(year: string) {
    try {
      const fee = await prisma.fee.findMany({
        where: {
          createdAt: {
            gte: new Date(Number(year), 0, 1),
            lt: new Date(Number(year) + 1, 0, 1),
          },
        },
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to fetch fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fee");
    }
  }

  public static async getFeeByMonthYear(month: string, year: string) {
    try {
      const fee = await prisma.fee.findMany({
        where: {
          month,
          createdAt: {
            gte: new Date(Number(year), 0, 1),
            lt: new Date(Number(year) + 1, 0, 1),
          },
        },
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to fetch fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fee");
    }
  }

  public static async getFeeByUser(userId: string) {
    try {
      const fee = await prisma.fee.findMany({
        where: {
          userId: userId,
        },
        include: { user: true },
      });

      if (!fee) throw new Error("Unable to fetch fee");

      return fee;
    } catch (error: any) {
      throw new Error(error.message || "Unable to fetch fee");
    }
  }
}
export default FeeService;
