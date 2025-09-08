'use client';

import { ActionIcon, Box, Center, Group, Image, Loader, MultiSelect } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import { createClient } from '@/utils/supabase/client';

import { EditModal } from '@/features/admins/items/components/EditModal';
import { TableColumnFilter } from '@/features/admins/items/components/TableColumnFilter';
import { useEditModal } from '@/features/admins/items/hooks/useEditModal';
import { useTableColumnFilter } from '@/features/admins/items/hooks/useTableColumnFilter';
import { TAdminItem, TRowData } from '@/features/admins/items/types';
import { TCollection, TTheme } from '@/types';

type Props = {
  isLoading: boolean;
  items: TAdminItem[];
  subThemes: TCollection[];
  themes: TTheme[];
};
export const ItemsTable = ({ isLoading, items, subThemes, themes }: Props) => {
  const initialRecords = useMemo(
    () =>
      items.map((item) => {
        const { categories, sub_theme, ...rest } = item;
        return {
          ...rest,
          category: categories[0]?.name ?? '',
          sub_theme: sub_theme.title,
          theme: sub_theme.theme.name,
        };
      }),
    [items]
  );

  const [records, setRecords] = useState<TRowData[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [allPlatforms, setAllPlatforms] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    setRecords(initialRecords);

    // 各フィールドの一意な値を取得
    const uniqueTitles = [...new Set(initialRecords.map((record) => record.title))];
    const uniqueCategories = [...new Set(initialRecords.map((record) => record.category))];
    const uniquePlatforms = [...new Set(initialRecords.map((record) => record.platform))];

    setAllTitles(uniqueTitles);
    setAllCategories(uniqueCategories);
    setAllPlatforms(uniquePlatforms);
  }, [initialRecords, supabase]);

  useEffect(() => {
    setRecords(
      initialRecords.filter(({ category, platform, sub_theme, theme, title }) => {
        if (selectedThemes.length && !selectedThemes.some((d) => d === theme)) return false;
        if (selectedSubThemes.length && !selectedSubThemes.some((d) => d === sub_theme)) return false;
        if (selectedTitles.length && !selectedTitles.some((d) => d === title)) return false;
        if (selectedCategories.length && !selectedCategories.some((d) => d === category)) return false;
        if (selectedPlatforms.length && !selectedPlatforms.some((d) => d === platform)) return false;

        return true;
      })
    );
  }, [selectedThemes, selectedSubThemes, selectedTitles, selectedCategories, selectedPlatforms, initialRecords]);

  // 表示するデータを絞り込む
  const { handleColumnChange, selectedColumns } = useTableColumnFilter();
  // 作品の編集
  const { form: editForm, handleEdit, handleModalToggle, isOpen } = useEditModal();

  return (
    <>
      <TableColumnFilter defaultSelectedColumns={selectedColumns} handleColumnChange={handleColumnChange} />

      {isLoading ? (
        <Center h='100%' mt={40}>
          <Loader c='primary' />
        </Center>
      ) : (
        <>
          <DataTable
            pinLastColumn
            withTableBorder
            height='calc(100vh - 180px)'
            mt={20}
            records={records}
            columns={[
              {
                accessor: 'id',
                render: ({ id }) => `${id}`,
                hidden: !selectedColumns.includes('id'),
              },
              {
                accessor: 'image_url',
                title: 'サムネイル',
                width: 150,
                render: ({ image_url, title }) => <Image alt={title} height='auto' src={image_url} width='150px' />,
                hidden: !selectedColumns.includes('image_url'),
              },
              {
                title: 'タイトル',
                accessor: 'title',
                render: ({ title }) => `${title}`,
                hidden: !selectedColumns.includes('title'),
                filter: (
                  <MultiSelect
                    clearable
                    searchable
                    comboboxProps={{ withinPortal: false }}
                    data={allTitles}
                    label='タイトル'
                    leftSection={<FaSearch size={16} />}
                    value={selectedTitles}
                    styles={{
                      wrapper: {
                        width: '300px',
                      },
                    }}
                    onChange={setSelectedTitles}
                  />
                ),
                filtering: selectedTitles.length > 0,
              },
              {
                title: 'テーマ',
                accessor: 'theme',
                render: ({ theme }) => `${theme}`,
                hidden: !selectedColumns.includes('theme'),
                filter: (
                  <MultiSelect
                    clearable
                    searchable
                    comboboxProps={{ withinPortal: false }}
                    data={themes.map((theme) => theme.name) || []}
                    label='テーマ'
                    leftSection={<FaSearch size={16} />}
                    value={selectedThemes}
                    styles={{
                      wrapper: {
                        width: '300px',
                      },
                    }}
                    onChange={setSelectedThemes}
                  />
                ),
                filtering: selectedThemes.length > 0,
              },
              {
                title: 'サブテーマ',
                accessor: 'sub_theme',
                render: ({ sub_theme }) => `${sub_theme}`,
                hidden: !selectedColumns.includes('sub_theme'),
                filter: (
                  <MultiSelect
                    clearable
                    searchable
                    comboboxProps={{ withinPortal: false }}
                    data={subThemes.map((subTheme) => subTheme.title) || []}
                    label='サブテーマ'
                    leftSection={<FaSearch size={16} />}
                    value={selectedSubThemes}
                    styles={{
                      wrapper: {
                        width: '300px',
                      },
                    }}
                    onChange={setSelectedSubThemes}
                  />
                ),
                filtering: selectedSubThemes.length > 0,
              },
              {
                title: 'カテゴリ',
                accessor: 'category',
                render: ({ category }) => `${category}`,
                hidden: !selectedColumns.includes('category'),
                filter: (
                  <MultiSelect
                    clearable
                    searchable
                    comboboxProps={{ withinPortal: false }}
                    data={allCategories}
                    label='カテゴリ'
                    leftSection={<FaSearch size={16} />}
                    value={selectedCategories}
                    styles={{
                      wrapper: {
                        width: '300px',
                      },
                    }}
                    onChange={setSelectedCategories}
                  />
                ),
                filtering: selectedCategories.length > 0,
              },
              {
                title: '作品詳細テキスト',
                accessor: 'description',
                render: ({ description }) => `${description}`,
                hidden: !selectedColumns.includes('description'),
              },
              {
                title: 'コピーライト',
                accessor: 'copyright',
                render: ({ copyright }) => `${copyright}`,
                hidden: !selectedColumns.includes('copyright'),
              },
              {
                title: 'プラットフォーム',
                accessor: 'platform',
                render: ({ platform }) => `${platform}`,
                hidden: !selectedColumns.includes('platform'),
                filter: (
                  <MultiSelect
                    clearable
                    searchable
                    comboboxProps={{ withinPortal: false }}
                    data={allPlatforms}
                    label='プラットフォーム'
                    leftSection={<FaSearch size={16} />}
                    value={selectedPlatforms}
                    styles={{
                      wrapper: {
                        width: '300px',
                      },
                    }}
                    onChange={setSelectedPlatforms}
                  />
                ),
                filtering: selectedPlatforms.length > 0,
              },
              {
                title: 'URL',
                accessor: 'platform_url',
                render: ({ platform_url }) => `${platform_url}`,
                hidden: !selectedColumns.includes('platform_url'),
              },
              {
                accessor: 'actions',
                title: <Box>操作</Box>,
                width: '0%',
                cellsStyle: () => ({ backgroundColor: 'white' }),
                render: (record) => (
                  <Group gap={4} wrap='nowrap'>
                    <ActionIcon
                      aria-label='編集'
                      c='gray'
                      variant='subtle'
                      onClick={() => handleModalToggle(true, record)}
                    >
                      <FaPencil />
                    </ActionIcon>
                    <ActionIcon aria-label='削除' color='gray' variant='subtle'>
                      <FaTrashAlt />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
          />
          <EditModal
            form={editForm}
            isOpen={isOpen}
            subThemes={subThemes}
            themes={themes}
            onClose={() => handleModalToggle(false)}
            onEdit={handleEdit}
          />
        </>
      )}
    </>
  );
};
