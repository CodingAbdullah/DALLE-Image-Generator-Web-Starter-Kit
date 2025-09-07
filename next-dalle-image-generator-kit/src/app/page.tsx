import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Home page containing project information
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <SignedOut>Welcome to DALLE 3 Image Generation!</SignedOut>
            <SignedIn>
              <div className="flex items-center justify-center space-x-4">
                <span>Welcome back!</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </h1>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Describe, in your own words, what type of art you are looking for, the size you desire, 
              and this site will have it automatically generated for you! Powered by Next.js and the 
              creative ingenuity of{" "}
              <a 
                href="https://openai.com/dall-e-3/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                DALL·E 3
              </a>
              , your friend that will do most of the heavy lifting - this site is just a facilitator.
            </p>
            
            <p className="text-gray-600 mb-8">
              It would be cringe as developers to be taking <strong className="text-blue-600">ALL</strong> the 
              credit for it. So what are you waiting for? Search away!
            </p>
            
            <div className="space-y-4">
              <SignedOut>
                <Link 
                  href="/sign-in"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  Login to Get Started
                </Link>
              </SignedOut>
              
              <SignedIn>
                <Link 
                  href="/generate"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  Generate Images
                </Link>
              </SignedIn>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Creative Freedom</h3>
              <p className="text-gray-600">Express your imagination with unlimited creative possibilities</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate high-quality images in seconds with AI power</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save & Share</h3>
              <p className="text-gray-600">Keep your creations safe and share them with the world</p>
            </div>
          </div>
        </div>
    </main>
  );
}
