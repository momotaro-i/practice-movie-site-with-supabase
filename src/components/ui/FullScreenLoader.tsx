import { Center, Loader, Overlay } from '@mantine/core';

type Props = {
  backgroundColor?: string;
  opacity?: number;
};
export const FullScreenLoader = ({ backgroundColor = '#fff', opacity = 0.75 }: Props) => {
  return (
    <Overlay fixed backgroundOpacity={opacity} blur={1} color={backgroundColor} zIndex={1000}>
      <Center h='100vh' w='100vw'>
        <Loader color='blue' size='lg' />
      </Center>
    </Overlay>
  );
};
