import React from 'react';
import Comments from '../container/Comments';
type CommentContainerProps = {
  contents: string;
  comments: Array<{ commenter: string; contents: string }>;
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
  user_id: string;
};

const CommentContainer = ({ onSubmit, onChange, contents, comments, user_id }: CommentContainerProps) => {
  return (
    <div>
      <section className="rounded-b-lg  mt-8 ">
        <form method="POST" onSubmit={onSubmit}>
          <textarea
            name="contents"
            className="w-full shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-sm"
            placeholder={user_id ? 'Leave a comment...' : 'Please login before leave comment ...'}
            cols={6}
            rows={6}
            id="comment_content"
            spellCheck="false"
            value={contents}
            onChange={onChange}
            disabled={!user_id}
          ></textarea>
          <button
            className="font-bold py-2 px-4 w-full bg-gray-darker text-lg text-white shadow-md rounded-lg "
            type="submit"
            disabled={!user_id}
          >
            Comment
          </button>
        </form>

        <div className="mt-10">Comments</div>

        <div id="task-comments" className="pt-4">
          <Comments id={1} commenter="@Shanel" user_id={user_id} contents="Hi good morning will it be the entire house." />
          <Comments id={2} commenter="@Tim Motti" user_id={user_id} contents="Hello. Yes, the entire exterior, including the walls." />
          {comments.map((comment, idx) => (
            <Comments id={idx} key={idx} user_id={user_id} {...comment} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommentContainer;