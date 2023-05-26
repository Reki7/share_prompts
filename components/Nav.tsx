"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {ClientSafeProvider, getProviders, signIn, signOut, useSession} from "next-auth/react";
import {LiteralUnion} from "next-auth/src/react/types";
import {BuiltInProviderType} from "next-auth/src/providers";

const Nav = () => {
  const { data: session } = useSession();
  // const [isUserLogIn, setIsUserLogIn] = useState(true);

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        { session?.user
          ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image src="/assets/images/avatar.jpg" className="rounded-full" alt="avatar" width={37} height={37}/>
              </Link>
            </div>
          )
          : (
            <>
              {providers && Object.values(providers).map(p => (
                <button type="button" key={p.name} onClick={() => signIn(p.id)} className="black_btn">
                  Sign In
                </button>
              ))}
            </>
          )
        }
      </div>
      {/* Desktop navigation */}
      <div className="sm:hidden flex relative">
        {session?.user
        ? (
            <div className="flex">
              <Image src="/assets/images/avatar.jpg" className="rounded-full" alt="avatar" width={37} height={37} onClick={() => setToggleDropdown(prev => !prev)} />
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    My profile
                  </Link>
                  <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    Create Prompt
                  </Link>
                  <button type="button" onClick={() => {setToggleDropdown(false); signOut();}} className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )
        : (
            <>
              {providers && Object.values(providers).map(p => (
                <button type="button" key={p.name} onClick={() => signIn(p.id)} className="black_btn">
                  Sign In
                </button>
              ))}
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;