import { Filter, FilterOption } from '@/components/core/filter/Filter';
import React from 'react';

const statusOptions = ['所有', '已開立', '未開立'] as FilterOption[];

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
