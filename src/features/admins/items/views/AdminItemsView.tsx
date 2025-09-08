'use client';
import { Group, Title } from '@mantine/core';
import { useState } from 'react';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { InsertModal } from '@/features/admins/items/components/InsertModal';
import { ItemsTable } from '@/features/admins/items/components/ItemsTable';
import { useFetcher } from '@/features/admins/items/hooks/useFetcher';

export const AdminItemsView = () => {
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const { categories, isLoading, items, subThemes, themes } = useFetcher();

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
      <ItemsTable isLoading={isLoading} items={items} subThemes={subThemes} themes={themes} />
      <InsertModal
        categories={categories}
        isOpen={insertModalOpen}
        subThemes={subThemes}
        themes={themes}
        onClose={() => setInsertModalOpen(false)}
      />
    </div>
  );
};
