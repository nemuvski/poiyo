import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import clsx from "clsx";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {Board} from "../libs/models/Board";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import "../styles/components/comment-form.scss";
import CommentsService from "../libs/services/CommentsService";
import {ModalContext} from "../contexts/ModalContext";
import CompactLoading from "./CompactLoading";
import {CommentListContext} from "../contexts/CommentListContext";

type Props = {
  board: Board;
};

// inputまたはtextareaのnameに相当する.
type CommentFormFields = {
  body: string;
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
  const { account } = useContext(AuthenticationContext);
  const { loadLatestPage, operatingComment, updateComment } = useContext(CommentListContext);
  const { closeModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
  });

  // プレビューで利用.
  const watchBody = watch('body', operatingComment ? operatingComment.body : '');

  const onSubmit = (data: CommentFormFields) => {
    if (!account) {
      console.error('アカウント情報がないため、投稿できませんでした。');
      return;
    }
    setLoading(true);

    // 操作対象のCommentオブジェクトが設定されているときは更新処理と判定.
    // ※CommentListContextを参照.
    if (operatingComment) {
      const editedComment = {...operatingComment};
      editedComment.body = data.body;
      updateComment(editedComment)
        .catch(error => {
          console.error('コメント更新に失敗しました。');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          closeModal();
        });
    } else {
      CommentsService.create(account.token, props.board.boardId, account.id, data.body)
        .then(() => {
          // 無事投稿できたら、最新のコメントを読み込みコメント一覧に反映する.
          loadLatestPage(props.board.boardId);
        })
        .catch(error => {
          console.error('コメント作成に失敗しました。');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          closeModal();
        });
    }
  };

  return (
    <>
      {loading
        ? <CompactLoading />
        : (
          <form
            className="comment-form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="comment-form__field">
              <label className="comment-form__field-label">コメント</label>
              <button
                className={clsx([{'is-black':!previewMode}])}
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? 'エディタモードへ切替' : 'プレビューモードへ切替'}
              </button>
              <textarea
                className={
                  clsx([
                    'comment-form__field-value',
                    {'is-invalid':errors.body},
                    {'is-hidden':previewMode},
                  ])
                }
                name="body"
                maxLength={500}
                defaultValue={operatingComment ? operatingComment.body : ''}
                ref={register(fieldRules.body)}
              />
              {previewMode && (
                <div
                  className={
                    clsx([
                      'md',
                      'comment-form__field-preview',
                    ])
                  }
                  dangerouslySetInnerHTML={convertMarkdownTextToHTML(watchBody)}
                  // プレビューの領域をクリックするとモードが切り替わる.
                  onClick={() => setPreviewMode(false)}
                />
              )}
              <p className="comment-form__field-help">500文字以内</p>
              {errors.body && <p className="comment-form__field-invalid">{ errors.body.message }</p>}
            </div>

            <div className="comment-form__actions">
              <button
                className="is-white"
                type="button"
                disabled={formState.isSubmitting}
                onClick={() => reset()}
              >
                {operatingComment ? '元に戻す' : 'クリア'}
              </button>
              <button
                type="submit"
                disabled={formState.isSubmitting}
              >
                内容を保存
              </button>
            </div>
          </form>
        )
      }
    </>
  );
}

export default CommentForm;
