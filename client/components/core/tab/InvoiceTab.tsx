import React from 'react';
import { Filter, FilterOption } from '../filter/Filter';

const statusOptions = ['應收帳款', '應付帳款'] as FilterOption[];

interface InvoiceTabProps {
  active: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export const InvoiceTab = ({ active, onFilterChange }: InvoiceTabProps) => {
  return (
    <Filter options={statusOptions} active={active} onChange={onFilterChange} />
  );
};
