import React from 'react';
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import {Comment} from "../libs/models/Comment";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import "../styles/components/comment-item.scss";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="comment-item">
      <div className="md comment-item__body" dangerouslySetInnerHTML={convertMarkdownTextToHTML(props.comment.body)} />
      <time className="comment-item__date">
        {formatYMD(Dayjs(props.comment.createdAt))}
      </time>
    </div>
  );
}

export default CommentItem;
