"use client";

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Bottombar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <section className='bottombar'>
      <div className='flex flex-1 flex-row gap-4'>
        { sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && pathname.length>1) ||
                            pathname === link.route
          return(
            <Link 
             className={`bottombar_link flex flex-col gap-4 p-4 ${isActive && "bg-primary-500"}`}
             href={link.route}
             key={link.label}
             >
                <Image
                  src={link.imgURL}
                  alt = {link.label}
                  width={24}
                  height={24}
                />

                <p className='text-white'>{link.label.split(/\s+/)[0]}</p>
            </Link>
          )
        })
        }
      </div>
    </section>
  )
}

export default Bottombar