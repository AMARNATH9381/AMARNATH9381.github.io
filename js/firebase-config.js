// Firebase Configuration for Article Management System
// Using Firebase SDK via CDN (compatible with static websites)

const firebaseConfig = {
  apiKey: "AIzaSyAZYfo7ACky88-4ROCWbX2vxOe8QMbka1Q",
  authDomain: "profile-static-website.firebaseapp.com",
  projectId: "profile-static-website",
  storageBucket: "profile-static-website.firebasestorage.app",
  messagingSenderId: "379956665188",
  appId: "1:379956665188:web:e4a991ef4ce9b050dbf871",
  measurementId: "G-R6KJ43YWRK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Articles collection reference
const articlesCollection = db.collection('articles');

// ============ ARTICLE FUNCTIONS ============

// Get all articles
async function getAllArticles() {
  try {
    const snapshot = await articlesCollection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Get single article by ID
async function getArticleById(articleId) {
  try {
    const doc = await articlesCollection.doc(articleId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Save new article
async function firebaseSaveArticle(articleData) {
  try {
    const docRef = await articlesCollection.add({
      ...articleData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving article:', error);
    throw error;
  }
}

// Update existing article
async function updateArticle(articleId, articleData) {
  try {
    await articlesCollection.doc(articleId).update({
      ...articleData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
}

// Delete article
async function deleteArticle(articleId) {
  try {
    await articlesCollection.doc(articleId).delete();
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

// Get articles by category
async function getArticlesByCategory(category) {
  try {
    const snapshot = await articlesCollection
      .where('category', '==', category)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

console.log('Firebase initialized successfully!');
