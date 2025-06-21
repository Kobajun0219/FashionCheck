import { useState, useEffect } from 'react'
import { uploadImage, savePost, getPosts, addComment } from './firebaseService'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [newPostCaption, setNewPostCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [commentInputs, setCommentInputs] = useState({})

  // Load posts from Firebase on component mount
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoadingPosts(true)
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
      alert('Failed to load posts. Please check your Firebase configuration.')
    } finally {
      setLoadingPosts(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a preview URL for the selected file
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedFile({ file, preview: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPost = async () => {
    if (!selectedFile?.file || !newPostCaption.trim()) {
      alert('Please select an image and write a caption')
      return
    }

    try {
      setIsLoading(true)

      // Upload image to Firebase Storage
      const imageUrl = await uploadImage(selectedFile.file)

      // Save post to Firestore
      const newPost = await savePost(imageUrl, newPostCaption)

      // Add the new post to the beginning of the posts array
      setPosts([newPost, ...posts])

      // Reset form
      setNewPostCaption('')
      setSelectedFile(null)

      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please check your Firebase configuration.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddComment = async (postId) => {
    const commentText = commentInputs[postId]?.trim()

    if (!commentText) {
      alert('Please write a comment')
      return
    }

    try {
      // Add comment to Firebase
      const comment = await addComment(postId, commentText)

      // Update posts state to include the new comment
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment]
          }
        }
        return post
      }))

      // Clear the comment input for this post
      setCommentInputs(prev => ({
        ...prev,
        [postId]: ''
      }))
    } catch (error) {
      console.error('Error in handleAddComment:', error);

      // Show more specific error messages
      if (error.message.includes('does not exist')) {
        alert('Error: Post not found. Please refresh the page and try again.');
      } else if (error.code === 'permission-denied') {
        alert('Error: Permission denied. Please check your Firebase security rules.');
      } else if (error.code === 'unavailable') {
        alert('Error: Firebase service unavailable. Please check your internet connection.');
      } else {
        alert(`Failed to add comment: ${error.message}`);
      }
    }
  }

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>FashionCheck SNS</h1>
        <p>Share your fashion moments!</p>
      </header>

      {/* New Post Section */}
      <div className="new-post">
        <h2>Create New Post</h2>
        <div className="post-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {selectedFile?.preview && (
            <img src={selectedFile.preview} alt="Preview" className="image-preview" />
          )}
          <textarea
            placeholder="Write a caption..."
            value={newPostCaption}
            onChange={(e) => setNewPostCaption(e.target.value)}
            className="caption-input"
          />
          <button
            onClick={handleAddPost}
            className="post-button"
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="posts-feed">
        {loadingPosts ? (
          <div className="loading">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">No posts yet. Be the first to share!</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.imageUrl} alt="Post" className="post-image" />
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>

                {/* Comments Section */}
                <div className="comments-section">
                  <h3>Comments ({post.comments?.length || 0})</h3>
                  {post.comments && post.comments.length > 0 && (
                    <div className="comments">
                      {post.comments.map((comment, index) => (
                        <div key={comment.id || index} className="comment">
                          <strong>{comment.author}</strong>
                          {comment.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="add-comment">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                      className="comment-input"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id)
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="comment-button"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
