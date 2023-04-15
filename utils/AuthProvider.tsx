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
import Login from "pages/login";

type ContextType = {
	user: User | null;
	loading: boolean;
	signOut: () => Promise<void>;
	signInWithGoogle: () => Promise<UserCredential>;
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
	loading: true,
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
		<AuthContext.Provider
			value={{ user, loading, signInWithGoogle, signOut: logout }}
		>
			{loading ? <SplashScreen /> : !user ? <Login /> : children}
		</AuthContext.Provider>
	);
}
