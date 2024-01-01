import React from 'react';

const ProgressBar = (props) => {
  const isProgressValid = !isNaN(props.progress) && props.progress >= 0 && props.progress <= 100;

  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      {isProgressValid ? (
        <div
          className="bg-[#f26c6d] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${props.progress}%` }}
        >
          {props.progress}%
        </div>
      ) : (
        <div className="bg-[#f26c6d] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
          Loading...
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
