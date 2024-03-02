import FeeService, {
  createFeePayload,
  updateFeePayloadById,
} from "../../services/fee";
const queries = {
  fees: async () => {
    return FeeService.getFees();
  },
  feeById: async (parent: any, args: { id: string }) => {
    return FeeService.getFeeById(args.id);
  },
  feeByMonth: async (parent: any, args: { month: string }) => {
    return FeeService.getFeeByMonth(args.month);
  },
  feeByYear: async (parent: any, args: { year: string }) => {
    return FeeService.getFeeByYear(args.year);
  },
  feeByMonthYear: async (
    parent: any,
    args: { month: string; year: string }
  ) => {
    return FeeService.getFeeByMonthYear(args.month, args.year);
  },
  feeByUser: async (parent: any, args: { userId: string }) => {
    return FeeService.getFeeByUser(args.userId);
  },
};
const mutations = {
  createFee: async (parent: any, args: createFeePayload) => {
    return FeeService.createFee(args);
  },
  updateFeeById: async (parent: any, args: updateFeePayloadById) => {
    return FeeService.updateFeeById(args);
  },
  deleteFee: async (parent: any, args: { id: string }) => {
    return FeeService.deleteFee(args.id);
  },
};

export const resolvers = { queries, mutations };
