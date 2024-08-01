"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn , signOut , useSession , getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 items-center">
            <Image 
              src="/assets/images/logo.svg"
              className="object-contain"
              alt="promptAI"
              width={30}
              height={30}
            />
        </Link>
    </nav>
  )
}

export default Nav