'use client';
import { Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { InsertModal } from '@/features/admins/themes/components/InsertModal';
import { ThemesTable } from '@/features/admins/themes/components/ThemesTable';
import { useGetThemes } from '@/features/admins/themes/hooks/useGetThemes';

export const AdminThemesView = () => {
  const supabase = createClient();
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [insertValue, setInsertValue] = useState('');
  const { handleGetTheme, isLoading, themes } = useGetThemes();

  const handleInsertTheme = async () => {
    const { error } = await supabase.from('themes').insert({ name: insertValue });
    if (error) throw error;
    setInsertModalOpen(false);
    setInsertValue('');
    handleGetTheme();
  };

  useEffect(() => {
    handleGetTheme();
  }, [handleGetTheme]);

  return (
    <div>
      <Group justify='space-between' mb='md'>
        <Title order={2}>テーマ管理</Title>
        <DefaultButton
          color='primary'
          onClick={() => {
            setInsertModalOpen(true);
            setInsertValue('');
          }}
        >
          テーマを追加
        </DefaultButton>
      </Group>
      <ThemesTable handleGetTheme={handleGetTheme} isLoading={isLoading} themes={themes} />
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
