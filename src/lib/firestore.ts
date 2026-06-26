import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { mockBusinesses } from "@/data/mockBusinesses";
import { mockPosts } from "@/data/mockPosts";
import { mockReviews } from "@/data/mockReviews";
import { Business, Post, Review } from "./types";

/**
 * Seeds initial mock data into Firestore for a newly registered or logged-in user.
 */
export async function seedInitialUserData(userId: string): Promise<void> {
  if (!userId) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create user root document
      await setDoc(userDocRef, {
        seeded: true,
        createdAt: new Date().toISOString(),
      });

      // Seed businesses
      for (const biz of mockBusinesses) {
        const bizDocRef = doc(db, `users/${userId}/businesses`, biz.id);
        await setDoc(bizDocRef, biz);

        // Seed posts for this business
        for (const post of mockPosts) {
          const postDocRef = doc(db, `users/${userId}/businesses/${biz.id}/posts`, post.id);
          await setDoc(postDocRef, post);
        }

        // Seed reviews for this business
        for (const review of mockReviews) {
          const reviewDocRef = doc(db, `users/${userId}/businesses/${biz.id}/reviews`, review.id);
          await setDoc(reviewDocRef, review);
        }
      }
      console.log("Successfully seeded initial Firestore data for user:", userId);
    }
  } catch (error) {
    console.error("Error seeding initial user data:", error);
  }
}

/**
 * Fetches businesses for a given user from Firestore.
 */
export async function getBusinesses(userId: string): Promise<Business[]> {
  if (!userId) return mockBusinesses;

  try {
    const bizCollectionRef = collection(db, `users/${userId}/businesses`);
    const snapshot = await getDocs(bizCollectionRef);

    if (snapshot.empty) {
      await seedInitialUserData(userId);
      return mockBusinesses;
    }

    const businesses: Business[] = [];
    snapshot.forEach((docSnap) => {
      businesses.push(docSnap.data() as Business);
    });

    return businesses;
  } catch (error) {
    console.error("Error fetching businesses from Firestore:", error);
    return mockBusinesses;
  }
}

/**
 * Adds a new business to Firestore for a user.
 */
export async function addBusiness(userId: string, businessData: Omit<Business, "id">): Promise<Business> {
  const newId = `biz-${Date.now()}`;
  const newBusiness: Business = {
    ...businessData,
    id: newId,
  };

  try {
    const bizDocRef = doc(db, `users/${userId}/businesses`, newId);
    await setDoc(bizDocRef, newBusiness);
    return newBusiness;
  } catch (error) {
    console.error("Error adding business to Firestore:", error);
    throw error;
  }
}

/**
 * Fetches posts for a specific business from Firestore.
 */
export async function getPosts(userId: string, businessId: string): Promise<Post[]> {
  if (!userId || !businessId) return mockPosts;

  try {
    const postsCollectionRef = collection(db, `users/${userId}/businesses/${businessId}/posts`);
    const snapshot = await getDocs(postsCollectionRef);

    if (snapshot.empty) {
      return mockPosts;
    }

    const posts: Post[] = [];
    snapshot.forEach((docSnap) => {
      posts.push(docSnap.data() as Post);
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    return mockPosts;
  }
}

/**
 * Adds a new post to Firestore for a specific business.
 */
export async function addPost(userId: string, businessId: string, postData: Omit<Post, "id">): Promise<Post> {
  const newId = `post-${Date.now()}`;
  const newPost: Post = {
    ...postData,
    id: newId,
  };

  try {
    const postDocRef = doc(db, `users/${userId}/businesses/${businessId}/posts`, newId);
    await setDoc(postDocRef, newPost);
    return newPost;
  } catch (error) {
    console.error("Error adding post to Firestore:", error);
    throw error;
  }
}

/**
 * Fetches reviews for a specific business from Firestore.
 */
export async function getReviews(userId: string, businessId: string): Promise<Review[]> {
  if (!userId || !businessId) return mockReviews;

  try {
    const reviewsCollectionRef = collection(db, `users/${userId}/businesses/${businessId}/reviews`);
    const snapshot = await getDocs(reviewsCollectionRef);

    if (snapshot.empty) {
      return mockReviews;
    }

    const reviews: Review[] = [];
    snapshot.forEach((docSnap) => {
      reviews.push(docSnap.data() as Review);
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews from Firestore:", error);
    return mockReviews;
  }
}
