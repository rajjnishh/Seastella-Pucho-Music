import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { SiteSettings } from "./useAdmin";

export const useSiteConfig = () => {
  const [siteConfig, setSiteConfig] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "site_settings", "global"), (snapshot) => {
      if (snapshot.exists()) {
        setSiteConfig(snapshot.data() as SiteSettings);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { siteConfig, loading };
};
