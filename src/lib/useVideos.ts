import { useState, useEffect } from "react";
import { db, auth, storage } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface Video {
  id: string;
  title: string;
  artist: string;
  views: number;
  revenue: number;
  status: 'monetized' | 'pending' | 'not_monetized';
  uploadDate: string;
  userId: string;
  createdAt: any;
  fileUrl?: string;
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setVideos([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "videos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      setVideos(videosData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addVideo = async (video: Omit<Video, 'id' | 'userId' | 'createdAt'>, file?: File) => {
    if (!auth.currentUser) throw new Error("User not authenticated");

    let fileUrl = video.fileUrl;
    if (file) {
      const storageRef = ref(storage, `videos/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      await addDoc(collection(db, "videos"), {
        ...video,
        fileUrl,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding video:", err);
      throw err;
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "videos", id));
    } catch (err) {
      console.error("Error deleting video:", err);
      throw err;
    }
  };

  return { videos, loading, error, addVideo, deleteVideo };
};
