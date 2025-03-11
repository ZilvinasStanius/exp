import { useContext } from 'react';
import { PostContext } from '../context/PostsContext';

export default function useAddPost() {
  const { setPosts } = useContext(PostContext);

  async function addPost(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const postData = {
      title: formData.get('title'),
      description: formData.get('description'),
      salary: Number(formData.get('salary')),
    };

    const promise = await fetch('http://localhost:3000/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (promise.ok) {
      const response = await promise.json();
      console.log(response);
      setPosts((prevPosts) => [response, ...prevPosts]);
    }
  }

  return { addPost };
}
