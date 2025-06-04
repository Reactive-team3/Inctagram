// import React, { useEffect, useRef, useState } from 'react'
// import styles from './Recaptcha.module.scss'
//
// export interface RecaptchaProps {
//   siteKey: string
//   onVerify: (token: string) => void
//   onError?: (error: string) => void
//   onExpired?: () => void
// }
//
// export type RecaptchaState = 'default' | 'hover' | 'loading' | 'checked' | 'error' | 'expired'
//
// export const Recaptcha: React.FC<RecaptchaProps> = ({ siteKey, onVerify, onError, onExpired }) => {
//   const [state, setState] = useState<RecaptchaState>('default')
//   const [isHovered, setIsHovered] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('Please verify that you are not a robot')
//   const containerRef = useRef<HTMLDivElement>(null)
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null)
//
//   // Simulate reCAPTCHA verification process
//   const handleClick = () => {
//     if (state === 'checked' || state === 'loading') return
//
//     setState('loading')
//
//     // Simulate API call delay
//     timeoutRef.current = setTimeout(() => {
//       // Simulate random success/failure for demo
//       const isSuccess = Math.random() > 0.2 // 80% success rate
//
//       if (isSuccess) {
//         setState('checked')
//         const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//         onVerify(mockToken)
//
//         // Auto-expire after 2 minutes (like real reCAPTCHA)
//         timeoutRef.current = setTimeout(() => {
//           setState('expired')
//           onExpired?.()
//         }, 120000)
//       } else {
//         setState('error')
//         const errorMsg = 'Verification failed. Please try again.'
//         setErrorMessage(errorMsg)
//         onError?.(errorMsg)
//
//         // Reset to default after 3 seconds
//         timeoutRef.current = setTimeout(() => {
//           setState('default')
//         }, 3000)
//       }
//     }, 2000)
//   }
//
//   const handleRetry = () => {
//     setState('default')
//     setErrorMessage('Please verify that you are not a robot')
//   }
//
//   const handleMouseEnter = () => {
//     if (state === 'default') {
//       setIsHovered(true)
//     }
//   }
//
//   const handleMouseLeave = () => {
//     setIsHovered(false)
//   }
//
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [])
//
//   const getCurrentState = (): RecaptchaState => {
//     if (state !== 'default') return state
//     return isHovered ? 'hover' : 'default'
//   }
//
//   const renderCheckbox = () => {
//     const currentState = getCurrentState()
//
//     switch (currentState) {
//       case 'checked':
//         return (
//           <div className={styles.checkbox}>
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//               <path
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 fill="#34A853"
//               />
//             </svg>
//           </div>
//         )
//       case 'loading':
//         return (
//           <div className={styles.checkbox}>
//             <div className={styles.spinner} />
//           </div>
//         )
//       case 'error':
//         return (
//           <div className={styles.checkbox}>
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//               <path
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 fill="#EA4335"
//               />
//             </svg>
//           </div>
//         )
//       default:
//         return <div className={styles.checkbox} />
//     }
//   }
//
//   const renderText = () => {
//     const currentState = getCurrentState()
//
//     switch (currentState) {
//       case 'checked':
//         return "I'm not a robot"
//       case 'loading':
//         return 'Verifying...'
//       case 'error':
//         return errorMessage
//       case 'expired':
//         return 'Verification expired. Check the checkbox again.'
//       default:
//         return "I'm not a robot"
//     }
//   }
//
//   const renderLogo = () => {
//     return (
//       <div className={styles.logo}>
//         <div className={styles.logoPlaceholder}>
//           {/* Placeholder for your custom reCAPTCHA image */}
//           <span>reCAPTCHA</span>
//         </div>
//         <div className={styles.logoText}>
//           <div>Privacy - Terms</div>
//         </div>
//       </div>
//     )
//   }
//
//   return (
//     <div
//       ref={containerRef}
//       className={`${styles.recaptcha} ${styles[getCurrentState()]}`}
//       onClick={state === 'expired' ? handleRetry : handleClick}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className={styles.content}>
//         <div className={styles.checkboxContainer}>{renderCheckbox()}</div>
//         <div className={styles.text}>{renderText()}</div>
//       </div>
//       <div className={styles.logoContainer}>{renderLogo()}</div>
//     </div>
//   )
// }
//
// export const RecaptchaError = (message: string): Error => {
//   return new Error(`reCAPTCHA Error: ${message}`)
// }
//
// // export const validateRecaptchaToken = (token: string): boolean => {
// //   // Mock validation - in real implementation, verify with Google's API
// //   return token.startsWith('mock_token_') && token.length > 20
// // }
// //
// // export const resetRecaptcha = (recaptchaRef: React.RefObject<HTMLDivElement>): void => {
// //   // Mock reset function - in real implementation, call grecaptcha.reset()
// //   console.log('Resetting reCAPTCHA...')
// // }
