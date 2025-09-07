// About page component
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About DALL·E Image Generator</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to our AI-powered image generation platform, built with the incredible technology 
              of OpenAI's DALL·E. This application allows you to describe, in your own words, what type 
              of art you're looking for, specify the size you desire, and have it automatically generated for you.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Powered by DALL·E 2</h2>
            <p className="text-gray-600 mb-6">
              Our platform is powered by{" "}
              <a 
                href="https://openai.com/dall-e-2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                DALL·E 2
              </a>
              , OpenAI's revolutionary AI system that can create realistic images and art from a description in natural language.
              The creative ingenuity behind DALL·E does the heavy lifting - this site is just a facilitator 
              to make the technology accessible and user-friendly.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <p className="text-gray-600">Describe your image idea in natural language</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <p className="text-gray-600">Choose your preferred image size (small, medium, or large)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <p className="text-gray-600">Our AI generates a unique image based on your description</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <p className="text-gray-600">Save, download, or share your generated artwork</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
            <p className="text-gray-600 mb-6">
              This application is built with modern web technologies including Next.js, React, TypeScript, 
              Tailwind CSS, and integrates with OpenAI's API for image generation. We use secure cloud 
              storage to save your generated images and maintain your personal gallery.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Note:</strong> It would be unfair as developers to take all the credit for the 
                amazing images you'll create. The real magic happens thanks to OpenAI's incredible AI technology. 
                We're just here to make it easy and accessible for you to use!
              </p>
            </div>
            
            <p className="text-gray-600 text-lg font-medium">
              So what are you waiting for? Let your imagination run wild and start creating amazing AI-generated art today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}