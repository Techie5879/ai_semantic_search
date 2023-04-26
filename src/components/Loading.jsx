import React from 'react'
import {Puff} from 'react-loader-spinner'

export const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <Puff
            height="550"
            width="80"
            radius={1}
            color="#00BFFF"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}
