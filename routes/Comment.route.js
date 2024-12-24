const express = require('express');
const router = express.Router();
const { 
    addComment, 
    getCommentsByBlog, 
    deleteComment 
} = require('../controllers/Comment.controller');
const { verify,verifyAdmin } = require('../auth.js');

router.post('/add/:blogId', verify, addComment); // Add a comment to a blog
router.get('/blog/:blogId', getCommentsByBlog); // View comments for a blog post
router.delete('/:commentId', verify, deleteComment); // Delete own comment
router.delete('/admin/:commentId', verify, verifyAdmin, deleteComment); // Admin deletes any comment

module.exports = router;
