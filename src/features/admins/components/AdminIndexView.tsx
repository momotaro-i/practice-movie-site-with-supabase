'use client';
import { Card, Center, Grid, GridCol, Text } from '@mantine/core';
import Link from 'next/link';

import { adminLinks } from '@/configs/links';

export const AdminIndexView = () => {
  return (
    <Center h='100%' w='100%'>
      <Grid>
        {adminLinks.map((item, index) => (
          <GridCol key={item.label} span={index === 0 ? 12 : 4}>
            <Card
              withBorder
              className='hover-opacity'
              component={Link}
              href={item.link}
              padding='lg'
              radius='md'
              shadow='sm'
            >
              <Text ta='center'>{item.label}</Text>
              <Text c='gray' mt={10} size='sm' ta='center'>
                {item.description}
              </Text>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Center>
  );
};
