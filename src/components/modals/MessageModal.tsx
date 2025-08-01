import { Modal, Text } from '@mantine/core';
type Props = {
  handleClose: () => void;
  message: string;
  opened: boolean;
};
export const MessageModal = ({ handleClose, message, opened, ...props }: Props) => {
  return (
    <Modal {...props} centered opened={opened} title='メッセージ' onClose={handleClose}>
      <Text>{message}</Text>
    </Modal>
  );
};
