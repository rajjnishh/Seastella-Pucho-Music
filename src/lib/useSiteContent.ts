import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, doc, query, orderBy } from "firebase/firestore";
import { SiteSettings, Service, PricingPlan, BlogPost, Stat } from "./useAdmin";

export const useSiteContent = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    const total = 5;
    const checkLoading = () => {
      count++;
      if (count >= total) setLoading(false);
    };

    const unsubscribeSettings = onSnapshot(doc(db, "site_settings", "global"), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data() as SiteSettings);
      }
      checkLoading();
    }, (error) => {
      console.error("Error fetching settings:", error);
      checkLoading();
    });

    const unsubscribeServices = onSnapshot(query(collection(db, "services"), orderBy("order")), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[]);
      checkLoading();
    }, (error) => {
      console.error("Error fetching services:", error);
      checkLoading();
    });

    const unsubscribePlans = onSnapshot(collection(db, "pricing_plans"), (snapshot) => {
      const plansData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PricingPlan[];
      console.log("Fetched plans from CMS:", plansData);
      setPlans(plansData);
      checkLoading();
    }, (error) => {
      console.error("Error fetching plans:", error);
      checkLoading();
    });

    const unsubscribeStats = onSnapshot(query(collection(db, "stats"), orderBy("order")), (snapshot) => {
      setStats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Stat[]);
      checkLoading();
    }, (error) => {
      console.error("Error fetching stats:", error);
      checkLoading();
    });

    const unsubscribeBlog = onSnapshot(query(collection(db, "blog_posts"), orderBy("date", "desc")), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);
      checkLoading();
    }, (error) => {
      console.error("Error fetching blog posts:", error);
      checkLoading();
    });

    return () => {
      unsubscribeSettings();
      unsubscribeServices();
      unsubscribePlans();
      unsubscribeStats();
      unsubscribeBlog();
    };
  }, []);

  return { settings, services, plans, stats, posts, loading };
};
