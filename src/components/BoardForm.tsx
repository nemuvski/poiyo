import React, {ReactElement} from 'react';
import {useForm} from "react-hook-form";
import '../styles/components/board-form.scss';
import clsx from "clsx";

// inputまたはtextareaのnameに相当する.
type BoardFormFields = {
  title: string;
  body: string;
};

const BoardForm: React.FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
  } = useForm({
    // formState.isValidを使うため.
    mode: 'onChange',
  });

  const onSubmit = (data: BoardFormFields) => {
    console.log(data);
    reset();
  };

  return (
    <form
      className="board-form"
      autoComplete="none"
      onSubmit={handleSubmit(onSubmit)}
    >

      <label className="board-form__field">
        <span className="board-form__field-label">タイトル</span>
        <input
          className={clsx(['board-form__field-value', {'is-invalid':errors.title}])}
          type="text"
          name="title"
          maxLength={200}
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
        <span className="board-form__field-label">本文</span>
        <textarea
          className={clsx(['board-form__field-value', 'board-form__field-value--body', {'is-invalid':errors.body}])}
          name="body"
          maxLength={1000}
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
          クリア
        </button>
        <button
          type="submit"
          disabled={!formState.isDirty || !formState.isValid || formState.isSubmitting}
        >
          内容を保存
        </button>
      </div>
    </form>
  );
}

export default BoardForm;
