import React, { useEffect } from 'react'
import { firebaseSignOut } from '~/utilities/FirebaseAuth'
import { usePageTitle } from '~/hooks/usePageTitle'
import { useFullWideLoading } from '~/hooks/useFullWideLoading'
import ArticleInner from '~/components/ArticleInner'

const SignOutPage: React.FC = () => {
  usePageTitle('サインアウト')
  const { setFullWideLoading } = useFullWideLoading(true)

  useEffect(() => {
    // サインアウト処理
    firebaseSignOut().finally(() => {
      setFullWideLoading(false)
    })
  }, [setFullWideLoading])

  return (
    <ArticleInner>
      <h1>サインアウト</h1>

      <p>サインアウト中です。そのままお待ち下さい。</p>
    </ArticleInner>
  )
}

export default SignOutPage
