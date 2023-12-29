import React from 'react';

const ProgressBar = (props) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-[#f26c6d] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${props.progress}%` }} // Fix: interpolate the value within curly braces
      >
        {props.progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
