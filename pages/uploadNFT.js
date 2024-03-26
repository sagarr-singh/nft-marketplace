import React, { useState, useEffect, useContext } from 'react'

// INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css"
import { UploadNFT} from "../UploadNFT//uploadNFTIndex"

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadToPinata, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
    <div className={Style.uploadNFT_box}>
    <div className={Style.uploadNFT_box_heading}>
        <h1>Create New NFT</h1>
        <p>
        You can set preferred display name, create your profile URL and
        manage other personal settings.
        </p>
    </div>

    <div className={Style.uploadNFT_box_title}>
        <h2>Image, Video, Audio or 3D Model</h2>
        <p>
            File types supported: JPG, PNG, GIF, SVG, MP4,
            WebM, MP3, OGG, WAV, GLB, GLTF. Max size: 100 MB
        </p>
    </div>

    <div className={Style.uploadNFT_box_form}>
    <UploadNFT uploadToPinata={uploadToPinata}
       createNFT={createNFT}
    />
    </div>
    </div>
    </div>
  )
}

export default uploadNFT
