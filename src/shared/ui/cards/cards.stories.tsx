import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Cards } from './cards'

const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Cards>

export const Default: Story = {
  args: {
    children: <p style={{ color: 'white' }}>Это карточка</p>,
  },
}

export const WithMultipleElements: Story = {
  args: {
    children: (
      <>
        <h4 style={{ margin: 0, color: 'white' }}>Заголовок</h4>
        <p style={{ margin: 0, color: '#aaa' }}>Описание карточки</p>
      </>
    ),
  },
}
