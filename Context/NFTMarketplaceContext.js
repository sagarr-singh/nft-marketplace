import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import { useRouter } from 'next/router';
import axios from 'axios'
// import { create as ipfsHttpClient } from "ipfs-http-client";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// const client = ipfsHttpClient("https://api.pinata.cloud/pinning/pinFileToIPFS");

// const projectId = "your project id here";
// const projectSecretKey = "project secretKey here";
// const auth = `Basic ${Buffer.from(`$(projectId}:${projectSecretKey}`).toString(
//     "base64"
// )}`;
// const subdomain = "your subDomain";

// const client = ipfsHttpClient({
//     host: "infura-ipfs.io",
//     port: 5001,
//     protocol: "https",
//     headers: {
//         authorization: auth,        
//     },
// });


// INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants'
// MY personal ERROR WAS THIS **
// import { types } from 'hardhat/config'**

//---FETCHING SMART CONTRACT  
const fetchContract = (signerOrProvider) => 
   new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
   );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async() => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);
      return contract;
    } catch (error) {
      setError("Something went wrong while connecting with contract");
      setOpenError(true)
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, Collect and Sell NFTs";   

//--------USESTATE 
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

//---CHECK IF WALLET IS CONNECTED
const checkIfWalletConnected = async()  => {
    try {
      if (!window.ethereum) 
      return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setError("No authorized account found");
        setOpenError(true)
      }
    //   console.log(currentAccount);
    } catch (error) {
        setError("Something wrong while connecting to wallet");        
        setOpenError(true)
    }
};

useEffect(() => {
    checkIfWalletConnected();
}, []);

//---CONNECT WALLET FUNCTION
const connectWallet = async() => {
    try {
        if (!window.ethereum) return (
            setOpenError(true),
            setOpenError("Install MetaMask")
        )

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        // window.location.reload(); 
    } catch (error) {
        setError("Error while connecting to wallet");     
        setOpenError(true)
    }
};


//---UPLOAD TO IPFS (PINATA) FUNCTION
const uploadToPinata = async (file) => {
    if (file) {
    try {
      const formData = new FormData ();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
            pinata_api_key: `3ffce4714cab1c19be31`,
            pinata_secret_api_key: 
            `1c9c4a5b8b21e0ea097767bcadcad800b98be67986b7369e51ba396355370b7f`,
            "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return ImgHash;
    } catch (error) {
        setError("Unable to upload image to Pinata");
        setOpenError(true)
    }
    }
};     


//---------CREATE NFT FUNCTION------
const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image) 
        return setError("Data Is Missing");
               setOpenError(true);
    
    const data = JSON.stringify({ name, description, image });

    try {
        const response = await axios({
            method: "POST",
            url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            data: data,
            headers: {
                pinata_api_key: `3ffce4714cab1c19be31`,
                pinata_secret_api_key: 
                `1c9c4a5b8b21e0ea097767bcadcad800b98be67986b7369e51ba396355370b7f`,
                "Content-Type": "application/json",
            },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(url);

        await createSale(url, price);
        router.push("/searchPage");
        // console.log("NFT creation successful");
    } catch (error) {
        // console.error("Error during Pinata request:", error.message);
        // Additional error handling (e.g., alert user, log more details)
        setError("Error while creating NFT");
        setOpenError(true);
    }
};


//---- CREATESALE FUNCTION
const createSale = async(url, formInputPrice, isReselling, id) => {
    try {
        console.log(url, formInputPrice, isReselling, id);
        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const contract = await connectingWithSmartContract();

        const listingPrice = await contract.getListingPrice();

        const transaction = !isReselling
         ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
         })
         : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
         });

         await transaction.wait();
        //  console.log(transaction);
    } catch (error) {
        setError("Error while creating sale");
        setOpenError(true);
    }
};

//---FETCH NFTS FUNCTION

const fetchNFTs  = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      
        
        const contract = fetchContract(provider);

        const data = await contract.fetchMarketItems();

        // console.log(data)

        const items = await Promise.all(
            data.map(
                async({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    };
                }
            )
        );

        return items;
    } catch (error) {
        setError("Error while fetching NFTs:", error);
        setOpenError(true);
    }
};

useEffect (() => {
    fetchNFTs();
}, []);

//----FETCHING MY NFT OR LISTED NFTs
const fetchMyNFTsOrListedNFTs = async(type) => {
    try {
        if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data = 
        type == "fetchItemsListed"
         ? await contract.fetchItemsListed()
         : await contract.fetchMyNFTs();

         const items = await Promise.all(
            data.map(
                async ({tokenId, seller, owner, prise: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                        } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                }
            )
         );
         return items;
        }
    } catch (error) {
        setError("Error while fetching listed NFTs");     
        setOpenError(true);
    }
};

useEffect(() => {
    fetchMyNFTsOrListedNFTs();
}, []);

//--- BUY NFTs FUNCTION
const buyNFT =  async (nft) => {
    try {
        const contract = await connectingWithSmartContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price,
        });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error while buying NFT");
      setOpenError(true);
    }
};

    return (
        <NFTMarketplaceContext.Provider 
          value={{
            checkIfWalletConnected,
            connectWallet,    
            uploadToPinata,
            // uploadToIPFS,
            createNFT,            
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            createSale,
            currentAccount,
            titleData,
            setOpenError,
            setError,
            // error,
        }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};