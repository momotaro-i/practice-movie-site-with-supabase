import { useForm } from '@mantine/form';
import { useState } from 'react';

import { TRowData } from '@/features/admins/items/types';

export const useEditModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TRowData, (values: TRowData) => TRowData>({
    // transformValues(values) {
    // },
  });

  // 編集モーダルを開く
  const handleModalToggle = (opened: boolean, record?: TRowData) => {
    setIsOpen(opened);

    if (opened && record) {
      form.setValues(record);
    }
  };

  const handleEdit = async (values: TRowData) => {
    console.log(values);
  };

  return {
    isOpen,
    handleModalToggle,
    form,
    handleEdit,
  };
};
