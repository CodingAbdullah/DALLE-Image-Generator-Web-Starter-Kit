import Link from "next/link";

// Custom Footer component
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">DALL·E Generator</h3>
            <p className="text-gray-300 text-sm">
              Create stunning AI-generated images with the power of DALL·E 3. 
              Express your creativity and bring your ideas to life.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/generate" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  Generate Images
                </Link>
              </li>
              <li>
                <Link href="/my-pictures" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  My Pictures
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://openai.com/dall-e-3/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200"
                >
                  DALL·E 3
                </a>
              </li>
              <li>
                <a 
                  href="https://openai.com/policies/usage-policies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200"
                >
                  Usage Policies
                </a>
              </li>
              <li>
                <a 
                  href="https://help.openai.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="https://openai.com/policies/terms-of-use" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-400 text-sm transition duration-200"
                >
                  OpenAI Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DALL·E Image Generator. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Powered by OpenAI's DALL·E 3
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}