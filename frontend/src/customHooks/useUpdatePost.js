import { useContext } from 'react';
import { PostContext } from '../context/PostsContext';

export default function useUpdatePost() {
  const { setPosts } = useContext(PostContext);
  async function updatePost(e, id) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updateData = {
      title: formData.get('title'),
      description: formData.get('description'),
      salary: Number(formData.get('salary')),
    };

    const promise = await fetch(
      `http://localhost:3000/api/posts/updatePost/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      }
    );

    const response = await promise.json();
    console.log(promise);
    if (promise.ok) {
      setPosts((prevPost) =>
        prevPost.map((post) => (post.id === id ? response : post))
      );
    }
  }
  return { updatePost };
}
