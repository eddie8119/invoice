import { z } from "zod";

export const createInvoiceSchema = z.object({
  company: z.string(),
  invoiceNumber: z.string(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }), // 這個字串 能不能被 JS 當作日期 parse 成功」。 只要 parse 成功不是 NaN 就行
  type: z.string().default("receivable"),
  status: z.string().default("unpaid"),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    })
  ),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;
