'use client';

import { Flex, Group, Modal, Select, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';

import { createClient } from '@/utils/supabase/client';

import { DefaultButton } from '@/components/buttons/DefaultButton';
import { FileDropzone } from '@/components/forms/FileDropzone';

import { platforms } from '@/features/admins/configs';
import { useThumbnailUpload } from '@/features/admins/items/hooks/useThumbnailUpload';
import { TCategory, TCollection, TTheme } from '@/types';

type Props = {
  categories: TCategory[];
  handleGetItems: () => Promise<any>;
  isOpen: boolean;
  onClose: () => void;
  subThemes: TCollection[];
  themes: TTheme[];
};
export const InsertModal = ({ categories, handleGetItems, isOpen, onClose, subThemes, themes }: Props) => {
  const supabase = createClient();

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      copyright: '',
      themeId: '',
      subThemeId: '',
      thumbnail_path: '',
      categoryId: '',
      platform: '',
      platform_url: '',
      file: null,
    },
    validate: {
      title: (value) => (value ? null : 'タイトルは必須です'),
      themeId: (value) => (value ? null : 'テーマは必須です'),
      subThemeId: (value) => (value ? null : 'サブテーマは必須です'),
      categoryId: (value) => (value ? null : 'カテゴリは必須です'),
      platform: (value) => (value ? null : 'プラットフォームは必須です'),
      platform_url: (value) => (value ? null : 'プラットフォームURLは必須です'),
      file: (value) => (value ? null : 'サムネイルは必須です'),
      description: (value) => (value ? null : '説明テキストは必須です'),
    },
    transformValues: (values) => {
      // 使わない変数を無視する
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { categoryId, file, subThemeId, themeId, thumbnail_path, ...rest } = values;

      return {
        ...rest,
        thumbnail_path: thumbnail_path || null,
        collection_id: Number(values.subThemeId),
      };
    },
  });

  const { handleSelectedFile, handleUpload } = useThumbnailUpload({ supabase, form });

  // テーマが選択されたらそのテーマに所属するサブテーマを取得
  const availableSubThemes = useMemo(() => {
    const selectedThemeId = form.getValues().themeId;
    if (!selectedThemeId) return [];
    return subThemes.filter((subTheme) => subTheme.theme_id === Number(selectedThemeId));
  }, [form, subThemes]);

  // モーダルを閉じる（フォームをリセット）
  const handleModalClose = () => {
    onClose();
    form.reset();
  };

  // 作品を追加
  const handleInsert = async () => {
    // 1. サムネイルを追加
    const thumbnailPath = await handleUpload();

    // 2. 作品を追加
    const values = form.getTransformedValues();

    const { data: newItem, error: insertError } = await supabase
      .from('items')
      .insert({ ...values, thumbnail_path: thumbnailPath })
      .select('id, collection_id');

    if (insertError) throw insertError;

    // 3. 中間テーブルにカテゴリとの関係を追加
    const categoryIds = form.getValues().categoryId; // 選択されたカテゴリID

    const rows = { item_id: newItem[0].id, category_id: categoryIds };

    const { error: linkError } = await supabase.from('items_categories').insert(rows);

    if (linkError) throw linkError;

    handleModalClose();
    handleGetItems();
  };

  return (
    <Modal opened={isOpen} size='xl' title='作品追加' onClose={handleModalClose}>
      {themes.length > 0 && subThemes.length > 0 && (
        <>
          <Flex direction='column' gap={20}>
            <Select
              data={themes.map((theme) => ({ value: theme.id.toString(), label: theme.name }))}
              label='テーマ'
              {...form.getInputProps('themeId')}
            />
            <Select
              data={availableSubThemes.map((subTheme) => ({ value: subTheme.id.toString(), label: subTheme.title }))}
              label='サブテーマ'
              {...form.getInputProps('subThemeId')}
            />

            <Select
              data={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
              label='カテゴリ'
              {...form.getInputProps('categoryId')}
            />
            <TextInput autoFocus label='タイトル' {...form.getInputProps('title')} />
            <Textarea autoFocus label='説明テキスト' {...form.getInputProps('description')} />
            <TextInput autoFocus label='コピーライト' {...form.getInputProps('copyright')} />
            <Select
              data={platforms.map((platform) => platform.name)}
              label='プラットフォーム'
              {...form.getInputProps('platform')}
              value={form.getInputProps('platform').value}
              onChange={(e) => {
                form.getInputProps('platform').onChange(e);
                form.setFieldValue('platform_url', platforms.find((item) => item.name === e)?.url || '');
              }}
            />
            <TextInput autoFocus label='プラットフォームURL' {...form.getInputProps('platform_url')} />
            <div>
              <Text c='black' fw={500} fz='sm'>
                サムネイル
              </Text>
              <FileDropzone onFileSelected={handleSelectedFile} />
            </div>
          </Flex>
          <Group justify='flex-end' mt='md'>
            <DefaultButton color='primary' variant='subtle' onClick={handleModalClose}>
              キャンセル
            </DefaultButton>
            <DefaultButton color='primary' onClick={handleInsert}>
              作品を追加
            </DefaultButton>
          </Group>
        </>
      )}
    </Modal>
  );
};
