'use client';

import { Flex, Group, Modal, Text, Textarea, TextInput } from '@mantine/core';

import { DefaultButton } from '@/components/buttons/DefaultButton';

type Props = {
  editDescription: string;
  editValue: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onClose: () => void;
  onEdit: () => void;
  themeName: string;
};
export const EditModal = ({
  editDescription,
  editValue,
  isOpen,
  onChange,
  onChangeDescription,
  onClose,
  onEdit,
  themeName,
}: Props) => {
  return (
    <Modal opened={isOpen} title='サブテーマ編集' onClose={onClose}>
      <Text c='black' fw={500} size='sm'>
        テーマ名: {themeName}
      </Text>
      <TextInput
        autoFocus
        label='サブテーマ名'
        mt={5}
        value={editValue}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <Textarea
        autoFocus
        label='説明テキスト'
        mt={5}
        value={editDescription}
        onChange={(e) => onChangeDescription(e.currentTarget.value)}
      />
      <Flex align='flex-start' gap='xs' mt={10}>
        <Text c='red' lh={1.5} size='xs' style={{ flexShrink: 0 }}>
          ⚠️:
        </Text>
        <Text c='red' lh={1.5} size='xs'>
          このテーマが現在公開されている場合、変更により公開状況に影響が出る可能性があります。
        </Text>
      </Flex>
      <Group justify='flex-end' mt='md'>
        <DefaultButton color='primary' variant='subtle' onClick={onClose}>
          キャンセル
        </DefaultButton>
        <DefaultButton color='primary' disabled={editValue === ''} onClick={onEdit}>
          テーマを編集
        </DefaultButton>
      </Group>
    </Modal>
  );
};
