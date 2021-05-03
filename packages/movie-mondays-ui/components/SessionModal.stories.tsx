import React from 'react';
import { Story, Meta } from '@storybook/react';
import SessionModal from './SessionModal';

type SessionModalProps = React.ComponentProps<typeof SessionModal>;

export default {
  title: 'SessionModal',
  component: SessionModal,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
} as Meta;

const Template: Story<SessionModalProps> = (args) => <SessionModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  film: {
    id: 'the-courier',
    title: 'The Courier',
    rating: 'M',
    runtimeMinutes: 111,
  },
  session: {
    id: '190279',
    filmId: 'the-courier',
    date: '2021-05-01',
    time: 1815,
    isAllocatedSeating: true,
    isNoFreeTickets: false,
    isPreviewScreening: false,
    isSpecialEvent: false,
    isBabyFriendly: false,
    isSellingFast: true,
    isSoldOut: false,
  },
};
