const { User } = require('../models');

const userControl = {

    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findById(req.params.userID)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err))
    },

    // createUser(req, res) {
    //     User.create(req.body)
    //     .then(userData => res.json(userData))
    //     .catch(err => res.status(500).json(err));
    // },

    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
          .then(userData => {
            if (!userData) {
              return res.status(404).json({ message: 'User not found' });
            }
            res.json(userData);
          })
          .catch(err => res.status(500).json(err));
      },

      deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted'});
        })
        .catch(err => res.status(500).json(err));
      },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $addToSet: { friends: req.body.friendID } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User ID not found' })
                } else {
                return res.json(user)}
            })
            .catch((err) => res.status(500).json(err));
    },

      deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { friends: req.params.friendID } },
            { new: true }
        )
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User Id note found'})
            } else {
                return res.json(user)
            }
      })
        .catch((err) => res.status(500).json(err));
      }
    };

    module.exports = userControl;
