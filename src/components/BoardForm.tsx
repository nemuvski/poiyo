import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Board, buildBoardRequest } from '~/models/Board'
import { convertMarkdownTextToHTML } from '~/libs/DOMPurify'
import SentryTracking from '~/utilities/SentryTracking'
import { usePatchBoardMutation, usePostBoardMutation } from '~/stores/board/api'
import { useSelector } from 'react-redux'
import { selectAccount } from '~/stores/account/selector'
import { useFullWideLoading } from '~/hooks/useFullWideLoading'
import '~/styles/components/board-form.scss'

type Props = {
  board?: Board
}

type FormFields = {
  title: string
  body: string
}

type Preview = {
  isActive: boolean
  content: string
}

// 各フィールドのルール.
const fieldRules = {
  text: {
    required: {
      value: true,
      message: '必須項目です。',
    },
    maxLength: {
      value: 200,
      message: '文字数オーバーです。',
    },
  },
  body: {
    required: {
      value: true,
      message: '必須項目です。',
    },
    maxLength: {
      value: 1000,
      message: '文字数オーバーです。',
    },
  },
}

const BoardForm: React.FC<Props> = ({ board }) => {
  const history = useHistory()
  const [preview, setPreview] = useState<Preview>({ isActive: false, content: '' })
  const defaultValues: FormFields = {
    title: board ? board.title : '',
    body: board ? board.body : '',
  }
  const { register, handleSubmit, reset, formState, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues,
  })
  const account = useSelector(selectAccount)
  const { setFullWideLoading } = useFullWideLoading(false)
  const [postBoard] = usePostBoardMutation()
  const [patchBoard] = usePatchBoardMutation()

  useEffect(() => {
    if (board) {
      // 初期表示時にboardがundefinedでセットされないため、useEffectで入れる
      setValue('title', board.title)
      setValue('body', board.body)
    }
  }, [board])

  const onSubmit = (formFields: FormFields) => {
    if (!account) {
      console.error('アカウント情報がないため、ボード更新・作成ができませんでした。')
      SentryTracking.exception('アカウント情報がないため、ボード更新・作成ができませんでした。')
      return
    }

    const { title, body } = formFields
    setFullWideLoading(true)

    // コンポーネントの引数boardの有無で、作成か編集を判定する
    if (board) {
      patchBoard(buildBoardRequest(title, body, board.ownerAccountId, board.boardId))
        .unwrap()
        .then((updatedBoard) => {
          history.replace(`/board/${updatedBoard.boardId}`)
        })
        .catch(() => {
          console.error('ボード更新に失敗しました。')
          SentryTracking.exception('ボード更新に失敗しました。')
        })
        .finally(() => {
          setFullWideLoading(false)
        })
    } else {
      postBoard(buildBoardRequest(title, body, account.id))
        .unwrap()
        .then((createdBoard) => {
          history.replace(`/board/${createdBoard.boardId}`)
        })
        .catch(() => {
          console.error('ボード作成に失敗しました。')
          SentryTracking.exception('ボード作成に失敗しました。')
        })
        .finally(() => {
          setFullWideLoading(false)
        })
    }
  }

  return (
    <form className='board-form' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <div className='board-form__field'>
        <label className='board-form__field-label'>タイトル</label>
        <input
          className={clsx(['board-form__field-value', { 'is-invalid': formState.errors.title }])}
          type='text'
          {...register('title', fieldRules.text)}
        />
        <p className='board-form__field-help'>200文字以内</p>
        {formState.errors.title && <p className='board-form__field-invalid'>{formState.errors.title.message}</p>}
      </div>

      <div className='board-form__field'>
        <label className='board-form__field-label'>本文</label>
        <button
          className={clsx([{ 'is-black': !preview.isActive }])}
          type='button'
          onClick={handleSubmit(({ body }: FormFields) => {
            setPreview({ isActive: !preview.isActive, content: body })
          })}
        >
          {preview.isActive ? 'エディタモードへ切替' : 'プレビューモードへ切替'}
        </button>
        <textarea
          className={clsx([
            'board-form__field-value',
            'board-form__field-value--body',
            { 'is-invalid': formState.errors.body },
            { 'is-hidden': preview.isActive },
          ])}
          {...register('body', fieldRules.body)}
        />
        {preview.isActive && (
          <div
            className={clsx(['md', 'board-form__field-preview'])}
            dangerouslySetInnerHTML={convertMarkdownTextToHTML(preview.content)}
            // プレビューの領域をクリックするとモードが切り替わる.
            onClick={() => setPreview({ ...preview, isActive: false })}
          />
        )}
        <p className='board-form__field-help'>1000文字以内</p>
        {formState.errors.body && <p className='board-form__field-invalid'>{formState.errors.body.message}</p>}
      </div>

      <div className='board-form__actions'>
        <button
          className='is-white'
          type='button'
          disabled={formState.isSubmitting}
          onClick={() => {
            setPreview({ ...preview, isActive: false })
            reset(defaultValues)
          }}
        >
          {board ? '元に戻す' : 'クリア'}
        </button>
        <button type='submit' disabled={formState.isSubmitting}>
          内容を保存
        </button>
      </div>
    </form>
  )
}

export default BoardForm
