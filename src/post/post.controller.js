import Post from './post.model.js'

export const save = async (req, res) => {
    try {
        const data = req.body

        const post = new Post(data)
        await post.save()

        return res.send({
            success: true,
            message: 'Post saved successfully',
            post
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when adding post',
            error: err.message
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const { limit, skip = 0 } = req.query
        const posts = await Post.find()
            .skip(Number(skip))
            .limit(Number(limit))

        if (posts.length === 0)
            return res.status(404).send({ success: false, message: 'No posts found' })

        return res.send({
            success: true,
            message: 'Posts found',
            posts,
            total: posts.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when retrieving posts',
            error: err.message
        })
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)

        if (!post)
            return res.status(404).send({ success: false, message: 'Post not found' })

        return res.send({
            success: true,
            message: 'Post found',
            post
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when retrieving post',
            error: err.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true })

        if (!updatedPost)
            return res.status(404).send({ success: false, message: 'Post not found' })

        return res.send({
            success: true,
            message: 'Post updated',
            post: updatedPost
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when updating post',
            error: err.message
        })
    }
}

export const eliminate = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findByIdAndDelete(id)

        if (!post)
            return res.status(404).send({ success: false, message: 'Post not found' })

        return res.send({
            success: true,
            message: 'Post deleted',
            post
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when deleting post',
            error: err.message
        })
    }
}

export const getPostsByCourse = async (req, res) => {
  try {
    const { course } = req.params 
    const posts = await Post.find({ course }).sort({ createdAt: -1 }) 
    if (posts.length === 0) {
      return res.status(404).send({ message: `No posts found for course: ${course}` }) 
    }
    res.status(200).send(posts) 
  } catch (error) {
    res.status(500).send({ message: 'Error fetching filtered posts', error }) 
  }
}

export const getPostsByYear = async (req, res) => {
  try {
    const { year } = req.params 
    const posts = await Post.find({ year }).sort({ year: -1 }) 
    if (posts.length === 0) {
      return res.status(404).send({ message: `No posts found for year: ${year}` }) 
    }
    res.status(200).send(posts) 
  } catch (error) {
    res.status(500).send({ message: 'Error fetching filtered posts', error }) 
  }
} 