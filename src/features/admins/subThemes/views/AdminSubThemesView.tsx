'use client';
import { Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { InsertModal } from '@/features/admins/subThemes/components/InsertModal';
import { SubThemesTable } from '@/features/admins/subThemes/components/SubThemesTable';
import { useGetSubThemes } from '@/features/admins/subThemes/hooks/useGetSubThemes';

export const AdminSubThemesView = () => {
  const supabase = createClient();
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [insertValue, setInsertValue] = useState('');
  const { handleGetSubThemes, isLoading, subThemes } = useGetSubThemes();

  const handleInsertTheme = async (themeId: number, description: string) => {
    const { error } = await supabase.from('collections').insert({ title: insertValue, theme_id: themeId, description });
    if (error) throw error;
    setInsertModalOpen(false);
    setInsertValue('');
    handleGetSubThemes();
  };

  useEffect(() => {
    handleGetSubThemes();
  }, [handleGetSubThemes]);

  return (
    <div>
      <Group justify='space-between' mb='md'>
        <Title order={2}>サブテーマ管理</Title>
        <DefaultButton
          color='primary'
          onClick={() => {
            setInsertModalOpen(true);
            setInsertValue('');
          }}
        >
          サブテーマを追加
        </DefaultButton>
      </Group>
      <SubThemesTable handleGetSubThemes={handleGetSubThemes} isLoading={isLoading} subThemes={subThemes} />
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
