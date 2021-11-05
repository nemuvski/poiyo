import React from 'react'
import '~/styles/components/shadow-box.scss'

type Props = {
  children?: React.ReactNode
}

const ShadowBox: React.FC<Props> = ({ children }) => {
  return <div className='shadow-box'>{children}</div>
}

export default ShadowBox
