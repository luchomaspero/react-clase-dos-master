import React, { useState } from 'react';
import FancyInput from '../small/FancyInput';

const useInputState = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: event => setValue(event.target.value),
  };
};

const CustomHook = () => {
  const input = useInputState('');
  return <FancyInput title="Custom hook" {...input} />;
};
export default CustomHook;
