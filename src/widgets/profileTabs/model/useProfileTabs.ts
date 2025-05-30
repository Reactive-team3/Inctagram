'use client'
import { useState } from 'react'

const TABS = [
  { value: 'general', label: 'General information' },
  { value: 'devices', label: 'Devices' },
  { value: 'account', label: 'Account Management' },
  { value: 'payments', label: 'My payments' },
]

export const useProfileTabs = () => {
  const [current, setCurrent] = useState(TABS[0].value)

  return {
    tabs: TABS,
    current,
    setCurrent,
  }
}
