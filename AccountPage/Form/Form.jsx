import React from 'react'
import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md"
import { BsTwitterX } from "react-icons/bs"
import {
    TiSocialFacebook,
    TiSocialInstagram,
} from "react-icons/ti"

// INTERNAL IMPORT
import Style from "./Form.module.css"
import { Button } from "../../components/componentsindex"

const Form = () => {
  return (
    <div className={Style.Form}>
    <div className={Style.Form_box}>
        <form>
    <div className={Style.Form_box_input}>
        <label htmlFor="name">Username</label>
        <input 
           type="text" 
           placeholder='Sagarrr' 
           className={Style.Form_box_input_userName}
        />
    </div>

    <div className={Style.Form_box_input}>
      <label htmlFor="email">Email</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <HiOutlineMail />
    </div>
    <input type="text" placeholder='Email*' />
    </div>
    </div>

    <div className={Style.Form_box_input}>
      <label htmlFor="description">Description</label>
      <textarea 
        name="" 
        id="" 
        cols="30" 
        rows="6"
        placeholder='Something about yourself in few words'
      ></textarea>
    </div>

    <div className={Style.Form_box_input}>
      <label htmlFor="website">Website</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <MdOutlineHttp />
    </div>    

    <input type="text" placeholder='website' />
    </div>
    </div>

    <div className={Style.Form_box_input_social}>
    <div className={Style.Form_box_input}>
      <label htmlFor="facebook">Facebook</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <TiSocialFacebook />
    </div>
    <input type="text" placeholder='http://sagar' />
    </div>
    </div>
    <div className={Style.Form_box_input}>
      <label htmlFor="Twitter">Twitter(X)</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <BsTwitterX />
    </div>
    <input type="text" placeholder='http://sagar' />
    </div>
    </div>
    <div className={Style.Form_box_input}>
      <label htmlFor="Instagram">Instagram</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <TiSocialInstagram />
    </div>
    <input type="text" placeholder='http://sagar' />
    </div>
    </div>
    </div>

    <div className={Style.Form_box_input}>
      <label htmlFor="wallet">Wallet Address</label>
    <div className={Style.Form_box_input_box}>
    <div className={Style.Form_box_input_box_icon}>
      <MdOutlineHttp />
    </div>
    <input 
      type="text" 
      placeholder='0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8'
    />
    <div className={Style.Form_box_input_box_icon}>
      <MdOutlineContentCopy />
      </div>
      </div>
      </div>

    <div className={Style.Form_box_btn}>
      <Button 
        btnName="Upload Profile"
        handleClick={() => {}}
        classStyle={Style.button}
      />
    </div>
    </form>
    </div>
    </div>
  )
}

export default Form
