import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTier, setUserTier] = useState(() => {
    return localStorage.getItem('pva_user_tier') || 'FREE';
  });

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Solar Inspector',
          email: currentUser.email,
          photoURL: currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.email}`
        });
      } else {
        // Fallback or guest user check
        const savedGuest = localStorage.getItem('pva_guest_user');
        if (savedGuest) {
          setUser(JSON.parse(savedGuest));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (auth) {
        const result = await signInWithPopup(auth, googleProvider);
        setUser({
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        });
        return result.user;
      }
    } catch (error) {
      console.warn("Firebase Auth Error, using fallback guest auth:", error.message);
    }
    
    // Mock login fallback for testing
    const mockUser = {
      uid: 'google-mock-' + Date.now(),
      displayName: 'Rajat Goyal (Google)',
      email: 'rajat.goyal@solar-pro.com',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(mockUser);
    localStorage.setItem('pva_guest_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = async () => {
    try {
      if (auth) await firebaseSignOut(auth);
    } catch (e) {
      console.log('Logout error', e);
    }
    setUser(null);
    localStorage.removeItem('pva_guest_user');
  };

  const upgradeToPro = () => {
    setUserTier('PRO');
    localStorage.setItem('pva_user_tier', 'PRO');
  };

  const downgradeToFree = () => {
    setUserTier('FREE');
    localStorage.setItem('pva_user_tier', 'FREE');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      userTier,
      isPro: userTier === 'PRO',
      loginWithGoogle,
      logout,
      upgradeToPro,
      downgradeToFree
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
