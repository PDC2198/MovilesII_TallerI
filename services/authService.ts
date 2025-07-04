import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  ref,
  set,
} from 'firebase/database';

import { auth, db } from '../firebaseConfig';

//REGISTRO
export const registerUser = async (
  email: string,
  password: string,
  nick: string,
  age: number
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    await updateProfile(user, {
      displayName: nick,
    });

    await set(ref(db, 'users/' + user.uid), {
      uid: user.uid,
      email,
      nick,
      age,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//LOGIN
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
