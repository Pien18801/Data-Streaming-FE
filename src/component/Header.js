import React from 'react'
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {
  return (
    <>
      <div className='header'>
        <div className='header_frame'>
          <img className='header_logo' src='https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png' alt=''></img>
        </div>
        <div className='header_title'>
          <span className='header_subject'>Data Streaming</span>
          <span className='header_app'>Ứng dụng phát hiện bạo lực trong video</span>
        </div>
      </div>
      <div className='header_control'>
        <Link to={'/'} className='header_control_title'>Home</Link>
        <Link to={'/upload'} className='header_control_title'>Upload Video</Link>
      </div>
    </>

  )
}