'use client';

import { ActionIcon, Group, Image, Table, Text } from '@mantine/core';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import { TAdminItem } from '@/features/admins/items/types';

type Props = {
  handleDeleteTheme: () => void;
  handleEditTheme: () => void;
  items: TAdminItem[];
  selectedColumns: string[];
};

export const ItemsTableBody = ({ handleDeleteTheme, handleEditTheme, items, selectedColumns }: Props) => {
  return (
    <Table.Tbody>
      {items.map((item) => (
        <Table.Tr key={item.title}>
          {selectedColumns.includes('id') && <Table.Td w={40}>{item.id}</Table.Td>}
          {selectedColumns.includes('image') && (
            <Table.Td w={200}>
              <Image alt={item.title} height='auto' src={item.thumbnail_url} width='100%' />
            </Table.Td>
          )}
          {selectedColumns.includes('theme') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.sub_theme.theme.name}</Text>
            </Table.Td>
          )}
          {selectedColumns.includes('sub_theme') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.sub_theme.title}</Text>
            </Table.Td>
          )}
          {selectedColumns.includes('title') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.title}</Text>
            </Table.Td>
          )}
          {selectedColumns.includes('description') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.description}</Text>
            </Table.Td>
          )}

          {selectedColumns.includes('copyright') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.copyright}</Text>
            </Table.Td>
          )}
          {selectedColumns.includes('platform') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.platform}</Text>
            </Table.Td>
          )}
          {selectedColumns.includes('platform_url') && (
            <Table.Td w={200}>
              <Text fz='sm'>{item.platform_url}</Text>
            </Table.Td>
          )}
          <Table.Td w={120}>
            <Group gap='xs'>
              <ActionIcon aria-label='編集' c='gray' variant='subtle' onClick={() => handleEditTheme()}>
                <FaPencil />
              </ActionIcon>
              <ActionIcon aria-label='削除' color='gray' variant='subtle' onClick={() => handleDeleteTheme()}>
                <FaTrashAlt />
              </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};
