import { fadeIn } from "src/utils";

import React from "react";
import { motion } from "framer-motion";

const STYLE = {
  container:
    "gap-[10.13px] w-full min-h-[60px] rounded-[16px] bg-white-400 md:px-[21px] px-[10px] flex justify-between align-middle items-center flex-row dark:bg-dark-500 dark:text-white",
  button:
    "pt-[13px] w-[34px] h-[34px] rounded-full bg-white shadow-button cursor-pointer bg-center bg-no-repeat dark:bg-white-0 dark:shadow-none dark:border-2 dark:border-white-400 dark:border-solid",
};

const List = ({ item, onSearch, onDelete }) => {
  return (
    <motion.div className={STYLE.container}>
      <div className="flex flex-grow justify-between md:flex-row flex-col">
        <span className="md:text-[16px] text-[14px]">{item?.name}</span>
        <span className="md:text-[14px] text-[12px] md:scale-100 scale-83 origin-top-left dark:text-white-500">
          {item?.timeStamp}
        </span>
      </div>

      <div className="flex align-middle items-center gap-[10px]">
        <button
          className={`${STYLE.button} bg-searchSmall dark:bg-searchSmallDark`}
          onClick={() => onSearch(item?.name)}
        ></button>
        <button
          className={`${STYLE.button} bg-delete dark:bg-deleteDark`}
          onClick={() => onDelete(item)}
        ></button>
      </div>
    </motion.div>
  );
};

export default List;
