import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import clsx from "clsx";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import BoardsService from "../libs/services/BoardsService";
import FullWideLoading from "./FullWideLoading";
import '../styles/components/board-form.scss';
import {Board, BoardLocationState} from "../libs/models/Board";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import SentryTracking from "../utilities/SentryTracking";

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
  const defaultValues: BoardFormFields = {
    // 初期表示時に「board」がundefinedでセットされないため、useEffectで入れる
    title: props.board ? props.board.title : '',
    body: props.board ? props.board.body : '',
  }
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    watch,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues,
  });

  useEffect(() => {
    if (props.board) {
      setValue('title', props.board.title);
      setValue('body', props.board.body);
    }
  }, [props.board])

  // プレビューで利用.
  const watchBody = watch('body', props.board ? props.board.body : '');

  const onSubmit = (data: BoardFormFields) => {
    if (!account) {
      SentryTracking.exception('アカウント情報がないため、ボード更新・作成ができませんでした。');
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
          SentryTracking.exception('ボード更新に失敗しました。');
          SentryTracking.exception(error);
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
          SentryTracking.exception('ボード作成に失敗しました。');
          SentryTracking.exception(error);
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
          className={clsx(['board-form__field-value', {'is-invalid':formState.errors.title}])}
          type="text"
          {...register('title', fieldRules.text)}
        />
        <p className="board-form__field-help">200文字以内</p>
        {formState.errors.title && <p className="board-form__field-invalid">{ formState.errors.title.message }</p>}
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
              {'is-invalid':formState.errors.body},
              {'is-hidden':previewMode},
            ])
          }
          {...register('body', fieldRules.body)}
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
        {formState.errors.body && <p className="board-form__field-invalid">{ formState.errors.body.message }</p>}
      </div>

      <div className="board-form__actions">
        <button
          className="is-white"
          type="button"
          disabled={formState.isSubmitting}
          onClick={() => reset(defaultValues)}
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
