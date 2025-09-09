'use client';
import { Group, Title } from '@mantine/core';
import { useState } from 'react';

import { useAsync } from '@/hooks/useAsync';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { InsertModal } from '@/features/admins/items/components/InsertModal';
import { ItemsTable } from '@/features/admins/items/components/ItemsTable';
import { useFetcher } from '@/features/admins/items/hooks/useFetcher';

export const AdminItemsView = () => {
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const { categories, getItems, isLoading, items, subThemes, themes } = useFetcher();

  const { isLoading: isLoadingItems, run: handleGetItems } = useAsync(async () => {
    const result = await getItems();
    return result;
  });

  return (
    <div>
      <Group justify='space-between' mb='md'>
        <Title order={2}>作品管理</Title>
        <DefaultButton
          color='primary'
          onClick={() => {
            setInsertModalOpen(true);
          }}
        >
          作品を追加
        </DefaultButton>
      </Group>
      <ItemsTable isLoading={isLoading || isLoadingItems} items={items} subThemes={subThemes} themes={themes} />
      <InsertModal
        categories={categories}
        handleGetItems={handleGetItems}
        isOpen={insertModalOpen}
        subThemes={subThemes}
        themes={themes}
        onClose={() => setInsertModalOpen(false)}
      />
    </div>
  );
};
