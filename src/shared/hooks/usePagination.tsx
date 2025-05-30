import { useState } from 'react'

type UsePaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
}: UsePaginationProps) => {
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

  return {
    isFocused,
    totalPages,
    getPageNumbers,
    handlePageChange,
    handleItemsPerPageChange,
  }
}
