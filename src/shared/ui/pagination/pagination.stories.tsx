import { PaginationComponent } from '@/shared/ui/pagination/PaginationComponent'
import type { Meta } from '@storybook/react'
import { useState } from 'react'

// const meta = {
//   title: 'Components/Pagination',
//   component: PaginationComponent,
//   tags: ['autodocs'],
//   argTypes: {
//     totalItems: {
//       control: { type: 'number', min: 0 },
//     },
//     itemsPerPage: {
//       options: [10, 20, 30, 50, 100],
//       control: { type: 'select' },
//     },
//   },
// } satisfies Meta<typeof PaginationComponent>
//
// export default meta
// type Story = StoryObj<typeof meta>

export default {
  title: 'Components/Navigation/Pagination',
  component: PaginationComponent,
} as Meta<typeof PaginationComponent>

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  return (
    <PaginationComponent
      totalItems={100}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      defaultValue={'10'}
      options={[
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
      ]}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  )
}

export const DefaultWithTwoPages = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  return (
    <PaginationComponent
      totalItems={2}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      defaultValue={'10'}
      options={[
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
      ]}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  )
}
