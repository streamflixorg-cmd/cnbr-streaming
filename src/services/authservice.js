import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "../firebase/auth";

export async function login(email, password) {
    return signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function logout() {
    return signOut(auth);
}

export function authListener(callback) {
    return onAuthStateChanged(auth, callback);
}