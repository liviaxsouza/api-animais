import { Router } from 'express';
import animalsRouter from './animals.routes.js';

const routes = Router();

routes.use('/animals', animalsRouter);

routes.get('/', (req, res) => {
    return res.status(200).send({
        message: "Servidor OK!"
    });
});

export default routes;