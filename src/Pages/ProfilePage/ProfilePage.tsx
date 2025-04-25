import React from 'react'
import { Link } from 'react-router-dom'
import './ProfilePage.css';
import CarListing from '../../Components/CarListing/CarListing';
import MyListings from '../../Components/MyListings/MyListings';

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <>
    <div>
      <div className='wrapper'>
        <div className='header'>
          <h2 className='text'>My listing</h2>
          <Link to="/add-listing" className="nav-link">
              + Add New Listing
            </Link>
        </div>
        <MyListings/>
      </div>
    </div>
    </>
  )
}

export default ProfilePage