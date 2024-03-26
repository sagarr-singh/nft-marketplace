import React, { useState, useEffect, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
Loader

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

// GEMINI HELPED 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
        setNftsCopy(items);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Please reload your browser");
      }
    };

    fetchData();
  }, []);


  // useEffect(() => {
  //   try {
  //     fetchNFTs().then((items) => {
  //       setNfts(items.reverse());
  //       setNftsCopy(items);
  //     });
  //   } catch (error) {
  //     setError("Please reload your browser");
  //   }        
  // }, []);

    const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) => 
    name.toLowerCase().includes(value.toLowerCase())
    );

    if(filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch={onHandleSearch} 
        onClearSearch={onClearSearch}
      />
      <Filter />
      {/* {nfts.length == 0 ? <Loader />: <NFTCardTwo NFTData={nfts} />} */}

      {isLoading ? (
        <Loader />
      ) : nfts.length === 0 ? (
        <p>No NFTs found.</p>
      ) : (
        <NFTCardTwo NFTData={nfts} />
      )}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
