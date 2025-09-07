import { SignIn } from "@clerk/nextjs";

// Signin page component
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to DALL·E Image Generator
          </p>
        </div>
        <div className="mt-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200",
                card: "shadow-lg"
              }
            }}
          />
          <p className="mt-4 text-center text-sm text-gray-500">
            Forgot your password? Click "Forgot password?" in the sign-in form above.
          </p>
        </div>
      </div>
    </div>
  );
}