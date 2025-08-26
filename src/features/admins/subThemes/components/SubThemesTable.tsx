'use client';

import { ActionIcon, Group, Table } from '@mantine/core';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { DeleteModal } from '@/features/admins/subThemes/components/DeleteModal';
import { EditModal } from '@/features/admins/subThemes/components/EditModal';
import { TSubTheme } from '@/features/admins/subThemes/types';

type Props = {
  handleGetSubThemes: () => void;
  isLoading: boolean;
  subThemes: TSubTheme[];
};
export const SubThemesTable = ({ handleGetSubThemes, isLoading, subThemes }: Props) => {
  const supabase = createClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<TSubTheme | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 編集モーダルを開く
  const handleEditTheme = (theme: TSubTheme) => {
    setSelectedTheme(theme);
    setEditModalOpen(true);
    setEditValue(theme.title);
    setEditDescription(theme.description);
  };

  // 削除モーダルを開く
  const handleDeleteTheme = (theme: TSubTheme) => {
    setSelectedTheme(theme);
    setDeleteModalOpen(true);
  };

  //  編集処理の実装
  const handleConfirmEdit = async (value: string, description: string) => {
    const { error } = await supabase
      .from('collections')
      .update({ title: value, description })
      .eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetSubThemes();
    setEditModalOpen(false);
    setSelectedTheme(null);
    setEditValue('');
    setEditDescription('');
  };

  // 削除処理の実装
  const handleConfirmDelete = async () => {
    const { error } = await supabase.from('collections').delete().eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetSubThemes();
    setDeleteModalOpen(false);
    setSelectedTheme(null);
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>id</Table.Th>
            <Table.Th>テーマ名</Table.Th>
            <Table.Th>サブテーマ名</Table.Th>
            <Table.Th>テキスト</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {subThemes.map((subTheme) => (
            <Table.Tr key={subTheme.title}>
              <Table.Td w={40}>{subTheme.id}</Table.Td>
              <Table.Td>{subTheme.theme.name}</Table.Td>
              <Table.Td>{subTheme.title}</Table.Td>
              <Table.Td>{subTheme.description}</Table.Td>
              <Table.Td w={120}>
                <Group gap='xs'>
                  <ActionIcon aria-label='編集' c='gray' variant='subtle' onClick={() => handleEditTheme(subTheme)}>
                    <FaPencil />
                  </ActionIcon>
                  <ActionIcon
                    aria-label='削除'
                    color='gray'
                    variant='subtle'
                    onClick={() => handleDeleteTheme(subTheme)}
                  >
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
        editDescription={editDescription}
        editValue={editValue}
        isOpen={editModalOpen}
        themeName={selectedTheme?.theme.name ?? ''}
        onChange={setEditValue}
        onChangeDescription={setEditDescription}
        onClose={() => setEditModalOpen(false)}
        onEdit={() => handleConfirmEdit(editValue, editDescription)}
      />
      {/* 削除確認モーダル */}
      <DeleteModal
        isOpen={deleteModalOpen}
        selectedSubThemeName={selectedTheme?.title ?? ''}
        themeName={selectedTheme?.theme.name ?? ''}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};
