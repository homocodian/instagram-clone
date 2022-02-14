import { auth } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

type ContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const logout = () => {
  return signOut(auth);
};

const AuthContext = createContext<ContextType>({
  user: null,
  signInWithGoogle,
  signOut: logout,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // handle auth logic here...
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut: logout }}>
      {loading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
}
