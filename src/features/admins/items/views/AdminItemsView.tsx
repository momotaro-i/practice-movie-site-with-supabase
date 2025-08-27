'use client';
import { Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { ItemsTable } from '@/features/admins/items/components/ItemsTable';
import { useGetItems } from '@/features/admins/items/hooks/useGetItems';
import { InsertModal } from '@/features/admins/subThemes/components/InsertModal';

export const AdminItemsView = () => {
  const supabase = createClient();
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [insertValue, setInsertValue] = useState('');
  const { handleGetItems, isLoading, items } = useGetItems();

  const handleInsertTheme = async (themeId: number, description: string) => {
    const { error } = await supabase.from('collections').insert({ title: insertValue, theme_id: themeId, description });
    if (error) throw error;
    setInsertModalOpen(false);
    setInsertValue('');
    handleGetItems();
  };

  useEffect(() => {
    handleGetItems();
  }, [handleGetItems]);

  return (
    <div>
      <Group justify='space-between' mb='md'>
        <Title order={2}>作品管理</Title>
        <DefaultButton
          color='primary'
          onClick={() => {
            setInsertModalOpen(true);
            setInsertValue('');
          }}
        >
          作品を追加
        </DefaultButton>
      </Group>
      <ItemsTable handleGetItems={handleGetItems} isLoading={isLoading} items={items} />
      <InsertModal
        insertValue={insertValue}
        isOpen={insertModalOpen}
        onChange={setInsertValue}
        onClose={() => setInsertModalOpen(false)}
        onInsert={handleInsertTheme}
      />
    </div>
  );
};
