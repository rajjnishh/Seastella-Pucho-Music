import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: string;
  releaseDate: string;
  status: 'live' | 'pending' | 'processing' | 'action_needed';
  upc: string;
  platforms: string;
  userId: string;
  createdAt: any;
}

export const useReleases = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setReleases([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "releases"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const releasesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Release[];
      
      // Sort by createdAt desc if available
      releasesData.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });

      setReleases(releasesData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching releases:", err);
      setError("Failed to load releases");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addRelease = async (release: Omit<Release, 'id' | 'userId' | 'createdAt'>) => {
    if (!auth.currentUser) throw new Error("User not authenticated");

    try {
      await addDoc(collection(db, "releases"), {
        ...release,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding release:", err);
      throw err;
    }
  };

  const deleteRelease = async (id: string) => {
    try {
      await deleteDoc(doc(db, "releases", id));
    } catch (err) {
      console.error("Error deleting release:", err);
      throw err;
    }
  };

  const updateRelease = async (id: string, data: Partial<Release>) => {
    try {
      await updateDoc(doc(db, "releases", id), data);
    } catch (err) {
      console.error("Error updating release:", err);
      throw err;
    }
  };

  return { releases, loading, error, addRelease, deleteRelease, updateRelease };
};
