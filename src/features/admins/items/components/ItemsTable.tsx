'use client';

import { ActionIcon, Box, Center, Group, Loader, MultiSelect } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import { getPublicThumbUrl } from '@/utils/fetch/thumb';

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
  // items からテーブル描画用の初期配列を生成
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

  // テーブルに実際に表示するレコード（フィルタに応じて変動）
  const [records, setRecords] = useState<TRowData[]>([]);

  // ---- 以下、各種フィルタ用の状態 ----
  // テーマ/サブテーマ/タイトル/カテゴリ/プラットフォームの選択値と、候補一覧を保持
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [allPlatforms, setAllPlatforms] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // items から初期レコードとフィルタ候補を準備する
  useEffect(() => {
    // 初期レコードを設定
    setRecords(initialRecords);

    // 各フィールドの一意な値を取得
    const uniqueTitles = [...new Set(initialRecords.map((record) => record.title))];
    const uniqueCategories = [...new Set(initialRecords.map((record) => record.category))];
    const uniquePlatforms = [...new Set(initialRecords.map((record) => record.platform))];

    // マルチセレクトの候補に反映
    setAllTitles(uniqueTitles);
    setAllCategories(uniqueCategories);
    setAllPlatforms(uniquePlatforms);
  }, [initialRecords]);

  // 選択中のフィルタ条件が変わったら、records を絞り込む
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

  // 列に表示するデータを絞り込む
  // 列の表示/非表示を管理するカスタムフック
  const { handleColumnChange, selectedColumns } = useTableColumnFilter();

  // 作品の編集モーダルの表示/非表示を管理するカスタムフック
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
                accessor: 'thumbnail_path',
                title: 'サムネイル',
                width: 150,
                render: ({ thumbnail_path, title }) => {
                  const url = getPublicThumbUrl(thumbnail_path);
                  return (
                    <Box style={{ aspectRatio: '300 / 200', position: 'relative' }} w={120}>
                      <Image fill alt={title} src={url} style={{ objectFit: 'contain' }} />
                    </Box>
                  );
                },
                hidden: !selectedColumns.includes('thumbnail_path'),
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
                render: ({ copyright }) => `${copyright || ''}`,
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
                titleStyle: () => ({ backgroundColor: 'white' }),
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
