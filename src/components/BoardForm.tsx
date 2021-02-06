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
    }
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
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
  });

  // プレビューで利用.
  const watchBody = watch('body', props.board ? props.board.body : '');

  const onSubmit = (data: BoardFormFields) => {
    if (!account) {
      console.error('アカウント情報がないため、投稿できませんでした。');
      return;
    }
    setLoading(true);
    if (props.board) {
      // ボードを更新する.
      const newBoard = props.board;
      newBoard.title = data.title;
      newBoard.body = data.body;
      BoardsService.update(account.token, newBoard)
        .then(updatedBoard => {
          const state: BoardLocationState = {board: updatedBoard};
          history.replace({
            pathname: `/board/${updatedBoard.boardId}`,
            state,
          });
        })
        .catch(error => {
          console.error('ボード更新に失敗しました。');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // ボードを新規作成する.
      BoardsService.create(account.token, data.title, data.body, account.id)
        .then(createdBoard => {
          const state: BoardLocationState = {board: createdBoard};
          history.replace({
            pathname: `/board/${createdBoard.boardId}`,
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
    }
  };

  return (
    <form
      className="board-form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading && <FullWideLoading />}

      <div className="board-form__field">
        <label className="board-form__field-label">タイトル</label>
        <input
          className={clsx(['board-form__field-value', {'is-invalid':errors.title}])}
          type="text"
          name="title"
          maxLength={200}
          defaultValue={props.board ? props.board.title : ''}
          ref={register(fieldRules.text)}
        />
        <p className="board-form__field-help">200文字以内</p>
        {errors.title && <p className="board-form__field-invalid">{ errors.title.message }</p>}
      </div>

      <div className="board-form__field">
        <label className="board-form__field-label">本文</label>
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
              'board-form__field-value',
              'board-form__field-value--body',
              {'is-invalid':errors.body},
              {'is-hidden':previewMode},
            ])
          }
          name="body"
          maxLength={1000}
          defaultValue={props.board ? props.board.body : ''}
          ref={register(fieldRules.body)}
        />
        {previewMode && (
          <div
            className={
              clsx([
                'md',
                'board-form__field-preview',
              ])
            }
            dangerouslySetInnerHTML={convertMarkdownTextToHTML(watchBody)}
            // プレビューの領域をクリックするとモードが切り替わる.
            onClick={() => setPreviewMode(false)}
          />
        )}
        <p className="board-form__field-help">1000文字以内</p>
        {errors.body && <p className="board-form__field-invalid">{ errors.body.message }</p>}
      </div>

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
          disabled={formState.isSubmitting}
        >
          内容を保存
        </button>
      </div>
    </form>
  );
}

export default BoardForm;
