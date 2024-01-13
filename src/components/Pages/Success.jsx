import React from 'react'
import { useSelector } from 'react-redux'

export const Success = () => {

  let data = useSelector((state) => state.user.users.userData);
   let dataJson = data.map(data => JSON.stringify(data))
  return (
    <>
    <div>Thanks for Login babe</div>
     <div className='mt-[5rem] p-4'>{dataJson}</div>
    </>
  )
}
