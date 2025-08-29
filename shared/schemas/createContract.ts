import { z } from "zod";

export const createContractSchema = z.object({
  caseName: z.string().min(1, "專案名稱為必填"),
  contractNumber: z.string().optional(),
  contractAmount: z.number().min(1, "合約總金額為必填"),
  note: z.string().optional(),
  installments: z.array(
    z.object({
      installmentOrder: z
        .number({
          required_error: "期數為必填",
          invalid_type_error: "期數必須是數字",
        })
        .positive("期數必須大於 0"),
      percentage: z
        .number({
          required_error: "百分比為必填",
          invalid_type_error: "百分比必須是數字",
        })
        .positive("百分比必須大於 0"),
      amount: z
        .number({
          required_error: "金額為必填",
          invalid_type_error: "金額必須是數字",
        })
        .positive("金額必須大於 0"),
      paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "付款日期格式錯誤",
      }),
    })
  ),
});

export type CreateContractSchema = z.infer<typeof createContractSchema>;
