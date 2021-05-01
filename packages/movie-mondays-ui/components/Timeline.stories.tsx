import React from 'react';
import { Story, Meta } from '@storybook/react';
import Timeline from './Timeline';

type TimelineProps = React.ComponentProps<typeof Timeline>;

export default {
  title: 'Timeline',
  component: Timeline,
  argTypes: {
    now: { control: 'number' },
    doorsMinutes: { control: 'number' },
    trailersMinutes: { control: 'number' },
    runtimeMinutes: { control: 'number' },
    timeTrailers: { control: 'number' },
  },
} as Meta;

const Template: Story<TimelineProps> = (args) => <Timeline {...args} />;

export const Future = Template.bind({});
Future.args = {
  now: 1000,
  doorsMinutes: 10,
  trailersMinutes: 15,
  runtimeMinutes: 90,
  timeTrailers: 1300,
};

export const DoorsOpened = Template.bind({});
DoorsOpened.args = {
  now: 1255,
  doorsMinutes: 10,
  trailersMinutes: 15,
  runtimeMinutes: 90,
  timeTrailers: 1300,
};

export const TrailersStarted = Template.bind({});
TrailersStarted.args = {
  now: 1305,
  doorsMinutes: 10,
  trailersMinutes: 15,
  runtimeMinutes: 90,
  timeTrailers: 1300,
};

export const MovieStarted = Template.bind({});
MovieStarted.args = {
  now: 1330,
  doorsMinutes: 10,
  trailersMinutes: 15,
  runtimeMinutes: 90,
  timeTrailers: 1300,
};

export const Past = Template.bind({});
Past.args = {
  now: 1500,
  doorsMinutes: 10,
  trailersMinutes: 15,
  runtimeMinutes: 90,
  timeTrailers: 1300,
};
