import Image from 'next/image'
import React from 'react'

const Banner = ({ bannerImage }) => {
  return (
    <Image
      src={bannerImage}
      alt="channel banner"
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
    />
  )
}

export default Banner