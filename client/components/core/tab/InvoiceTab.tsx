import React from 'react';
import { Filter, FilterOption } from '../filter/Filter';

const statusOptions: FilterOption[] = ['receivable', 'payable'];

interface InvoiceTabProps {
  active: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export const InvoiceTab = ({ active, onFilterChange }: InvoiceTabProps) => {
  return (
    <Filter options={statusOptions} active={active} onChange={onFilterChange} />
  );
};
