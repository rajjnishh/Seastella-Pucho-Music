import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './useAuth';

export function useDashboardData() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [royalties, setRoyalties] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const analyticsRef = doc(db, 'analytics', user.uid);
    const royaltiesRef = doc(db, 'royalties', user.uid);

    const unsubAnalytics = onSnapshot(analyticsRef, (snapshot) => {
      if (snapshot.exists()) {
        setAnalytics(snapshot.data());
      } else {
        setAnalytics({
          totalStreams: 0,
          monthlyListeners: 0,
          topTracks: [],
          engagementRate: 0,
          platformDistribution: [
            { name: "Spotify", percentage: 0, color: "bg-emerald-500" },
            { name: "Apple Music", percentage: 0, color: "bg-rose-500" },
            { name: "YouTube Music", percentage: 0, color: "bg-red-600" },
            { name: "Others", percentage: 0, color: "bg-blue-500" },
          ]
        });
      }
    }, (err) => {
      console.error("Error fetching analytics:", err);
      setError("Failed to load analytics");
    });

    const unsubRoyalties = onSnapshot(royaltiesRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoyalties(snapshot.data());
      } else {
        setRoyalties({
          balance: 0,
          pending: 0,
          history: []
        });
      }
    }, (err) => {
      console.error("Error fetching royalties:", err);
      setError("Failed to load royalties");
    });

    setLoading(false);

    return () => {
      unsubAnalytics();
      unsubRoyalties();
    };
  }, [user]);

  return { analytics, royalties, loading, error };
}
