'use client';

import { Flex, Group, Modal, Select, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { DefaultButton } from '@/components/buttons/DefaultButton';

import { platforms } from '@/features/admins/configs';
import { TRowData } from '@/features/admins/items/types';
import { TCollection, TTheme } from '@/types';

type Props = {
  form: UseFormReturnType<TRowData, (values: TRowData) => TRowData>;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (values: TRowData) => Promise<void>;
  subThemes: TCollection[];
  themes: TTheme[];
};
export const EditModal = ({ form, isOpen, onClose, onEdit, subThemes, themes }: Props) => {
  // サブテーマを変更したらテーマも変更する
  form.watch('sub_theme', ({ value }) => {
    const theme = themes.find((item) => item.id === Number(value))?.name;
    if (theme) {
      form.setFieldValue('theme', theme);
    }
  });

  return (
    <Modal opened={isOpen} size='xl' title='サブテーマ編集' onClose={onClose}>
      <form onSubmit={form.onSubmit(onEdit)}>
        <Flex direction='column' gap={20}>
          <TextInput autoFocus label='タイトル' {...form.getInputProps('title')} />

          <TextInput autoFocus label='テーマ' {...form.getInputProps('theme')} disabled />

          <Select
            data={subThemes.map((subTheme) => subTheme.title) ?? []}
            label='サブテーマ'
            {...form.getInputProps('sub_theme')}
          />

          <TextInput autoFocus label='カテゴリ' {...form.getInputProps('category')} />
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
            {/* <FileDropzone imageUrl={form.getInputProps('thumbnail_url').value} /> */}
          </div>
        </Flex>
        <Group justify='flex-end' mt='md'>
          <DefaultButton color='primary' variant='subtle' onClick={onClose}>
            キャンセル
          </DefaultButton>
          <DefaultButton color='primary' type='submit'>
            テーマを編集
          </DefaultButton>
        </Group>
      </form>
    </Modal>
  );
};
