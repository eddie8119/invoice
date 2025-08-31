import { Filter, FilterOption } from '@/components/core/filter/Filter';
import React from 'react';

const statusOptions = ['all', 'opened', 'unopened'] as FilterOption[];

interface NoInvoiceNumberFilterProps {
  active: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export const NoInvoiceNumberFilter = ({
  active,
  onFilterChange,
}: NoInvoiceNumberFilterProps) => {
  return (
    <Filter options={statusOptions} active={active} onChange={onFilterChange} />
  );
};
