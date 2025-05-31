import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#1a1a2e] to-[#16213e] text-white">
      <div className="bg-gray-900 bg-opacity-80 rounded-xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Sign Up at StreamFlix</h2>
        <p className="mb-6 text-gray-300">
          Please use the{" "}
          <span className="text-red-400 font-semibold">Sign Up</span> tab on the{" "}
          <span className="text-red-400 font-semibold">Login</span> page to create
          your account.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-500 transition"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}
