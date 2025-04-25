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
        <h2 className='user-name'>{userName}</h2>
        <h2 className='user-email'>{listing?.user.email}</h2>
    </div>
  )
}

export default OwnersDetails