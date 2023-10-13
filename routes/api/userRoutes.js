const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControl');

// Get + Post All Users
router.route('/')
.get(getAllUsers)
.post(createUser);

// Get User ID, Update(Post) By User Id, abd Delete By User Id
router.route('/:userID')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

// Add (Post) Friend By Id + Delete Friend By Id
router.route('/:userID/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
