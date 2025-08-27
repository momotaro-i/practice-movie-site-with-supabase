'use client';

import { Table, TextInput } from '@mantine/core';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { createClient } from '@/utils/supabase/client';

import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

import { ItemsTableBody } from '@/features/admins/items/components/ItemsTableBody';
import { ItemsTableHeader } from '@/features/admins/items/components/ItemsTableHeader';
import { TableColumnFilter } from '@/features/admins/items/components/TableColumnFilter';
import { useTableColumnFilter } from '@/features/admins/items/hooks/useTableColumnFilter';
import { TAdminItem } from '@/features/admins/items/types';
import { DeleteModal } from '@/features/admins/subThemes/components/DeleteModal';
import { EditModal } from '@/features/admins/subThemes/components/EditModal';
import { TSubTheme } from '@/features/admins/subThemes/types';

type Props = {
  handleGetItems: () => void;
  isLoading: boolean;
  items: TAdminItem[];
};

export const tableColumns = [
  { label: 'ID', value: 'id' },
  { label: 'サムネイル', value: 'image' },
  { label: 'テーマ', value: 'theme' },
  { label: 'サブテーマ', value: 'sub_theme' },
  { label: 'タイトル', value: 'title' },
  { label: '詳細テキスト', value: 'description' },
  { label: 'コピーライト', value: 'copyright' },
  { label: 'プラットフォーム', value: 'platform' },
  { label: 'URL', value: 'platform_url' },
];
export const ItemsTable = ({ handleGetItems, isLoading, items }: Props) => {
  const supabase = createClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<TSubTheme | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 編集モーダルを開く
  const handleEditTheme = () => {
    // setSelectedTheme(theme);
    // setEditModalOpen(true);
    // setEditValue(theme.title);
    // setEditDescription(theme.description);
  };

  // 削除モーダルを開く
  const handleDeleteTheme = () => {
    // setSelectedTheme(theme);
    // setDeleteModalOpen(true);
  };

  //  編集処理の実装
  const handleConfirmEdit = async (value: string, description: string) => {
    const { error } = await supabase
      .from('collections')
      .update({ title: value, description })
      .eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetItems();
    setEditModalOpen(false);
    setSelectedTheme(null);
    setEditValue('');
    setEditDescription('');
  };

  // 削除処理の実装
  const handleConfirmDelete = async () => {
    const { error } = await supabase.from('collections').delete().eq('id', selectedTheme?.id);
    if (error) throw error;
    handleGetItems();
    setDeleteModalOpen(false);
    setSelectedTheme(null);
  };

  // 表示するデータを絞り込む
  const { handleColumnChange, selectedColumns } = useTableColumnFilter();

  // 絞り込み機能
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchValue(value);
    filterData(items, value);
  };

  const filterData = (data: TAdminItem[], search: string) => {
    const query = search.toLowerCase().trim();

    console.log(query);
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <TableColumnFilter defaultSelectedColumns={selectedColumns} handleColumnChange={handleColumnChange} />
      <TextInput
        leftSection={<FaSearch size={16} />}
        mt={20}
        placeholder='Search by any field'
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Table.ScrollContainer maxHeight='calc(100vh - 120px)' minWidth={500} mt={20}>
        <Table stickyHeader>
          <ItemsTableHeader selectedColumns={selectedColumns} />
          <ItemsTableBody
            handleDeleteTheme={handleDeleteTheme}
            handleEditTheme={handleEditTheme}
            items={items}
            selectedColumns={selectedColumns}
          />
        </Table>
      </Table.ScrollContainer>
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
