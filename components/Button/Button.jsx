import React from "react";
// import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {

  // const router = useRouter();
  return (
    <div className={Style.box}>
      <button 
        className={`${Style.button} ${classStyle}`}
        onClick={() => handleClick()}
          // router.push("/searchPage")}
      >
         {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;


