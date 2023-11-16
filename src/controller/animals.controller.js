import { Animal } from "../models/Animal.js";
import { AnimalsList } from "../models/AnimalsList.js";

const animalsList = new AnimalsList();

const verifyImage = (url) => {
    url.match(/\.(jpeg|jpg|gif|png)$/)
}

export const getAllAnimals = async (req, res) => {
    let animals = animalsList.getAnimals();

    const type = req.query.type;

    if (type) {
        animals = animalsList.getAnimalByType(type);
    } else {
        animals = animalsList.getAnimals();
    }

    if (!animals) {
        return res.status(404).send({
            message: "Nenhum animal foi cadastrado!",
            status: "NOT FOUND"
        });
    }
    return res.status(200).send({
        totalAnimals: animals.length, animals
    });
}

export const getAnimalById = async (req, res) => {
    const { id } = req.params;
    const animal = animalsList.getAnimalById(id);

    if (!animal) {
        return res.status(404).send({
            message: `Animal ${id} não encontrado!`,
            status: "NOT FOUND"
        });
    }
    return res.send(animal);
}

export const createAnimal = async (req, res) => {
    const { name, type, age, color, image, vaccinated } = req.body;

    const animal = new Animal(name, type, age, color, image, vaccinated);

    animalsList.addAnimal(animal);

    if (!animal.name || !animal.type || !animal.age || !animal.color || !animal.image ) {
        return res.status(400).send({
            message: "Dados inválidos!",
            status: "BAD REQUEST"
        });
    }

    if (animal.name.length < 3 || animal.name.length > 50) {
        return res.status(400).send({
            message: "O nome do animal deve ter entre 3 e 50 caracteres!",
            status: "BAD REQUEST"
        });
    }

    if (!Number.isInteger(animal.age)) {
        return res.status(400).send({
            message: "A idade do animal deve ser um número inteiro!",
            status: "BAD REQUEST"
        });
    }

    if (animal.type.length > 30) {
        return res.status(400).send({
            message: "O tipo do animal deve ter até 30 caracteres!",
            status: "BAD REQUEST"
        });
    }

    if (animal.color.length > 20) {
        return res.status(400).send({
            message: "A cor do animal deve ter até 20 caracteres!",
            status: "BAD REQUEST"
        });
    }

    if (verifyImage(animal.image)) {
        return res.status(400).send({
            message: "Insira um URL válido!",
            status: "BAD REQUEST"
        });
    }

    if (animal.vaccinated !== true && animal.vaccinated !== false) {
        return res.status(400).send({
            message: "O campo vaccinated deve ser um booleano (true ou false)!",
            status: "BAD REQUEST"
        });
    }

    return res.status(201).send(animal);
}

export const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { name, type, age, color, image, vaccinated } = req.body;

    const animal = animalsList.getAnimalById(id);

    if (!animal) {
        return res.status(404).send({
            message: "Nenhum animal foi cadastrado!",
            status: "NOT FOUND"
        });
    }

    animalsList.updateAnimal(id, name, type, age, color, image, vaccinated);

    return res.send(animal);
}

export const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    const animal = animalsList.getAnimalById(id);

    if (!animal) res.status(404).send({
        message: `Animal ${id} não encontrado!`,
        status: "NOT FOUND"
    });

    animalsList.deleteAnimal(id);

    return res.send(animal);
}