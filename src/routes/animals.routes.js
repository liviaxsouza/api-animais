import { Router } from 'express';
import { getAllAnimals } from '../controller/animals.controller.js';
import { getAnimalById } from '../controller/animals.controller.js';
import { createAnimal } from '../controller/animals.controller.js';
import { updateAnimal } from '../controller/animals.controller.js';
import { deleteAnimal } from '../controller/animals.controller.js';

const animalsRouter = Router();

animalsRouter.get('/', getAllAnimals);

animalsRouter.get('/:id', getAnimalById);

animalsRouter.post('/', createAnimal);

animalsRouter.put('/:id', updateAnimal);

animalsRouter.delete('/:id', deleteAnimal);

export default animalsRouter;