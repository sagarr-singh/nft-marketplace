import React, { useState } from 'react'
import Image from 'next/image'
import { BsImage } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { MdVerified, MdTimer } from 'react-icons/md'
import { FaBolt } from "react-icons/fa6";
import Link from 'next/link'

// INTERNAL IMPORT
import Style from  './NFTCardTwo.module.css'
import { LikeProfile } from '../../components/componentsindex'


const NFTCardTwo = ({ NFTData, isLoading = false }) => {
    const [like, setLike] = useState(false)
    const [likeInc, setLikeInc] = useState(21)
 
    const likeNFT = () => {
        if (!like) {
            setLike(true)
            setLikeInc(24);            
        }else {
            setLike(false)
            setLikeInc(23 + 1)
        }
    }

  return (
    <div className={Style.NFTCardTwo}>
         {isLoading ? (
        <p>Loading NFTs...</p>
        ) : (
         NFTData?.map((el, i) => (
          <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
            <div className={Style.NFTCardTwo_box} key={i + 1}>
             <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
               <div className={Style.NFTCardTwo_box_like_box_box}>
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>            
                </p>
            </div>
            </div>
            </div>

        <div className={Style.NFTCardTwo_box_img}>
            <Image
              src={el.image}
              alt='NFT'
              width={500}
              height={500}
              objectFit='cover'
              className={Style.NFTCardTwo_box_img_img}
            />
        </div>

        <div className={Style.NFTCardTwo_box_info}>
        <div className={Style.NFTCardTwo_box_info_left}>
            <LikeProfile />
            <p>{el.name} <FaBolt /> </p>
        </div>
        <small>4{i + 2}</small>
        </div>

        <div className={Style.NFTCardTwo_box_price}>
        <div className={Style.NFTCardTwo_box_price_box}>
        <small>Current Bid</small>
        <p>{el.price} ETH</p>
    </div>
    <p className={Style.NFTCardTwo_box_price_stock}>
        <MdTimer /> <span>{i + 1} hours left</span>
    </p>
    </div>
    </div>
    </Link>
    ))
    )}
  </div>
);
};

export default NFTCardTwo



// import React, { useState } from 'react';
// import Image from 'next/image';
// import { BsImage } from 'react-icons/bs';
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// import { MdVerified, MdTimer } from 'react-icons/md';
// import { FaBolt } from "react-icons/fa6";
// import Link from 'next/link';

// // INTERNAL IMPORT
// import Style from './NFTCardTwo.module.css';
// import LikeProfile from '../../components/componentsindex'; // Assuming LikeProfile component

// const NFTCardTwo = ({ NFTData, isLoading = false }) => {
//   const [like, setLike] = useState(false);
//   const [likeInc, setLikeInc] = useState(21); // Adjust initial value as needed

//   const likeNFT = () => {
//     setLike(!like); // Toggle like state concisely
//     setLikeInc(like ? likeInc - 1 : likeInc + 1); // Update like count based on like state
//   };

//   return (
//     <div className={Style.NFTCardTwo}>
//       {isLoading ? (
//         <p>Loading NFTs...</p>
//       ) : (
//         NFTData?.map((el, i) => ( // Optional chaining to handle potential undefined NFTData
//           <Link key={i} href={{ pathname: "/NFT-details", query: el }}>
//             <div className={Style.NFTCardTwo_box} key={i * 2}>
//               <div className={Style.NFTCardTwo_box_like}>
//                 <div className={Style.NFTCardTwo_box_like_box}>
//                   <div className={Style.NFTCardTwo_box_like_box_box}>
//                     <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
//                     <p onClick={likeNFT}>
//                       {like ? <AiOutlineHeart /> : <AiFillHeart />}
//                       <span>{likeInc}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className={Style.NFTCardTwo_box_img}>
//                 <Image
//                   src={el.image}
//                   alt='NFT'
//                   width={500}
//                   height={500}
//                   objectFit='cover'
//                   className={Style.NFTCardTwo_box_img_img}
//                 />
//               </div>

//               <div className={Style.NFTCardTwo_box_info}>
//                 <div className={Style.NFTCardTwo_box_info_left}>
//                   <LikeProfile NFTData={el} /> {/* Assuming LikeProfile expects NFTData */}
//                   <p>{el.name} <FaBolt /></p>
//                 </div>
//                 <small>4{i + 2}</small>
//               </div>

//               <div className={Style.NFTCardTwo_box_price}>
//                 <div className={Style.NFTCardTwo_box_price_box}>
//                   <small>Current Bid</small>
//                   <p>{el.price} ETH</p>
//                 </div>
//                 <p className={Style.NFTCardTwo_box_price_stock}>
//                   <MdTimer /> <span>{i + 1} hours left</span>
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))
//       )}
//     </div>
//   );
// };

// export default NFTCardTwo;
