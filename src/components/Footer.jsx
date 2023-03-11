import React from 'react'
import Link from 'next/link';

import styles from '@/app/style';
import { footerLinks, socialMedia } from '@/constants';

export default function Footer() {
  return ( 
    <div className="bg-blue-800">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
                    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
                    <div className="flex-[1] flex flex-col justify-start mr-10">
                        <span className="font-sans text-3xl font-medium text-white sm:text-4xl">
                            SOMETHING
                        </span>
                        <p className={`font-poppins font-normal text-white text-[18px] leading-[30.8px] mt-4 max-w-[312px]`}>
                            Some text
                        </p>
                    </div>

                    <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                        {footerLinks.map((footerlink) => (
                        <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                            <h3 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                            {footerlink.title}
                            </h3>
                            <ul className="list-none mt-4">
                            {footerlink.links.map((link, index) => (
                                <li
                                key={link.name}
                                className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                                }`}
                                >
                                <Link href={`${link.link}`}>
                                    <h4>{link.name}</h4>
                                </Link>
                                </li>
                            ))}
                            </ul>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#FFFF]">
                    <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
                        Copyright Ⓒ 2023 Kifanga. All Rights Reserved.
                    </p>

                    <div className="flex flex-row md:mt-0 mt-6">
                        {socialMedia.map((social, index) => (
                        <Link href={`${social.link}`}>
                            <img
                                key={social.id}
                                src={social.icon}
                                alt={social.id}
                                className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                                }`}
                            />
                        </Link>
                        ))}
                    </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
  )
}
