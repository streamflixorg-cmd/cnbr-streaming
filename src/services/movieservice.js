import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const COLLECTION = "movies";

export async function getMovies() {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addMovie(movie) {
  await addDoc(collection(db, COLLECTION), {
    ...movie,
    createdAt: Date.now()
  });
}

export async function updateMovie(id, movie) {
  await updateDoc(doc(db, COLLECTION, id), movie);
}

export async function deleteMovie(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}