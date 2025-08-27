import { Table, Text } from '@mantine/core';

type Props = {
  selectedColumns: string[];
};

export const ItemsTableHeader = ({ selectedColumns }: Props) => {
  return (
    <Table.Thead>
      <Table.Tr>
        {selectedColumns.includes('id') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              id
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('image') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              サムネイル
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('theme') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              テーマ名
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('sub_theme') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              サブテーマ名
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('title') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              タイトル
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('description') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              詳細テキスト
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('copyright') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              コピーライト
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('platform') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              プラットホーム
            </Text>
          </Table.Th>
        )}
        {selectedColumns.includes('platform_url') && (
          <Table.Th>
            <Text fw={500} fz='xs'>
              url
            </Text>
          </Table.Th>
        )}
        <Table.Th>
          <Text fw={500} fz='xs'>
            操作
          </Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};
