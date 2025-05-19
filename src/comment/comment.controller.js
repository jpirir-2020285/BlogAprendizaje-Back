import Commentary from './comment.model.js'
import Post from '../post/post.model.js'

export const save = async (req, res) => {
    try {
        const data = req.body
        const post = await Post.findById(data.post)

        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' })
        }

        const commentary = new Commentary(data)
        await commentary.save()

        return res.send({
            success: true,
            message: 'Commentary saved successfully',
            commentary
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when adding commentary',
            error: err.message
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const { postId, limit, skip = 0 } = req.query
        const commentaries = await Commentary.find({ post: postId })
            .skip(Number(skip))
            .limit(Number(limit))

        if (commentaries.length === 0)
            return res.status(404).send({ success: false, message: 'No commentaries found for this post' })

        return res.send({
            success: true,
            message: 'Commentaries found',
            commentaries,
            total: commentaries.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when retrieving commentaries',
            error: err.message
        })
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const commentary = await Commentary.findById(id)

        if (!commentary)
            return res.status(404).send({ success: false, message: 'Commentary not found' })

        return res.send({
            success: true,
            message: 'Commentary found',
            commentary
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when retrieving commentary',
            error: err.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedCommentary = await Commentary.findByIdAndUpdate(id, data, { new: true })

        if (!updatedCommentary)
            return res.status(404).send({ success: false, message: 'Commentary not found' })

        return res.send({
            success: true,
            message: 'Commentary updated',
            commentary: updatedCommentary
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when updating commentary',
            error: err.message
        })
    }
}

export const eliminate = async (req, res) => {
    try {
        const { id } = req.params
        const commentary = await Commentary.findByIdAndDelete(id)

        if (!commentary)
            return res.status(404).send({ success: false, message: 'Commentary not found' })

        return res.send({
            success: true,
            message: 'Commentary deleted',
            commentary
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error when deleting commentary',
            error: err.message
        })
    }
}

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const postExists = await Post.findById(postId);
        if (!postExists) return res.status(404).send({ message: 'Post not found' });

        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, message: 'Comments retrieved successfully', comments });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error retrieving comments', error });
    }
}