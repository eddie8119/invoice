export interface CompanyDTO {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string | null;
  contactPerson: string | null;
  cases: {
    id: string;
    name: string;
  }[];
}
