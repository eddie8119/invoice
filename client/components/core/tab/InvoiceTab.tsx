import React from 'react';
import { FilterOption, Tab } from './Tab';

const statusOptions: FilterOption[] = ['receivable', 'payable'];

interface InvoiceTabProps {
  active: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export const InvoiceTab = ({ active, onFilterChange }: InvoiceTabProps) => {
  return (
    <Tab options={statusOptions} active={active} onChange={onFilterChange} />
  );
};
