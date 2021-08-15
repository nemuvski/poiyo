import React, { createContext, useState } from 'react';
import { Comment } from '../models/Comment';
import CommentsService from '../libs/services/CommentsService';
import SentryTracking from '../utilities/SentryTracking';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';

type Props = {
  children?: React.ReactNode;
};

type Context = {
  commentList: Array<Comment> | null;
  // 編集するCommentオブジェクト. (編集モーダルで対象のCommentオブジェクトを特定するために必要)
  operatingComment: Comment | null;
  setupOperatingComment: (comment: Comment | null) => void;
  updateComment: (editedComment: Comment) => Promise<void>;
  deleteComment: () => Promise<void>;
  nextPage: number;
  loading: boolean;
  loadLatestPage: (boardId: string) => void;
  loadNextPage: (boardId: string) => void;
};

export const CommentListContext: React.Context<Context> = createContext<Context>({
  commentList: [],
  operatingComment: null,
  setupOperatingComment: () => null,
  updateComment: async () => {
    return;
  },
  deleteComment: async () => {
    return;
  },
  nextPage: -1,
  loading: false,
  loadLatestPage: () => null,
  loadNextPage: () => null,
});

export const CommentListProvider: React.FC<Props> = (props: Props) => {
  const account = useSelector(selectAccount);
  const [commentList, setCommentList] = useState<Array<Comment> | null>(null);
  const [operatingComment, setOperatingComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(-1);

  const getResources = async (targetPage: number, boardId: string) => {
    if (!(account && account.token)) {
      throw new Error('アカウント情報がないため、データを取得できませんでした。');
    }
    return await CommentsService.get(account.token, boardId, targetPage);
  };

  const loadNextPage = (boardId: string) => {
    setLoading(true);
    getResources(nextPage, boardId)
      .then((resources) => {
        setCommentList(commentList != null ? commentList.concat(resources.items) : resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch((error) => {
        SentryTracking.exception(error);
        setCommentList([]);
        setNextPage(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadLatestPage = (boardId: string) => {
    setLoading(true);
    setCommentList(null);
    getResources(1, boardId)
      .then((resources) => {
        setCommentList(resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setupOperatingComment = (comment: Comment | null) => {
    setOperatingComment(comment);
  };

  const updateComment = async (editedComment: Comment) => {
    if (!account || commentList == null || operatingComment == null) {
      setOperatingComment(null);
      throw new Error('処理中に問題があったため、コメントの更新処理は中断されました。');
    }
    return await CommentsService.update(account.token, editedComment)
      .then((responseComment) => {
        for (let index = 0; index < commentList.length; index++) {
          if (commentList[index].commentId == responseComment.commentId) {
            const tempCommentList = commentList;
            tempCommentList[index] = responseComment;
            setCommentList(tempCommentList);
            break;
          }
        }
      })
      .catch((error) => {
        SentryTracking.exception(error);
      })
      .finally(() => {
        setOperatingComment(null);
      });
  };

  const deleteComment = async () => {
    if (!account || commentList == null || operatingComment == null) {
      setOperatingComment(null);
      throw new Error('処理中に問題があったため、コメントの削除処理は中断されました。');
    }
    return await CommentsService.remove(account.token, operatingComment.boardId, operatingComment.commentId)
      .then(() => {
        setCommentList(
          commentList.filter((c) => {
            return c.commentId != operatingComment.commentId;
          })
        );
      })
      .catch((error) => {
        SentryTracking.exception(error);
      })
      .finally(() => {
        setOperatingComment(null);
      });
  };

  return (
    <CommentListContext.Provider
      value={{
        commentList,
        operatingComment,
        setupOperatingComment,
        updateComment,
        deleteComment,
        nextPage,
        loading,
        loadLatestPage,
        loadNextPage,
      }}
    >
      {props.children}
    </CommentListContext.Provider>
  );
};
