import { Animal } from "../models/Animal.js";
import { AnimalsList } from "../models/AnimalsList.js";

const animalsList = new AnimalsList();

export const getAllAnimals = async (req, res) => {
    const animals = animalsList.getAnimals();

    if (animals.length) {
        return res.status(200).json(animals);
    }
    return res.status(404).send({
        message: "Nenhum animal foi cadastrado!",
        status: "NOT FOUND"
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
    // return res.status(200).send({
    //     message: `Animal ${id} via controller!`,
    //     status: "OK"
    // });
}

export const createAnimal = async (req, res) => {
    const { name, type, age, color, image, vaccinated } = req.body;

    const animal = new Animal(name, type, age, color, image, vaccinated);

    animalsList.addAnimal(animal);

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