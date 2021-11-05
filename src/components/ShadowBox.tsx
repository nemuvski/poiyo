import React from 'react'
import '~/styles/components/shadow-box.scss'

const ShadowBox: React.FC = ({ children }) => {
  return <div className='shadow-box'>{children}</div>
}

export default ShadowBox
