import { Modal, ModalProps } from '@/shared/ui/modal/Modal'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

function Render(args: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <Button variant={'primary'} onClick={openModal}>
        Open Modal
      </Button>
      <Modal {...args} open={showModal} onClose={closeModal} modalTitle={args.modalTitle}></Modal>
    </>
  )
}

/**BaseModal */
export const BaseModal: Story = {
  args: {
    modalTitle: 'Modal title',
    children: (
      <div style={{ padding: '30px 24px 36px' }}>
        <Typography variant={'body1'} style={{ textAlign: 'left' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, error
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
          <Button variant={'outline'} style={{ padding: '6px 34px' }}>
            Yes
          </Button>
          <Button variant={'primary'} style={{ padding: '6px 37px' }}>
            No
          </Button>
        </div>
      </div>
    ),
  },
  render: Render,
}

export const SmallModal: Story = {
  args: {
    ...BaseModal.args,
    size: 'sm',
  },
  render: Render,
}
