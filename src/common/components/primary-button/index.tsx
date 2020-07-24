import React from 'react'
import { Button } from '@tarojs/components'
import styles from './index.module.scss'

type Props = {
  children: React.ReactNode,
  className: string,
}

const PrimaryButton = ({ children, className }: Props) => {
  return <Button className={`${styles.primaryButton} ${className}`}>{children}</Button>
}

export default PrimaryButton
