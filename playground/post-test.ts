import { Person } from "./src-gen/Person";

const person = Person.createFromJson({});

console.log(JSON.stringify(person));
