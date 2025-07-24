import { Center, Loader, Overlay } from '@mantine/core';

type Props = {
  backgroundColor?: string;
  isHeader?: boolean;
  opacity?: number;
};
export const FullScreenLoader = ({ backgroundColor = '#fff', isHeader = true, opacity = 0.75 }: Props) => {
  return (
    <Overlay
      fixed
      backgroundOpacity={opacity}
      blur={1}
      color={backgroundColor}
      h={isHeader ? 'calc(100vh - 60px)' : '100vh'}
      mt={isHeader ? 60 : 0}
      zIndex={1000}
    >
      <Center h='100%' w='100vw'>
        <Loader color='blue' size='lg' />
      </Center>
    </Overlay>
  );
};
