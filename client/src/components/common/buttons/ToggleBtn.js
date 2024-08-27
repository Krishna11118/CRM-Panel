import React from "react";

const ToggleBtn = ({ text, createUserPermission, setCreateUserPermission }) => {
  return (
    <>
      <div className="text-white   items-center border-none ">
        <div className="text-blue-400 pr-4   text-sm ">{text}</div>
        <label className="inline-flex items-center cursor-pointer border-none">
          <input
            type="checkbox"
            checked={createUserPermission}
            onChange={() => setCreateUserPermission(!createUserPermission)}
            className="sr-only peer"
          />
          <div
            className="relative w-11 h-6 bg-red-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
          ></div>
        </label>
      </div>
    </>
  );
};

export default ToggleBtn;
