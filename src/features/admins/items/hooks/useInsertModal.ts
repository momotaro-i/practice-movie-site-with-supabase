import { useForm } from '@mantine/form';

import { TRowData } from '@/features/admins/items/types';

export const useInsertModal = () => {
  const form = useForm({
    initialValues: {
      image_file: '',
    },
  });

  const handleEdit = async (values: TRowData) => {
    console.log(values);
  };

  return {
    form,
    handleEdit,
  };
};
