'use client';

import { ActionIcon, Group, Table } from '@mantine/core';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { DeleteModal } from '@/features/admins/components/DeleteModal';
import { EditModal } from '@/features/admins/components/EditModal';
import { TTheme } from '@/types';

type Props = {
  handleGetTheme: () => void;
  isLoading: boolean;
  themes: TTheme[];
};
export const ThemesTable = ({ handleGetTheme, isLoading, themes }: Props) => {
  const supabase = createClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<TTheme | null>(null);
  const [editValue, setEditValue] = useState('');

  // 編集モーダルを開く
  const handleEditTheme = (theme: TTheme) => {
    setSelectedTheme(theme);
    setEditModalOpen(true);
    setEditValue(theme.name);
  };

  // 削除モーダルを開く
  const handleDeleteTheme = (theme: TTheme) => {
    setSelectedTheme(theme);
    setDeleteModalOpen(true);
  };

  //  編集処理の実装
  const handleConfirmEdit = async (value: string) => {
    const { error } = await supabase.from('themes').update({ name: value }).eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetTheme();
    setEditModalOpen(false);
    setSelectedTheme(null);
    setEditValue('');
  };

  // 削除処理の実装
  const handleConfirmDelete = async () => {
    const { error } = await supabase.from('themes').delete().eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetTheme();
    setDeleteModalOpen(false);
    setSelectedTheme(null);
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>id</Table.Th>
            <Table.Th>テーマ名</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {themes.map((theme) => (
            <Table.Tr key={theme.name}>
              <Table.Td w={40}>{theme.id}</Table.Td>
              <Table.Td>{theme.name}</Table.Td>
              <Table.Td w={120}>
                <Group gap='xs'>
                  <ActionIcon aria-label='編集' c='gray' variant='subtle' onClick={() => handleEditTheme(theme)}>
                    <FaPencil />
                  </ActionIcon>
                  <ActionIcon aria-label='削除' color='gray' variant='subtle' onClick={() => handleDeleteTheme(theme)}>
                    <FaTrashAlt />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {/* 編集確認モーダル */}
      <EditModal
        editValue={editValue}
        isOpen={editModalOpen}
        label='テーマ'
        onChange={setEditValue}
        onClose={() => setEditModalOpen(false)}
        onEdit={() => handleConfirmEdit(editValue)}
      />
      {/* 削除確認モーダル */}
      <DeleteModal
        isOpen={deleteModalOpen}
        label='テーマ'
        selectedThemeName={selectedTheme?.name ?? ''}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};
