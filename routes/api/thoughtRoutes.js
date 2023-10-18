const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtControl')

// Get + Post All Thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);


// Get + Put + Delete Thoughts
router.route('/:thoughtId')
.get(getThoughtsById)
.put(updateThoughtById)
.delete(deleteThought);

// Post Reaction to Thought
router.route('/:thoughtId/reactions')
.post(createReaction);

// Delete Reaction to Thought
router.route(':thoughtID/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;







