export class AnimalsList {
    constructor() {
        this.animals = [];
    }

    getAnimals() {
        return this.animals;
    }

    getAnimalById(id) {
        return this.animals.find((animal) => animal.id === id)
    }

    addAnimal(animal) {
        this.animals.push(animal);
    }

    updateAnimal(id, name, type, age, color, image, vaccinated) {
        const animal = this.getAnimalById(id);

        if(animal) {
            animal.name = name;
            animal.type = type;
            animal.age - age;
            animal.color = color;
            animal.image = image;
            animal.vaccinated = vaccinated;
        }

        return animal;
    }

    deleteAnimal(id) {
        this.animals = this.animals.filter((animal) => animal.id !== id);
    }
}