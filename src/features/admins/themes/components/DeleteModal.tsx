import { Flex, Group, Modal, Text } from '@mantine/core';

import { DefaultButton } from '@/components/buttons/DefaultButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedThemeName: string;
};
export const DeleteModal = ({ isOpen, onClose, onDelete, selectedThemeName }: Props) => {
  return (
    <Modal opened={isOpen} title='テーマの削除' onClose={onClose}>
      <Text c='black'>「{selectedThemeName}」を削除しますか？</Text>
      <Flex align='flex-start' gap='xs' mt={10}>
        <Text c='red' lh={1.5} size='xs' style={{ flexShrink: 0 }}>
          ⚠️:
        </Text>
        <Text c='red' lh={1.5} size='xs'>
          このテーマが現在公開されている場合、削除により公開状況に重大な影響が出る可能性があります。
          <br />
          この操作は取り消すことができません。
        </Text>
      </Flex>
      <Group justify='flex-end' mt='md'>
        <DefaultButton color='primary' variant='subtle' onClick={onClose}>
          キャンセル
        </DefaultButton>
        <DefaultButton color='primary' onClick={onDelete}>
          削除を実行
        </DefaultButton>
      </Group>
    </Modal>
  );
};
