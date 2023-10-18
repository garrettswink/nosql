const { Thought } = require('../models');

const thoughtControl = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtID });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' })
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req,res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
      },

    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtID, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtID },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true, upsert: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Not found' });
            }
            return res.json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // async deleteReaction(req, res) {
    //     try {
    //         const thought = await Thought.findOneAndUpdate(
    //             { _id: req.params.thoughtID },
    //             { $pull: { reactions: { reactionID: req.params.reactionID } } },
    //             { runValidators: true, new: true }
    //         );
    //         if (!thought) {
    //             return res.status(404).json({ message: 'Not Found' });
    //         }
    //         // If the thought was successfully updated, it means the reaction was deleted.
    //         return res.json({ message: 'Reaction deleted successfully' });
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // },

}

module.exports = thoughtControl;


