import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperatingComment } from '../stores/comment/selector';
import { Comment } from '../models/Comment';
import { clearOperatingComment, setOperatingComment } from '../stores/comment/slice';

export const useOperatingComment = (): {
  operatingComment: Comment | null;
  setOperatingComment: (comment: Comment) => void;
  clearOperatingComment: () => void;
} => {
  const dispatch = useDispatch();
  const operatingComment = useSelector(selectOperatingComment);

  useEffect(
    () => () => {
      dispatch(clearOperatingComment());
    },
    []
  );

  return {
    operatingComment,
    setOperatingComment: (comment) => {
      dispatch(setOperatingComment(comment));
    },
    clearOperatingComment: () => {
      dispatch(clearOperatingComment());
    },
  };
};
