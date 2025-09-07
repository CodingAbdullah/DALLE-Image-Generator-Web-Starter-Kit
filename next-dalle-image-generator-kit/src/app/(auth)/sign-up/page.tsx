import { SignUp } from "@clerk/nextjs";

// Signup page component
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join DALL·E Image Generator and start creating amazing AI art
          </p>
        </div>
        <div className="mt-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200",
                card: "shadow-lg"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}