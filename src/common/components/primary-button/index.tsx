import React from 'react'
import { Button, ITouchEvent } from '@tarojs/components'
import styles from './index.module.scss'

type Props = {
  children: React.ReactNode,
  onClick?: (event: ITouchEvent) => any,
  className?: string,
}

const PrimaryButton = ({ onClick, children, className }: Props) => {
  return <Button onClick={onClick} className={`${styles.primaryButton} ${className}`}>{children}</Button>
}

export default PrimaryButton
