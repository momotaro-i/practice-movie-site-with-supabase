'use client';

import { Group, Modal, TextInput } from '@mantine/core';

import { DefaultButton } from '@/components/buttons/DefaultButton';

type Props = {
  insertValue: string;
  isOpen: boolean;
  label: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onInsert: () => void;
};
export const InsertModal = ({ insertValue, isOpen, label, onChange, onClose, onInsert }: Props) => {
  return (
    <Modal opened={isOpen} title={`${label}追加`} onClose={onClose}>
      <TextInput autoFocus label={`${label}名`} value={insertValue} onChange={(e) => onChange(e.currentTarget.value)} />
      <Group justify='flex-end' mt='md'>
        <DefaultButton color='primary' variant='subtle' onClick={onClose}>
          キャンセル
        </DefaultButton>
        <DefaultButton color='primary' disabled={insertValue === ''} onClick={onInsert}>
          {`${label}を追加`}
        </DefaultButton>
      </Group>
    </Modal>
  );
};
