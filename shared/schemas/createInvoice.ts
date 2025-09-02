import { z } from "zod";

export const createInvoiceSchema = z.object({
  company: z.string().min(1, "公司名稱為必填"),
  caseName: z.string().min(1, "專案名稱為必填"),
  invoiceNumber: z.string().optional(),
  isTax: z.boolean().default(false),
  salesAmount: z.number().min(1, "總金額為必填"),
  totalAmount: z.number().min(1, "總金額為必填"),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }), // 這個字串 能不能被 JS 當作日期 parse 成功」。 只要 parse 成功不是 NaN 就行
  type: z.string().default("receivable"),
  status: z.string().default("unpaid"),
  note: z.string().optional(),
  invoiceItems: z
    .array(
      z.object({
        title: z.string().min(1, "品項名稱不能為空"),
        quantity: z
          .number({
            required_error: "數量為必填",
            invalid_type_error: "數量必須是數字",
          })
          .positive("數量必須大於 0"),
        unitPrice: z
          .number({
            required_error: "單價為必填",
            invalid_type_error: "單價必須是數字",
          })
          .positive("單價必須大於 0"),
      })
    )
    .optional(),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;
