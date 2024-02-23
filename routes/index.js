const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validation');
const { body, param } = require('express-validator');


const { users } = require('../utils/storage');

router.post(
    '/users',
    [
        body('name')
            .isLength({ min: 5 })
            .withMessage('Name must be at least 5 characters long'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
    ],
    validation,
    (req, res) => {
        const currentUsersCount = Object.keys(users).length + 1;
        const user = req.body;

        users[currentUsersCount] = user;

        res.status(201).json({
            id: currentUsersCount,
            ...user
        });
    }
);


router.get('/users', (req, res) => {
    res.json(users);
})

router.get(
    '/users/:id',
    [
        param('id')
            .isInt({ min: 1 })
            .withMessage('ID must be a positive integer')
    ],
    validation,
    (req, res) => {
        const id = req.params.id;
        const user = users[id];

        if (user) {
            res.json({
                id,
                ...user
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
)

router.delete(
    '/users/:id',
    [
        param('id')
            .isInt({ min: 1 })
            .withMessage('ID must be a positive integer')
    ],
    validation,
    (req, res) => {
        const id = req.params.id;
        const user = users[id];

        if (user) {
            delete users[id];
            res.json({
                message: 'User ' + id + ' deleted'
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
)



module.exports = router;