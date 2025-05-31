import React from 'react'
import s from './pagination.module.scss'
import { SelectOptions } from '@/shared/types/select'
import { SelectComponent } from '@/shared/ui/select/SelectComponent'
import Icon from '@/shared/ui/icon/Icon'
import { usePagination } from '@/shared/hooks/usePagination'
import { clsx } from 'clsx'

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  defaultValue: string
  options: SelectOptions[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  defaultValue,
  options,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const { isFocused, totalPages, getPageNumbers, handlePageChange, handleItemsPerPageChange } =
    usePagination({
      totalItems,
      itemsPerPage,
      currentPage,
      onPageChange,
      onItemsPerPageChange,
    })
  return (
    <div className={s.paginationContainer}>
      <div className={clsx(s.pagination, isFocused ? 'focus' : '')}>
        <button
          className={currentPage === 1 ? s.disabled : ''}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon name={'arrow-back'} className={s.arrow} />
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={s.paginationEllipsis}>
                <Icon name={'ellipsis'} className={s.paginationEllipsis} />
              </span>
            ) : (
              <button
                className={clsx(s.paginationButton, page === currentPage ? s.active : '')}
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
          <Icon name={'arrow-forwards'} className={s.arrow} />
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
