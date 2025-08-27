'use client';

import { Checkbox, Group } from '@mantine/core';

import { tableColumns } from '@/features/admins/items/configs';

type Props = {
  defaultSelectedColumns: string[];
  handleColumnChange: (value: string[]) => void;
};
export const TableColumnFilter = ({ defaultSelectedColumns, handleColumnChange }: Props) => {
  return (
    <div>
      {/* 表示するデータを絞り込む */}
      <Checkbox.Group
        defaultValue={defaultSelectedColumns}
        label='表示するデータを絞り込む'
        onChange={handleColumnChange}
      >
        <Group mt='xs'>
          {tableColumns.map((column) => (
            <Checkbox color='primary' key={column.value} label={column.label} value={column.value} />
          ))}
        </Group>
      </Checkbox.Group>
    </div>
  );
};
