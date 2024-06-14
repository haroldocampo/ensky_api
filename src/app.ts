import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from './db';
import { DataTypes, QueryTypes } from 'sequelize';
import * as investmentController from './controllers/investmentController';
import * as userController from './controllers/userController';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
    });

app.get('/', async (req, res, next) => {
    try {
        const result: any = await sequelize.query('SELECT NOW() as current_time', { type: QueryTypes.SELECT });
        const currentTime = result[0].current_time;
        res.send(`Current time is: ${currentTime}`);
    } catch (error) {
        next(error);
    }
});

app.get('/investments', investmentController.getAllInvestments);
app.post('/investments', investmentController.createInvestment);
app.put('/investments/:id', investmentController.updateInvestment);
app.delete('/investments/:id', investmentController.deleteInvestment);
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.use((err: any, req: any, res: any, next: any) => {
    console.error('Error:', err);
    res.status(500).send('Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});