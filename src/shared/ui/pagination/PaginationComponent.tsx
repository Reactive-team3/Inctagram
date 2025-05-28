import React, { useState } from 'react'
import s from './pagination.module.scss'
import { SelectOptions } from '@/shared/types/select'
import { SelectComponent } from '@/shared/ui/select/SelectComponent'
import ArrowLeft from '@/assets/icons/PaginationArrowLeft.svg'
import ArrowRight from '@/assets/icons/PaginationArrowRight.svg'
import Ellipsis from '@/assets/icons/Ellipsis.svg'
import Image from 'next/image'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  defaultValue: string
  options: SelectOptions[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  defaultValue,
  options,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getPageNumbers = () => {
    const pages = []
    const range = 1

    pages.push(1)

    if (currentPage <= 3) {
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        if (i <= totalPages) pages.push(i)
      }
      if (totalPages > 5) {
        pages.push('...')
      }
    } else {
      if (currentPage - range > 2) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - range)
      const end = Math.min(totalPages, currentPage + range)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i)
      }

      if (currentPage + range < totalPages - 1) {
        pages.push('...')
      }
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages)
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    onItemsPerPageChange(Number(value))
    setIsFocused(false)
    onPageChange(1)
  }

  return (
    <div className={s.paginationContainer}>
      <div className={`${s.pagination}  ${isFocused ? 'focus' : ''}`}>
        <button
          className={currentPage === 1 ? s.disabled : ''}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image src={ArrowLeft} alt={'arrow-left'} />
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={s.paginationEllipsis}>
                <Image src={Ellipsis} alt={'ellipsis'} />
              </span>
            ) : (
              <button
                className={`${s.paginationButton} ${page === currentPage ? s.active : ''} `}
                onClick={() => handlePageChange(page as number)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        <button
          className={currentPage === totalPages ? s.disabled : ''}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image src={ArrowRight} alt={'arrow-right'} />
        </button>
        <p>Show</p>
        <SelectComponent
          defaultValue={defaultValue}
          onChangeAction={e => handleItemsPerPageChange(e)}
          options={options}
        />
        <p>on page</p>
      </div>
    </div>
  )
}
