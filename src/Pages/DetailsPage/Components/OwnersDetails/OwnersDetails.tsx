import React from 'react'
import "./OwnersDetails.css";
import { Listing } from '../../../../types/Listings'

type Props = {
    listing?: Listing;
}

const OwnersDetails = ({listing}: Props) => {
 const userName = listing?.user.firstName +" "+ listing?.user.lastName
    return (
    <div className='owner-details'>
      <h2 className='user-name'>Owner Details:</h2>
        <p className='user-name'>{userName}</p>
        <p className='user-email'>{listing?.user.email}</p>
        <p className='user-phone'>{listing?.user.phoneNumber}</p>
    </div>
  )
}

export default OwnersDetails