'use client';

import { Center, Group, Loader, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { useAsync } from '@/hooks/useAsync';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { TTheme } from '@/types';

type Props = {
  insertValue: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onClose: () => void;
  onInsert: (themeId: number, description: string) => void;
};
export const InsertModal = ({ insertValue, isOpen, onChange, onClose, onInsert }: Props) => {
  const supabase = createClient();
  const [themes, setThemes] = useState<TTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<TTheme | null>(null);
  const [description, setDescription] = useState('');

  const fetchThemes = useCallback(async () => {
    const { data, error } = await supabase.from('themes').select('id, name').order('id', { ascending: true });
    if (error) throw error;
    setThemes(data as TTheme[]);
  }, [supabase]);

  const { isLoading, run: handleFetchThemes } = useAsync(fetchThemes);

  useEffect(() => {
    handleFetchThemes();
  }, [handleFetchThemes]);

  const handleClose = () => {
    onClose();
    setSelectedTheme(null);
    setDescription('');
    onChange('');
  };

  return (
    <Modal opened={isOpen} title='サブテーマ追加' onClose={handleClose}>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          {themes.length > 0 && (
            <Select
              clearable
              data={themes.map((theme) => ({ label: theme.name, value: theme.id.toString() }))}
              label='テーマ'
              onChange={(value) => setSelectedTheme(themes.find((theme) => theme.id.toString() === value) ?? null)}
            />
          )}
          <TextInput
            autoFocus
            label='サブテーマ名'
            mt={10}
            value={insertValue}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
          <Textarea
            autoFocus
            label='説明テキスト'
            mt={10}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Group justify='flex-end' mt='md'>
            <DefaultButton color='primary' variant='subtle' onClick={handleClose}>
              キャンセル
            </DefaultButton>
            <DefaultButton
              color='primary'
              disabled={insertValue === '' || selectedTheme === null}
              onClick={() => {
                onInsert(selectedTheme?.id ?? 0, description);
                setDescription('');
              }}
            >
              サブテーマを追加
            </DefaultButton>
          </Group>
        </>
      )}
    </Modal>
  );
};
