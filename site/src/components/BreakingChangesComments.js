import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseJSON } from 'date-fns';

const DateText = ({ label, date }) => (
  <p style={{ fontStyle: 'italic' }}>
    {label}: <time dateTime={date}>{format(parseJSON(date), 'd.M.yyyy')}</time>
  </p>
);

const BreakingChangesComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/City-of-Helsinki/helsinki-design-system/issues/495/comments')
      .then((response) => response.json())
      .then((resultData) => {
        setComments(resultData);
      });
  }, []);

  return (
    <ul style={{ margin: 'var(--spacing-xl) var(--spacing-l) 0', padding: '0' }}>
      {comments.map((comment) => (
        <li key={comment.id} style={{ margin: '0 0 var(--spacing-2-xl)', padding: '0' }}>
          <ReactMarkdown>{comment.body && comment.body}</ReactMarkdown>
          {comment.created_at === comment.updated_at ? (
            <DateText label="Published" date={comment.created_at} />
          ) : (
            <DateText label="Updated" date={comment.updated_at} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreakingChangesComments;
