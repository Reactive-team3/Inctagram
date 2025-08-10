'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import styles from './dropdownMenu.module.scss'

type DropdownMenuProps = {
  className?: string
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export const DropdownMenu = ({ className = '', onEditClick, onDeleteClick }: DropdownMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <>
      <div ref={buttonRef}>
        <Button
          as="button"
          variant="text"
          className={`${styles.buttonIcon} ${className}`}
          onClick={toggleMenu}
        >
          <Icon name="more-horizontal" className={styles.icon} />
        </Button>
      </div>
      {isMenuOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.edit}>
            <Icon name="edi-2-outline" />
            <Button as="button" variant="transparent" onClick={onEditClick}>
              Edit Post
            </Button>
          </div>
          <div className={styles.delete}>
            <Icon name="trash-outline" />
            <Button as="button" variant="transparent" onClick={onDeleteClick}>
              Delete Post
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
