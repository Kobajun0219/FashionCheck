import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  arrayUnion,
  getDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from './firebase';

// Upload image to Firebase Storage
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Save post to Firestore
export const savePost = async (imageUrl, caption) => {
  try {
    const postData = {
      imageUrl,
      caption,
      createdAt: serverTimestamp(),
      comments: []
    };

    const docRef = await addDoc(collection(db, 'posts'), postData);
    return { id: docRef.id, ...postData };
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

// Get all posts from Firestore
export const getPosts = async () => {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Add comment to a post
export const addComment = async (postId, commentText, author) => {
  try {
    console.log('Adding comment to post:', postId);
    console.log('Comment text:', commentText);

    const postRef = doc(db, 'posts', postId);

    // First, let's verify the post exists
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      throw new Error(`Post with ID ${postId} does not exist`);
    }

    console.log('Post exists, current data:', postDoc.data());

    // Create the comment object with regular timestamp instead of serverTimestamp
    const comment = {
      id: Date.now(),
      text: commentText,
      author: author || `User${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString() // Use regular timestamp
    };

    console.log('Comment object to add:', comment);

    // Use arrayUnion to add the comment to the comments array
    await updateDoc(postRef, {
      comments: arrayUnion(comment)
    });

    console.log('Comment added successfully');
    return comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
};
