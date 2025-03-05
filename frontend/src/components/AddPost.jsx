import useAddPost from '../customHooks/useAddPost';
import { PostContext } from '../context/PostsContext';
import { useContext, useState } from 'react';
import useDeletePost from '../customHooks/useDeletePost';
import { Link } from 'react-router-dom';
import useUpdatePost from '../customHooks/useUpdatePost';

export default function AddPost() {
  const { addPost } = useAddPost();
  const { deletePost } = useDeletePost();
  const { posts } = useContext(PostContext);
  const { updatePost } = useUpdatePost();

  const [isEditable, setIsEditable] = useState(null);
  console.log(isEditable);
  if (isEditable) {
    return (
      <>
        <div>Edit post</div>
        <form
          key={isEditable.id}
          onSubmit={async (e) => {
            await updatePost(e, isEditable.id);
            setIsEditable(null);
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Job title"
            defaultValue={isEditable.title}
          />
          <textarea
            type="text"
            name="description"
            placeholder="About job"
            defaultValue={isEditable.description}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            min={100}
            defaultValue={isEditable.salary}
          />
          <button type="submit">Update Post</button>
          <span>
            <b>
              <Link onClick={() => setIsEditable(null)}>Back to list</Link>
            </b>
          </span>
        </form>
      </>
    );
  }

  return (
    <>
      <div>Add post</div>
      <form onSubmit={addPost}>
        <input
          type="text"
          name="title"
          placeholder="Job title"
          defaultValue={''}
          required
        />
        <textarea
          type="text"
          name="description"
          placeholder="About job"
          required
          defaultValue={''}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          min={100}
          defaultValue={''}
          required
        />
        <button type="submit">Share post</button>
        <span>
          <b></b>
        </span>
      </form>

      <ul>
        {posts.map((post, index) => (
          <li key={`post-${index}`}>
            {post.title} || {post.description} || {post.salary} €{' '}
            <Link onClick={() => deletePost(post.id)}>Delete</Link>
            <Link onClick={() => setIsEditable(post)}>Edit</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
