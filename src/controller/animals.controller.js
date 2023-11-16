import { Animal } from "../models/Animal.js";
import { AnimalsList } from "../models/AnimalsList.js";

const animalsList = new AnimalsList();

function verifyImage(url) {
    var extensoesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    var extensao = url.split('.').pop().toLowerCase();

    return extensoesPermitidas.includes(extensao);
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

    let numerosErros = 0;
    let erros = [];



    if (!animal.name || !animal.type || !animal.age || !animal.color || !animal.image) {
        numerosErros++;
        erros.push("Todos os campos são obrigatórios!");
    }

    if (animal.name.length < 3 || animal.name.length > 50) {
        numerosErros++;
        erros.push("O nome do animal deve ter entre 3 e 50 caracteres!");
    }

    if (!Number.isInteger(animal.age)) {
        numerosErros++;
        erros.push("A idade do animal deve ser um número inteiro!");
    }

    if (animal.type.length > 30) {
        numerosErros++;
        erros.push("O tipo do animal deve ter até 30 caracteres!");
    }

    if (animal.color.length > 20) {
        numerosErros++;
        erros.push("A cor do animal deve ter até 20 caracteres!");
    }

    if (verifyImage(animal.image) == false) {
        numerosErros++;
        erros.push("A imagem deve ser uma URL válida!");
    }

    if (animal.vaccinated !== true && animal.vaccinated !== false) {
        numerosErros++;
        erros.push("O campo vaccinated deve ser um booleano (true ou false)!");
    }

    if (numerosErros > 0) {
        return res.status(400).send({
            errors: erros,
            status: "BAD REQUEST"
        });
    } else {
        animalsList.addAnimal(animal);
        return res.status(201).send(animal);
    }

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