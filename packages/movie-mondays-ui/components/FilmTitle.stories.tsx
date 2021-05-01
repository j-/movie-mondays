import React from 'react';
import { Story, Meta } from '@storybook/react';
import FilmTitle from './FilmTitle';

type FilmTitleProps = React.ComponentProps<typeof FilmTitle>;

export default {
  title: 'FilmTitle',
  component: FilmTitle,
} as Meta;

const Template: Story<FilmTitleProps> = (args) => <FilmTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  film: {
    id: 'the-courier',
    title: 'The Courier',
    rating: 'M',
    runtimeMinutes: 111,
  },
};
