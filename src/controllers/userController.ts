import { Request, Response, RequestHandler } from 'express';

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

export const getUsers: RequestHandler = (req, res) => {
    res.json(users);
};

export const createUser: RequestHandler = (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const getUserById: RequestHandler = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
};

export const updateUser: RequestHandler = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.json(user);
};

export const deleteUser: RequestHandler = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    users.splice(userIndex, 1);
    res.status(204).send();
};
