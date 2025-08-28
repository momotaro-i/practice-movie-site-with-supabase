import { useCallback, useEffect, useState } from 'react';

import { tableColumns } from '@/features/admins/configs';

export const useTableColumnFilter = () => {
  // 表示するデータを絞り込む
  const [selectedColumns, setSelectedColumns] = useState<string[]>(tableColumns.map((column) => column.value));
  const handleColumnChange = useCallback((value: string[]) => {
    // ローカルストレージで保存
    localStorage.setItem('selectedColumns', JSON.stringify(value));
    setSelectedColumns(value);
  }, []);

  useEffect(() => {
    const defaultSelectedColumns = localStorage.getItem('selectedColumns');
    if (defaultSelectedColumns) {
      handleColumnChange(JSON.parse(defaultSelectedColumns));
    } else {
      handleColumnChange(tableColumns.map((column) => column.value));
    }
  }, [handleColumnChange]);

  return { selectedColumns, handleColumnChange };
};
