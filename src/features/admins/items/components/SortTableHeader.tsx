import { Center, Flex, Table, Text, UnstyledButton } from '@mantine/core';
import React from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
type Props = {
  children: React.ReactNode;
  onSort: () => void;
  reversed: boolean;
  sorted: boolean;
};
export const SortTableHeader = ({ children, onSort, reversed, sorted }: Props) => {
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Flex gap={4} justify='space-between'>
          <Text fw={500} fz='xs'>
            {children}
          </Text>
          <Center>
            {sorted ? reversed ? <FaSortUp size={10} /> : <FaSortDown size={10} /> : <FaSort size={10} />}
          </Center>
        </Flex>
      </UnstyledButton>
    </Table.Th>
  );
};
