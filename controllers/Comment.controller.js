const Comment = require('../models/Comment.model');
const Blog = require('../models/Blog.model');
const auth = require('../auth');

exports.addComment = async (req, res) => {
    const { blogId } = req.params;
    const { text } = req.body;
    try {
        const comment = new Comment({ text, blog: blogId, user: req.user.id });
        await comment.save();

        await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
        res.status(201).json({ message: 'Comment added', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCommentsByBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        const comments = await Comment.find({ blog: blogId }).populate('user', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment deleted', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
