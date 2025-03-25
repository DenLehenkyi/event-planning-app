import { signInWithGoogle } from "@/lib/firebase/firebaseAuthServices";

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Помилка входу через Google:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-800 transition"
    >
      <svg
        className="w-6 h-9 mr-2"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          fill="#fff"
        />
        <path
          d="M6.6 14.7l7.4 5.5c1.9-3.6 5.6-6.2 9.9-6.2 3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 6.3 6.6 14.7z"
          fill="#EA4335"
        />
        <path
          d="M24 44c5.9 0 11.2-2.1 15.4-5.5l-7-5.5c-2.2 1.5-4.9 2.4-8.4 2.4-4.1 0-7.7-2.1-9.9-5.5H6.6v6.8C9.6 41.7 16.3 44 24 44z"
          fill="#34A853"
        />
        <path
          d="M44.5 20H24v8.5h11.8c-1.1 3.1-3.3 5.5-6.3 7l7 5.5c3.9-3.6 6.5-9 6.5-15.5 0-1.3-.2-2.7-.5-4z"
          fill="#4A90E2"
        />
        <path
          d="M14.1 28.5c-.9-1.3-1.5-2.8-1.5-4.5s.6-3.2 1.5-4.5l-7.4-5.5v11.8l7.4 5.5z"
          fill="#FBBC05"
        />
      </svg>
      Увійти через Google
    </button>
  );
};

export default GoogleSignInButton;
