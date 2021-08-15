import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Board } from '../models/Board';
import { convertMarkdownTextToHTML } from '../libs/DOMPurify';
import CommentsService from '../services/CommentsService';
import CompactLoading from './CompactLoading';
import { CommentListContext } from '../contexts/CommentListContext';
import SentryTracking from '../utilities/SentryTracking';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import { useModal } from '../hooks/useModal';
import '../styles/components/comment-form.scss';

type Props = {
  board: Board;
};

// inputまたはtextareaのnameに相当する.
type FormFields = {
  body: string;
};

type Preview = {
  isActive: boolean;
  content: string;
};

// 各フィールドのルール.
const fieldRules = {
  body: {
    required: {
      value: true,
      message: '必須項目です。',
    },
    maxLength: {
      value: 500,
      message: '文字数オーバーです。',
    },
  },
};

const CommentForm: React.FC<Props> = (props: Props) => {
  const account = useSelector(selectAccount);
  const { loadLatestPage, operatingComment, updateComment } = useContext(CommentListContext);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<Preview>({ isActive: false, content: '' });
  const { closeModal } = useModal();
  const { register, handleSubmit, reset, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: {
      body: operatingComment ? operatingComment.body : '',
    } as FormFields,
  });

  const onSubmit = (formFields: FormFields) => {
    if (!account) {
      SentryTracking.exception('アカウント情報がないため、コメント更新・削除ができませんでした。');
      return;
    }
    setLoading(true);

    // 操作対象のCommentオブジェクトが設定されているときは更新処理と判定.
    // ※CommentListContextを参照.
    if (operatingComment) {
      const editedComment = { ...operatingComment };
      editedComment.body = formFields.body;
      updateComment(editedComment)
        .catch((error) => {
          SentryTracking.exception('コメント更新に失敗しました。');
          SentryTracking.exception(error);
        })
        .finally(() => {
          setLoading(false);
          closeModal();
        });
    } else {
      CommentsService.create(account.token, props.board.boardId, account.id, formFields.body)
        .then(() => {
          // 無事投稿できたら、最新のコメントを読み込みコメント一覧に反映する.
          loadLatestPage(props.board.boardId);
        })
        .catch((error) => {
          SentryTracking.exception('コメント作成に失敗しました。');
          SentryTracking.exception(error);
        })
        .finally(() => {
          setLoading(false);
          closeModal();
        });
    }
  };

  return (
    <>
      {loading ? (
        <CompactLoading />
      ) : (
        <form className='comment-form' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='comment-form__field'>
            <label className='comment-form__field-label'>コメント</label>
            <button
              className={clsx([{ 'is-black': !preview.isActive }])}
              type='button'
              onClick={handleSubmit(({ body }: FormFields) => {
                setPreview({ isActive: !preview.isActive, content: body });
              })}
            >
              {preview.isActive ? 'エディタモードへ切替' : 'プレビューモードへ切替'}
            </button>
            <textarea
              className={clsx([
                'comment-form__field-value',
                { 'is-invalid': formState.errors.body },
                { 'is-hidden': preview.isActive },
              ])}
              {...register('body', fieldRules.body)}
            />
            {preview.isActive && (
              <div
                className={clsx(['md', 'comment-form__field-preview'])}
                dangerouslySetInnerHTML={convertMarkdownTextToHTML(preview.content)}
                // プレビューの領域をクリックするとモードが切り替わる.
                onClick={() => setPreview({ ...preview, isActive: false })}
              />
            )}
            <p className='comment-form__field-help'>500文字以内</p>
            {formState.errors.body && <p className='comment-form__field-invalid'>{formState.errors.body.message}</p>}
          </div>

          <div className='comment-form__actions'>
            <button
              className='comment-form__button comment-form__button--reset is-white'
              type='button'
              disabled={formState.isSubmitting}
              onClick={() => {
                setPreview({ ...preview, isActive: false });
                reset();
              }}
            >
              {operatingComment ? '元に戻す' : 'クリア'}
            </button>
            <button
              className='comment-form__button comment-form__button--submit'
              type='submit'
              disabled={formState.isSubmitting}
            >
              内容を保存
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CommentForm;
