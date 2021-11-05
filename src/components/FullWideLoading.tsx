import React from 'react'
import { createPortal } from 'react-dom'
import '~/styles/components/full-wide-loading.scss'

const FullWideLoading: React.FC = () =>
  createPortal(<div className='full-wide-loading' />, document.getElementById('loading') as Element)

export default FullWideLoading
