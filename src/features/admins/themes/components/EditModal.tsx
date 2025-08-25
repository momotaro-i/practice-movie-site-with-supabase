'use client';

import { Flex, Group, Modal, Text, TextInput } from '@mantine/core';

import { DefaultButton } from '@/components/buttons/DefaultButton';

type Props = {
  editValue: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onClose: () => void;
  onEdit: () => void;
};
export const EditModal = ({ editValue, isOpen, onChange, onClose, onEdit }: Props) => {
  return (
    <Modal opened={isOpen} title='テーマ編集' onClose={onClose}>
      <TextInput autoFocus label='テーマ名' value={editValue} onChange={(e) => onChange(e.currentTarget.value)} />
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
          編集を実行
        </DefaultButton>
      </Group>
    </Modal>
  );
};
