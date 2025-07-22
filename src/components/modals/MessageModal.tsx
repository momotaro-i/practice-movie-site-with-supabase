import { Modal, Text } from '@mantine/core';
type Props = {
  opened: boolean;
  handleClose: () => void;
  message: string;
};
export const MessageModal = ({ opened, handleClose, message, ...props }: Props) => {
  return (
    <Modal {...props} opened={opened} onClose={handleClose} title={'メッセージ'} centered>
      <Text>{message}</Text>
    </Modal>
  );
};
