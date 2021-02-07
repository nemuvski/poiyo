import React, {createContext, useContext, useState} from 'react';
import {Comment} from "../libs/models/Comment";
import CommentsService from "../libs/services/CommentsService";
import {AuthenticationContext} from "./AuthenticationContext";

type Props = {
  children?: React.ReactNode;
};

type Context = {
  commentList: Array<Comment>|null;
  updateComment: (comment: Comment) => void;
  deleteComment: (comment: Comment) => void;
  nextPage: number;
  loading: boolean;
  loadLatestPage: (boardId: string) => void;
  loadNextPage: (boardId: string) => void;
};

export const CommentListContext: React.Context<Context> = createContext<Context>({
  commentList: [],
  updateComment: () => null,
  deleteComment: () => null,
  nextPage: -1,
  loading: false,
  loadLatestPage: () => null,
  loadNextPage: () => null,
});

export const CommentListProvider: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
  const [commentList, setCommentList] = useState<Array<Comment>|null>(null);
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
      .then(resources => {
        setCommentList(commentList != null ? commentList.concat(resources.items) : resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch(error => {
        console.error(error);
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
      .then(resources => {
        setCommentList(resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateComment = (comment: Comment) => {
    if (commentList == null) {
      return;
    }
    for (let index = 0; index < commentList.length; index++) {
      if (commentList[index].commentId == comment.commentId) {
        const tempCommentList = commentList;
        tempCommentList[index] = comment;
        setCommentList(tempCommentList);
        break;
      }
    }
  };

  const deleteComment = (comment: Comment) => {
    if (commentList == null) {
      return;
    }
    setCommentList(commentList.filter((c) => {
      return c.commentId != comment.commentId;
    }));
  };

  return (
    <CommentListContext.Provider value={
      {
        commentList,
        updateComment,
        deleteComment,
        nextPage,
        loading,
        loadLatestPage,
        loadNextPage
      }
    }>
      {props.children}
    </CommentListContext.Provider>
  );
};
