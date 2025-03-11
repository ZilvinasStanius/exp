import { useContext } from 'react';
import { PostContext } from '../context/PostsContext';

export default function useDeletePost() {
  const { posts, setPosts } = useContext(PostContext);
  async function deletePost(postId) {
    const promise = await fetch(
      `http://localhost:3000/api/posts/deletePost/${postId}`,
      { method: 'DELETE' }
    );

    const filteredPosts = posts.filter((post) => post.id !== postId);

    if (promise.ok) {
      setPosts(filteredPosts);
      alert('post deleted');
    }
  }
  return { deletePost };
}
