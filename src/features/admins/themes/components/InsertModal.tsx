'use client';

import { Group, Modal, TextInput } from '@mantine/core';

import { DefaultButton } from '@/components/buttons/DefaultButton';

type Props = {
  insertValue: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onClose: () => void;
  onInsert: () => void;
};
export const InsertModal = ({ insertValue, isOpen, onChange, onClose, onInsert }: Props) => {
  return (
    <Modal opened={isOpen} title='テーマ追加' onClose={onClose}>
      <TextInput autoFocus label='テーマ名' value={insertValue} onChange={(e) => onChange(e.currentTarget.value)} />
      <Group justify='flex-end' mt='md'>
        <DefaultButton color='primary' variant='subtle' onClick={onClose}>
          キャンセル
        </DefaultButton>
        <DefaultButton color='primary' disabled={insertValue === ''} onClick={onInsert}>
          テーマを追加
        </DefaultButton>
      </Group>
    </Modal>
  );
};
