"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Custom Navbar component
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition duration-200">
              DALL·E 3 Image Generator
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                About/OpenAI
              </Link>
              
              <SignedOut>
                <Link href="/sign-in" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Login
                </Link>
                <Link href="/sign-up" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Signup
                </Link>
                <span className="text-gray-400 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                  Generate Images
                </span>
                <span className="text-gray-400 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                  My Pictures
                </span>
              </SignedOut>
              
              <SignedIn>
                <Link href="/generate" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Generate Images
                </Link>
                <Link href="/my-pictures" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  My Pictures
                </Link>
                <div className="ml-4">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                        userButtonPopoverCard: "bg-white shadow-lg",
                        userButtonPopoverActions: "bg-white"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-yellow-400 focus:outline-none focus:text-yellow-400 transition duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <Link href="/" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/about" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                About/OpenAI
              </Link>
              
              <SignedOut>
                <Link href="/sign-in" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                  Login
                </Link>
                <Link href="/sign-up" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                  Signup
                </Link>
                <span className="block text-gray-400 px-3 py-2 rounded-md text-base font-medium cursor-not-allowed">
                  Generate Images
                </span>
                <span className="block text-gray-400 px-3 py-2 rounded-md text-base font-medium cursor-not-allowed">
                  My Pictures
                </span>
              </SignedOut>
              
              <SignedIn>
                <Link href="/generate" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                  Generate Images
                </Link>
                <Link href="/my-pictures" className="block text-white hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition duration-200" onClick={toggleMenu}>
                  My Pictures
                </Link>
                <div className="px-3 py-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                        userButtonPopoverCard: "bg-white shadow-lg",
                        userButtonPopoverActions: "bg-white"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}