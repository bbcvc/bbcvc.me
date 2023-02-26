import Link from 'next/link'
import React from 'react'

const Logo = props => {
  const { siteInfo, className } = props
  return (
    <Link href='/' passHref legacyBehavior>
      <div className={'flex flex-col justify-center items-center cursor-pointer bg-black dark:bg-gray-800 space-y-3 font-bold ' + className}>
        <div className='font-serif text-xl text-white'> {siteInfo?.title}</div>
        <div className='text-sm text-gray-300 font-light text-center'> {siteInfo?.description}</div>
      </div>
    </Link>
  );
}
export default Logo
