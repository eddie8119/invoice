import { Invoice } from '@/types/invoice';

export const getRemainingDaysMessage = (
  status: Invoice['status'],
  dueDate: Date | null
) => {
  if (status === 'paid') return '';
  if (status === 'unpaid') {
    const today = new Date(); // Assume this is June 8, 2025

    // This is your current condition:
    if (dueDate && dueDate > today) {
      // Logic A: dueDate is provided AND it's after today
      const diffMs = dueDate.getTime() - today.getTime();
      const diffDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      return `在${diffDays}天內到期`;
    }

    // Logic B: Fallback (if dueDate is null OR dueDate is today or in the past)
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0); // This will be June 30, 2025
    const diffMs = lastDay.getTime() - today.getTime();
    const diffDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
    return `在${diffDays}天內到期月底`;
  }
  if (status === 'overdue') return '逾期3天';
  return '';
};
