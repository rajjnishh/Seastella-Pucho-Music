import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface Channel {
  id: string;
  name: string;
  url: string;
  subscribers: number;
  status: 'approved' | 'pending' | 'rejected';
  linkedDate: string;
  userId: string;
  createdAt: any;
}

export const useChannels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setChannels([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "channels"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channelsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Channel[];
      
      setChannels(channelsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching channels:", err);
      setError("Failed to load channels");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addChannel = async (channel: Omit<Channel, 'id' | 'userId' | 'createdAt'>) => {
    if (!auth.currentUser) throw new Error("User not authenticated");

    try {
      await addDoc(collection(db, "channels"), {
        ...channel,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding channel:", err);
      throw err;
    }
  };

  const deleteChannel = async (id: string) => {
    try {
      await deleteDoc(doc(db, "channels", id));
    } catch (err) {
      console.error("Error deleting channel:", err);
      throw err;
    }
  };

  return { channels, loading, error, addChannel, deleteChannel };
};
