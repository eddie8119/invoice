import { z } from "zod";

export const createCashFlowSchema = z.object({
  openingBalance: z.number().min(1, "開戶金額為必填"),
});

export type CreateCashFlowSchema = z.infer<typeof createCashFlowSchema>;
