import React from 'react'
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import {HiSearch} from 'react-icons/hi';
import './logosearch.css';
const Logosearch = () => {
  return (
    <div className='Logosearch'>
      <PiPhoneDisconnectFill size={24} color="blue" />
      <div className="search">
        <input type="text" placeholder='#Explore'/>
        <div className="search-icon">
          <HiSearch/>
        </div>
      </div>
    </div>
  )
}

export default Logosearch
