import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface Artist {
  id: string;
  name: string;
  email: string;
  spotifyId?: string;
  appleId?: string;
  tracks: number;
  status: 'active' | 'pending' | 'inactive';
  userId: string;
  createdAt: any;
}

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setArtists([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "artists"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const artistsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Artist[];
      
      setArtists(artistsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching artists:", err);
      setError("Failed to load artists");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addArtist = async (artist: Omit<Artist, 'id' | 'userId' | 'createdAt'>) => {
    if (!auth.currentUser) throw new Error("User not authenticated");

    try {
      await addDoc(collection(db, "artists"), {
        ...artist,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding artist:", err);
      throw err;
    }
  };

  const deleteArtist = async (id: string) => {
    try {
      await deleteDoc(doc(db, "artists", id));
    } catch (err) {
      console.error("Error deleting artist:", err);
      throw err;
    }
  };

  return { artists, loading, error, addArtist, deleteArtist };
};
