import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'

// INTERNAL IMPORT
import Style from "./Error.module.css"
import images from  "../../img";

// IMPORT SMART CONTRACT CONTEXT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const Error = () => {
    const { error, setOpenError } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
    <div className={Style.Error_box}>
    <div className={Style.Error_box_info}>
        <Image
          alt='error'
          src={images.Error}
          width={200}
          height={200}
          objectFit='cover'
          className={Style.Error_box_info_img}
        />
        <p>{error}</p>
    </div>
    </div>
    </div>
  )
}

export default Error