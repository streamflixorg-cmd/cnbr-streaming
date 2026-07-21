import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const COLLECTION = "series";

export async function getSeries() {

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

export async function addSeries(series) {

  await addDoc(
    collection(db, COLLECTION),
    {
      ...series,
      createdAt: Date.now()
    }
  );

}

export async function updateSeries(id, series) {

  await updateDoc(
    doc(db, COLLECTION, id),
    series
  );

}

export async function deleteSeries(id) {

  await deleteDoc(
    doc(db, COLLECTION, id)
  );

}