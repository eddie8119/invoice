import { Filter, FilterOption } from '@/components/core/Filter';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const statusOptions = ['所有', '已付', '未付', '逾期'] as FilterOption[];

interface InvoiceFilterProps {
  onFilterChange: (filter: FilterOption) => void;
}

export const InvoiceFilter = ({ onFilterChange }: InvoiceFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('所有');
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
      rightIcon={
        <Ionicons name="funnel-outline" size={20} color={colors.text} />
      }
    />
  );
};
