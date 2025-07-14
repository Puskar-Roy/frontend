import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { apiRoutes } from "../lib/apiRoutes";
import { useAuth } from "../context/AuthContext";
import { createAPIClient } from "../lib/apiClient";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { token } = useAuth(); 
  const api = createAPIClient(() => token); 

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      
      await api.POST(apiRoutes.login, { idToken }, { withAuth: false });

      router.push("/chat");
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err: any) {
      console.error("Logout Error:", err);
      setError("Failed to logout. Try again.");
    }
  };

  return {
    loginWithGoogle,
    logout,
    loading,
    error,
  };
};
