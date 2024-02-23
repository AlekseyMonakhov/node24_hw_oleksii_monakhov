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
        const user = {
            ...req.body,
            id: Date.now()
        };

        users.push(user);

        res.status(201).json({
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
        const id = Number(req.params.id);
        const user = users.find((u) => u.id === id);

        if (user) {
            res.json({
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
        const id = Number(req.params.id);
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex >= 0) {
            users.splice(userIndex, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
)



module.exports = router;
