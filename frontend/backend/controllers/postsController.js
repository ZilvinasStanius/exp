import JobPosts from '../models/JobPostModel.js';

export async function getAllPosts(req, res) {
  const allPosts = JobPosts.findAll();

  if (!allPosts) {
    return res.status(404).json({ error: 'No posts found' });
  }

  res.status(200).json(allPosts);
}

export async function createPost(req, res) {
  const { title, description, salary } = req.body;

  try {
    if (req.body === undefined) {
      return res.statu(400).json({ error: 'Please fill all fields' });
    }
    const newPost = await JobPosts.create({ title, description, salary });

    res.status(200).json(newPost);
  } catch (error) {
    console.error('Error creating post', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await JobPosts.update(req.body, { where: { id } });
    res.status(200).json('Post updated');
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json('Post not found');
  }
  JobPosts.destroy({ where: { id } });
  res.status(200).json('Post deleted');
}

export async function getPostById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json('Post not found');
  }

  const foundPost = await JobPosts.findOne({ where: { id } });
  res.status(200).json(foundPost);
}
