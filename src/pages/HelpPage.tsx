import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSignOffMutation } from '~/stores/account/api'
import { useModal } from '~/hooks/useModal'
import { usePageTitle } from '~/hooks/usePageTitle'
import ArticleInner from '~/components/ArticleInner'
import ArticleSection from '~/components/ArticleSection'
import ArticleSectionContent from '~/components/ArticleSectionContent'
import SentryTracking from '~/utilities/SentryTracking'
import { firebaseSignOut } from '~/utilities/FirebaseAuth'
import { selectAccount } from '~/stores/account/selector'
import SignOffConfirmModal from '~/components/modals/SignOffConfirmModal'
import { ModalName } from '~/stores/modal/slice'

const HelpPage: React.FC = () => {
  usePageTitle('ヘルプ')
  const navigate = useNavigate()
  const account = useSelector(selectAccount)
  const { openModal, closeModal } = useModal(ModalName.SIGN_OFF_CONFIRM)
  const [signOff] = useSignOffMutation()

  const handleSignOffButtonClick = () => {
    if (!account || !account.token || !account.id) {
      SentryTracking.exception('アカウント情報がないため、退会処理は実行されませんでした。')
      return
    }
    signOff(account.id)
      .unwrap()
      .then(() => {
        firebaseSignOut()
      })
      .catch(() => {
        SentryTracking.exception('退会処理中に問題が発生したため、中断されました。')
      })
      .finally(() => {
        closeModal()
        navigate('/')
      })
  }

  return (
    <ArticleInner>
      <h1>ヘルプ</h1>

      <ArticleSection>
        <ArticleSectionContent>
          <h2>ボードやコメントで使えるマークダウン</h2>
          <p>制限をかけていますが、以下のものがご利用いただけます。</p>
          <ul>
            <li>段落</li>
            <li>改行</li>
            <li>太文字</li>
            <li>斜体</li>
            <li>取り消し線</li>
            <li>コード / インラインコード（シンタックスハイライトはされません）</li>
            <li>リスト</li>
            <li>引用</li>
            <li>リンク（デフォルトで別タブで開くようにしています）</li>
            <li>水平線</li>
          </ul>
          <p>class属性やstyle属性は削除されます。</p>
          <p>
            記述方法については{' '}
            <a href='https://ja.wikipedia.org/wiki/Markdown' target='_blank' rel='noreferrer noopener'>
              Markdown - Wikipedia
            </a>{' '}
            をご覧ください。
          </p>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection>
        <ArticleSectionContent>
          <h2>ボードとコメントの公開範囲</h2>
          <p>本サービスのユーザーであればボードとコメントが閲覧できますが、ユーザーでない場合は閲覧できません。</p>
          <p>機密情報等はトラブルに繋がるため、載せないようよろしくお願いいたします。</p>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection>
        <ArticleSectionContent>
          <h2>退会</h2>
          <p>
            退会するとアカウント情報が削除されます。作成したボードやコメントのデータは一時的に残りますが、しばらくすると削除されます。
          </p>
          <div className='align-center'>
            {account ? (
              <button className='is-red' type='button' onClick={() => openModal()}>
                退会する
              </button>
            ) : (
              <p>（サインイン済みの場合はこの画面で退会処理が可能です）</p>
            )}
          </div>
        </ArticleSectionContent>
      </ArticleSection>

      <SignOffConfirmModal cancelAction={() => closeModal()} okAction={() => handleSignOffButtonClick()} />
    </ArticleInner>
  )
}

export default HelpPage
