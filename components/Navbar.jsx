"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); 

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu((active) => !active);
  }

  return(
    <div>
      {
        pathname === '/register' || pathname !== '/login' && (
          <nav className="px-6 lg:px-24 py-4 flex justify-between items-center">
      <Link href='/' className="z-10">
      <Image src="/images/logo.svg" alt="logo" width={150} height={150} />
      </Link>

      {/* Mobile Navigation Bar */}
      <div
        className={`lg:hidden z-10 toggle ${isOpenMenu && "open" }`}
        onClick={handleClick}
      >
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </div>

      <div className={`flex flex-col items-center justify-center text-lg lg:hidden absolute w-full h-screen top-0 duration-500 ${isOpenMenu ? 'left-0' : 'left-full'}`}>
       
        <Link href="/" className="mb-6" onClick={handleClick}>
          Home
        </Link>
        <Link href="/" className="mb-6" onClick={handleClick}>
          About
        </Link>
        <Link href="/" className="mb-6" onClick={handleClick}>
          Contact
        </Link>
        <Link href="/login" className="mb-6" onClick={handleClick}>
          Login
        </Link>
        <Link href="/register" className="bg-blue-1 text-white px-6 py-2 rounded-lg" onClick={handleClick}>
          Register
        </Link>

      </div>

      {/* Desktop Navigation Bar */}
      <div className="hidden lg:flex items-center text-lg">
        <Link href="/" className="mr-16 ">
          Home
        </Link>
        <Link href="/" className="mr-16">
          About
        </Link>
        <Link href="/">
          Contact
        </Link>
      </div>

      <div className="hidden lg:flex items-center text-lg">
        <Link href="/login" className="mr-16">
          Login
        </Link>
        <Link href="/register" className="bg-blue-1 text-white px-6 py-2 rounded-lg">
          Register
        </Link>
      </div>
    </nav>
        )
      }
    </div>
  )
}
