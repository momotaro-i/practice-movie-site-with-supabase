import { notifications } from '@mantine/notifications';
import React from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export const showSuccessNotification = (message: string) => {
  notifications.show({
    message,
    position: 'bottom-right',
    icon: React.createElement(FaCheck, { color: '#fff' }),
    autoClose: 5000,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.white,
        padding: '10px 10px',
      },
      description: {
        whiteSpace: 'pre-wrap',
      },
      icon: {
        backgroundColor: '#12b886',
        marginRight: '10px',
      },
    }),
  });
};

export const showErrorNotification = (message: string) => {
  notifications.show({
    message,
    position: 'bottom-right',
    icon: React.createElement(FaExclamationTriangle, { color: '#fff' }),
    autoClose: 5000,
    color: 'red',
    styles: (theme) => ({
      root: {
        backgroundColor: theme.white,
        padding: '10px 10px',
      },
      description: {
        whiteSpace: 'pre-wrap',
      },
      icon: {
        backgroundColor: '#fa5252',
        marginRight: '10px',
      },
    }),
  });
};
