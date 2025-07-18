'use client'

import React, { useRef, useState } from 'react'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'

type Props = {
  onAddImageAction: (files: File[]) => void
  accept?: string
  maxFiles?: number
  children: React.ReactNode
}

export const ImageUploader = ({
  onAddImageAction,
  accept = 'image/jpeg,image/png',
  maxFiles = 10,
  children,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isErrorOpen, setIsErrorOpen] = useState(false)

  const handleClick = () => fileInputRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      return accept.includes(file.type) && file.size <= 20 * 1024 * 1024
    })

    const limitedFiles = validFiles.slice(0, maxFiles)
    if (limitedFiles.length > 0) {
      onAddImageAction(limitedFiles)
    } else {
      setIsErrorOpen(true)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <>
      <Modal open={isErrorOpen} onClose={() => setIsErrorOpen(false)} modalTitle="Error" size="sm">
        <Typography variant="body2">
          The photo must be less than 20 MB and in JPEG or PNG format
        </Typography>
        <Button onClick={() => setIsErrorOpen(false)}>Close</Button>
      </Modal>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={handleChange}
      />
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    </>
  )
}
