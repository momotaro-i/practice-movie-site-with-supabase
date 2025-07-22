import { useCountStore } from '@/features/counter/store';
import { Button, Flex, Space } from '@mantine/core';

export const Counter = () => {
  const increment = useCountStore.use.increment();
  const decrement = useCountStore.use.decrement();
  const resetCount = useCountStore.use.resetCount();
  const count = useCountStore.use.count();
  return (
    <>
      <p>カウント: {count}</p>
      <Space h={12} />
      <Flex gap='xs'>
        <Button onClick={increment}>+ 1</Button>
        <Button onClick={decrement}>- 1</Button>
        <Button onClick={resetCount} color='#f55656'>
          reset
        </Button>
      </Flex>
    </>
  );
};
