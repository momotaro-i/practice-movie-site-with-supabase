import { DefaultLinkButton } from '@/components/buttons/DefaultLinkButton';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { Space } from '@mantine/core';

const AboutPage = () => {
  return (
    <DefaultLayout>
      <Space h={50} />
      <DefaultLinkButton component='Link' href='/'>
        TOPへ戻る
      </DefaultLinkButton>
    </DefaultLayout>
  );
};

export default AboutPage;
