import { Filter, FilterOption } from '@/components/core/Filter';
import { theme } from '@/constants/theme';
import React from 'react';

const statusOptions = ['receivable', 'payable'] as FilterOption[];

interface PayFilterProps {
  onFilterChange: (filter: FilterOption) => void;
  setActiveFilter: (filter: FilterOption) => void;
  activeFilter: FilterOption;
}

export const PayFilter = ({
  onFilterChange,
  setActiveFilter,
  activeFilter,
}: PayFilterProps) => {
  const colors = theme.colors.light;

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <Filter
      options={statusOptions}
      active={activeFilter}
      onChange={handleFilterChange}
    />
  );
};
