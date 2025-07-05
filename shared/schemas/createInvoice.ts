import { z } from "zod";

export const createInvoiceSchema = z.object({
  company: z.string(),
  invoiceNumber: z.string(),
  dueDate: z.date(),
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
