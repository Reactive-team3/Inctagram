'use client'

import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import styles from './datePicker.module.scss'
import Icon from '@/shared/ui/icon/Icon'
import { clsx } from 'clsx'

export default function CustomDatePicker() {
  const today = new DateObject()
  const [value, setValue] = useState<(DateObject | null)[]>([])
  const [error, setError] = useState<string | null>(null)
  const displayedValue = value.length === 0 ? undefined : value

  const handleChange = (range: (DateObject | null)[]) => {
    setValue(range)
    //Temporary
    if (range[0] || range[1]) {
      setError('Temporary error')
    }
  }

  const mapDays = ({ date }: { date: DateObject }) => {
    const now = new Date()
    const isToday =
      date.year === now.getFullYear() &&
      date.month.number === now.getMonth() + 1 &&
      date.day === now.getDate()

    const dayIndex = date.weekDay.index // 0 - Sun, 6 - Sat

    return {
      className: clsx({
        [styles.today]: isToday,
        [styles.weekend]: !isToday && (dayIndex === 0 || dayIndex === 6),
        [styles.weekday]: !isToday && dayIndex >= 1 && dayIndex <= 5,
      }),
    }
  }

  return (
    <div className={styles.container}>
      <h3>Date</h3>
      <div className={styles.datePickerWrapper}>
        <DatePicker
          inputClass={error ? styles.datePickerCustomInputError : styles.datePickerCustomInput}
          value={displayedValue}
          onChange={handleChange}
          range
          format="DD/MM/YYYY"
          weekStartDayIndex={1}
          mapDays={mapDays}
          placeholder={today.format('DD/MM/YYYY')}
          headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
          arrow={false}
          // showOtherDays
        />
        <Icon name="calendar-outline" className={styles.icon} />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}
