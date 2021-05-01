import React from 'react';
import { Story, Meta } from '@storybook/react';
import Rating from './Rating';

type RatingProps = React.ComponentProps<typeof Rating>;

export default {
  title: 'Rating',
  component: Rating,
  argTypes: {
    rating: { control: 'text' },
  },
} as Meta;

const Template: Story<RatingProps> = (args) => <Rating {...args} />;

export const G = Template.bind({});
G.args = {
  rating: 'G',
};

export const PG = Template.bind({});
PG.args = {
  rating: 'PG',
};

export const M = Template.bind({});
M.args = {
  rating: 'M',
};

export const MA15 = Template.bind({});
MA15.args = {
  rating: 'MA15+',
};

export const R18 = Template.bind({});
R18.args = {
  rating: 'R18+',
};

export const CTC = Template.bind({});
CTC.args = {
  rating: 'CTC',
};

export const Unknown = Template.bind({});
Unknown.args = {
  rating: 'XYZ',
};
