// auth.js

import { auth } from './firebase-config';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

// Function to log in with Google
const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error during Google login:', error);
    throw error;
  }
};

// Export login function
export { loginWithGoogle };
