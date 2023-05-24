import React from 'react'
import Image from 'next/image'

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