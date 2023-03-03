'use client';
import React, {useState, useContext} from 'react';
import jwt_decode from "jwt-decode";
import { ThemeContext } from '@/app/theme-provider';
import Link from 'next/link';
import Image from 'next/image';
import { logo, close, menu } from '@/assets';
import { navLinks } from '@/constants';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  // using context
  const { state: { userInfo }, dispatch: ctxDispatch } = useContext(ThemeContext);

  const decodedUser = userInfo ? jwt_decode(userInfo.user.accessToken) : null;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link href={`/`}>
        <Image src={logo} alt="logo" className="w-1/2 h-1/5 object-cover" />
      </Link>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-sans font-normal cursor-pointer text-[16px] text-white mr-10`}
          >
            <Link href={`${nav.link}`}>{nav.title}</Link>
          </li>
        ))}

        {userInfo?.user?.accessToken && decodedUser?.isadmin && (
        <li className={`font-sans font-normal cursor-pointer text-[16px] text-white mr-10`}>
            <Link
            href="/manage/dashboard"
            >
            Dashboard
            </Link>
        </li>
        )}
        {userInfo?.user?.accessToken ? (
            <li className={`font-sans font-normal cursor-pointer text-[16px] text-white mr-10`}>
            <Link
                href="#signout"
                onClick={signoutHandler}
            >
                Sign Out
            </Link>
            </li>
        ) : (
            <li className={`font-sans font-normal cursor-pointer text-[16px] text-white mr-10`}>
            <Link href="/login">
                Sign In
            </Link>
            </li>
        )}
      </ul>
      
      <ToastContainer/>
      {/* Mobile devices */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
            />

            <div
            className={`${
                !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
                {navLinks.map((nav, index) => (
                <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] text-white mb-4`}
                >
                    <Link href={`${nav.link}`}>{nav.title}</Link>
                </li>
                ))}

                {userInfo?.user?.accessToken && decodedUser?.isadmin && (
                <li className={`font-poppins font-medium cursor-pointer text-[16px] text-white mb-4`}>
                    <Link
                    href="/manage/dashboard"
                    >
                    Dashboard
                    </Link>
                </li>
                )}
                {userInfo?.user?.accessToken ? (
                    <li className={`font-poppins font-medium cursor-pointer text-[16px] text-white mb-4`}>
                    <Link
                        href="#signout"
                        onClick={signoutHandler}
                    >
                        Sign Out
                    </Link>
                    </li>
                ) : (
                    <li className={`font-poppins font-medium cursor-pointer text-[16px] text-white mb-4`}>
                    <Link href="/login">
                        Sign In
                    </Link>
                    </li>
                )}
            </ul>
            </div>
        </div>

    </nav>
  )
}
