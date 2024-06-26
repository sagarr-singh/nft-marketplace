import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

// INTERNAL IMPORT
import Style from "../styles/connectWallet.module.css"
import images from "../img"

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const connectWallet = () => {
    const [activeBtn, setActiveBtn] = useState(1)
    const { currentAccount, connectWallet }  = useContext(NFTMarketplaceContext);
    const providerArray = [
        {
            provider: images.provider1,
            name: "Metamask",
        },
        {
            provider: images.provider2,
            name: "walletConnect",
        },
        {
            provider: images.provider3,
            name: "walletLink",
        },
        {
            provider: images.provider1,
            name: "Formatic",
        },
    ];

  return (
    <div className={Style.connectWallet}>
    <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p>To start using our platfrom please connect to anyone from
            the available wallets</p>

    <div className={Style.connectWallet_box_provider}>
        {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              onClick={() => (setActiveBtn(i + 1), connectWallet())}
              >
                <Image 
                  src={el.provider}
                  alt={el.provider}
                  width={50}
                  height={50}
                  className={Style.connectWallet_box_provider_item_img}
                />
                <p>{el.name}</p>
      </div>
        ))}
    </div>
    </div>
    </div>
  )
}

export default connectWallet
