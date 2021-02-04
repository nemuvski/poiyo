import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import clsx from "clsx";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import BoardsService from "../libs/services/BoardsService";
import FullWideLoading from "./FullWideLoading";
import '../styles/components/board-form.scss';
import {Board, BoardLocationState} from "../libs/models/Board";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";

type Props = {
  board?: Board;
};

// inputまたはtextareaのnameに相当する.
type BoardFormFields = {
  title: string;
  body: string;
};

const BoardForm: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
    watch,
  } = useForm({
    // formState.isValidを使うため.
    mode: 'onChange',
  });
  const watchBody = watch('body', props.board ? props.board.body : '');

  const onSubmit = (data: BoardFormFields) => {
    if (!account) {
      console.error('アカウント情報がないため、投稿できませんでした。');
      return;
    }
    setLoading(true);
    BoardsService.create(account.token, data.title, data.body, account.id)
      .then(board => {
        const state: BoardLocationState = {board};
        history.replace({
          pathname: `/board/${board.boardId}`,
          state,
        });
      })
      .catch(error => {
        console.error('ボード作成に失敗しました。');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      className="board-form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading && <FullWideLoading />}

      <label className="board-form__field">
        <span className="board-form__field-label">タイトル</span>
        <input
          className={clsx(['board-form__field-value', {'is-invalid':errors.title}])}
          type="text"
          name="title"
          maxLength={200}
          defaultValue={props.board ? props.board.title : ''}
          ref={register({
            required: {
              value: true,
              message: '必須項目です。',
            },
            maxLength: {
              value: 200,
              message: '文字数オーバーです。',
            }
          })}
        />
        <p className="board-form__field-help">200文字以内</p>
        {errors.title && <p className="board-form__field-invalid">{ errors.title.message }</p>}
      </label>

      <label className="board-form__field">
        <div className="board-form__field-label-container">
          <span className="board-form__field-label">本文</span>
          <button
            className={clsx([{'is-black':!previewMode}])}
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'エディタモードへ切替' : 'プレビューモードへ切替'}
          </button>
        </div>
        <textarea
          className={
            clsx([
              'board-form__field-value',
              'board-form__field-value--body',
              {'is-invalid':errors.body},
              {'is-hidden':previewMode},
            ])
          }
          name="body"
          maxLength={1000}
          defaultValue={props.board ? props.board.body : ''}
          ref={register({
            required: {
              value: true,
              message: '必須項目です。',
            },
            maxLength: {
              value: 1000,
              message: '文字数オーバーです。',
            },
          })}
        />
        {previewMode && (
          <div
            className={
              clsx([
                'md',
                'board-form__field-preview',
                {'is-invalid':errors.body},
              ])
            }
            dangerouslySetInnerHTML={convertMarkdownTextToHTML(watchBody)}
          />
        )}
        <p className="board-form__field-help">1000文字以内</p>
        {errors.body && <p className="board-form__field-invalid">{ errors.body.message }</p>}
      </label>

      <div className="board-form__actions">
        <button
          className="is-white"
          type="button"
          disabled={formState.isSubmitting}
          onClick={() => reset()}
        >
          {props.board ? '元に戻す' : 'クリア'}
        </button>
        <button
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          内容を保存
        </button>
      </div>
    </form>
  );
}

export default BoardForm;
