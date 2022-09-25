import { useState, useMemo, useCallback } from 'react';

const ShowMoreTextToggle = ({ text }) => {
  const [showMore, setShowMore] = useState(false);
  const truncateText = useMemo(() => {
    return text.slice(0, 100).concat('...');
  }, [text]);
  return (
    <p onClick={() => setShowMore(!showMore)}>
      {showMore ? text : truncateText} {showMore ? 'less' : 'more'}
    </p>
  );
};

export default ShowMoreTextToggle;
