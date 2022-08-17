import React, { useState, useEffect } from 'react';

const WindowTracker = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onChangeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', onChangeWidth);
    return () => window.removeEventListener('resize', onChangeWidth);
  });
  return <div>Window width: {width}</div>;
};
export default WindowTracker;
