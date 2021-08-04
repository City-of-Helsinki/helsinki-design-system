import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseJSON } from 'date-fns'

const BreakingChangesComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/City-of-Helsinki/helsinki-design-system/issues/495/comments')
      .then((response) => response.json())
      .then((resultData) => {
        setComments(resultData);
      }); // set data for the number of stars
  }, []);

  return (
    <ul style={{ margin: '2rem 1rem 0', padding: '0px' }}>
      {comments.map(
        (comment) =>
          console.log(parseJSON(comment.updated_at)) || (
            <li key={comment.id} style={{ margin: '0 0 3rem', padding: '0px' }}>
              <ReactMarkdown>{comment.body && comment.body}</ReactMarkdown>
              <p><time dateTime={comment.updated_at}>{format(parseJSON(comment.updated_at),  'd.M.yyyy')}</time>
              </p>
            </li>
          ),
      )}
    </ul>
  );
};

export default BreakingChangesComments;
