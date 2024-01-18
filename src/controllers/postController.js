//GET ALL POSTS
export const getAllPosts = async (req, res) => {
  res.status(200).json({ msg: 'getAllPosts' });
};

// CREATE POST
export const createPost = async (req, res) => {
  res.status(200).json({ msg: 'createPost' });
};

// GET POST BY ID
export const getPostById = async (req, res) => {
  res.status(200).json({ msg: 'getPostById' });
};

// GET TOTAL POSTS
export const getTotalPosts = async (req, res) => {
  res.status(200).json({ msg: 'getTotalPosts' });
};
