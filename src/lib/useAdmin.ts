import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, setDoc, addDoc } from "firebase/firestore";

export interface AdminUser {
  id: string;
  email: string;
  displayName?: string;
  role: 'artist' | 'admin';
  createdAt: any;
}

export interface AdminRelease {
  id: string;
  title: string;
  artist: string;
  type: string;
  status: string;
  userId: string;
  createdAt: any;
}

export interface AdminArtist {
  id: string;
  name: string;
  genre: string;
  status: string;
  userId: string;
  createdAt: any;
}

export interface AdminVideo {
  id: string;
  title: string;
  artist: string;
  status: string;
  views: number;
  revenue: number;
  userId: string;
  createdAt: any;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  published: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalReleases: number;
  totalArtists: number;
  totalVideos: number;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const useAdmin = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [releases, setReleases] = useState<AdminRelease[]>([]);
  const [artists, setArtists] = useState<AdminArtist[]>([]);
  const [videos, setAdminVideos] = useState<AdminVideo[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 0,
    totalReleases: 0,
    totalArtists: 0,
    totalVideos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribes: (() => void)[] = [];

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      // Clean up previous listeners if any
      unsubscribes.forEach(unsub => unsub());
      unsubscribes = [];

      if (!user) {
        setLoading(false);
        return;
      }

      const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AdminUser[];
        setUsers(usersData);
        setAdminStats(prev => ({ ...prev, totalUsers: usersData.length }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "users");
      });
      unsubscribes.push(unsubscribeUsers);

      const unsubscribeReleases = onSnapshot(collection(db, "releases"), (snapshot) => {
        const releasesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AdminRelease[];
        setReleases(releasesData);
        setAdminStats(prev => ({ ...prev, totalReleases: snapshot.size }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "releases");
      });
      unsubscribes.push(unsubscribeReleases);

      const unsubscribeArtists = onSnapshot(collection(db, "artists"), (snapshot) => {
        const artistsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AdminArtist[];
        setArtists(artistsData);
        setAdminStats(prev => ({ ...prev, totalArtists: snapshot.size }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "artists");
      });
      unsubscribes.push(unsubscribeArtists);

      const unsubscribeVideos = onSnapshot(collection(db, "videos"), (snapshot) => {
        const videosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AdminVideo[];
        setAdminVideos(videosData);
        setAdminStats(prev => ({ ...prev, totalVideos: snapshot.size }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "videos");
      });
      unsubscribes.push(unsubscribeVideos);

      const unsubscribeSettings = onSnapshot(doc(db, "site_settings", "global"), (snapshot) => {
        if (snapshot.exists()) {
          setSiteSettings(snapshot.data() as SiteSettings);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, "site_settings/global");
      });
      unsubscribes.push(unsubscribeSettings);

      const unsubscribeServices = onSnapshot(query(collection(db, "services"), orderBy("order")), (snapshot) => {
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[]);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "services");
      });
      unsubscribes.push(unsubscribeServices);

      const unsubscribePricing = onSnapshot(collection(db, "pricing_plans"), (snapshot) => {
        setPricingPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PricingPlan[]);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "pricing_plans");
      });
      unsubscribes.push(unsubscribePricing);

      const unsubscribeStats = onSnapshot(query(collection(db, "stats"), orderBy("order")), (snapshot) => {
        setStats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Stat[]);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "stats");
      });
      unsubscribes.push(unsubscribeStats);

      const unsubscribeBlog = onSnapshot(query(collection(db, "blog_posts"), orderBy("date", "desc")), (snapshot) => {
        setBlogPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "blog_posts");
      });
      unsubscribes.push(unsubscribeBlog);

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribes.forEach(unsub => unsub());
    };
  }, []);

  const updateUserRole = async (userId: string, newRole: 'artist' | 'admin') => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${userId}`);
    }
  };

  const deleteRelease = async (id: string) => {
    try {
      await deleteDoc(doc(db, "releases", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `releases/${id}`);
    }
  };

  const deleteArtist = async (id: string) => {
    try {
      await deleteDoc(doc(db, "artists", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `artists/${id}`);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "videos", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `videos/${id}`);
    }
  };

  const updateReleaseStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "releases", id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `releases/${id}`);
    }
  };

  const updateArtistStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "artists", id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `artists/${id}`);
    }
  };

  const updateVideoStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "videos", id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `videos/${id}`);
    }
  };

  const updateSiteSettings = async (settings: SiteSettings) => {
    try {
      await setDoc(doc(db, "site_settings", "global"), settings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "site_settings/global");
    }
  };

  const saveService = async (service: Partial<Service>) => {
    try {
      if (service.id) {
        await updateDoc(doc(db, "services", service.id), service);
      } else {
        await addDoc(collection(db, "services"), service);
      }
    } catch (error) {
      handleFirestoreError(error, service.id ? OperationType.UPDATE : OperationType.CREATE, service.id ? `services/${service.id}` : "services");
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  const savePricingPlan = async (plan: Partial<PricingPlan>) => {
    try {
      if (plan.id) {
        await updateDoc(doc(db, "pricing_plans", plan.id), plan);
      } else {
        await addDoc(collection(db, "pricing_plans"), plan);
      }
    } catch (error) {
      handleFirestoreError(error, plan.id ? OperationType.UPDATE : OperationType.CREATE, plan.id ? `pricing_plans/${plan.id}` : "pricing_plans");
    }
  };

  const deletePricingPlan = async (id: string) => {
    try {
      await deleteDoc(doc(db, "pricing_plans", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `pricing_plans/${id}`);
    }
  };

  const saveBlogPost = async (post: Partial<BlogPost>) => {
    try {
      const postData = {
        ...post,
        author: post.author || auth.currentUser?.displayName || "Admin",
        date: post.date || new Date().toISOString(),
        published: post.published ?? true
      };

      if (post.id) {
        const { id, ...data } = postData;
        await updateDoc(doc(db, "blog_posts", id), data);
      } else {
        await addDoc(collection(db, "blog_posts"), postData);
      }
    } catch (error) {
      handleFirestoreError(error, post.id ? OperationType.UPDATE : OperationType.CREATE, post.id ? `blog_posts/${post.id}` : "blog_posts");
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blog_posts", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blog_posts/${id}`);
    }
  };

  const saveStat = async (stat: Partial<Stat>) => {
    try {
      if (stat.id) {
        await updateDoc(doc(db, "stats", stat.id), stat);
      } else {
        await addDoc(collection(db, "stats"), stat);
      }
    } catch (error) {
      handleFirestoreError(error, stat.id ? OperationType.UPDATE : OperationType.CREATE, stat.id ? `stats/${stat.id}` : "stats");
    }
  };

  const deleteStat = async (id: string) => {
    try {
      await deleteDoc(doc(db, "stats", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `stats/${id}`);
    }
  };

  return { 
    users, 
    releases, 
    artists, 
    videos, 
    siteSettings,
    services,
    pricingPlans,
    stats,
    blogPosts,
    adminStats, 
    loading, 
    updateUserRole, 
    deleteUser,
    deleteRelease,
    deleteArtist,
    deleteVideo,
    updateReleaseStatus,
    updateArtistStatus,
    updateVideoStatus,
    updateSiteSettings,
    saveService,
    deleteService,
    savePricingPlan,
    deletePricingPlan,
    saveStat,
    deleteStat,
    saveBlogPost,
    deleteBlogPost
  };
};
