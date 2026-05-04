import { faker } from "@faker-js/faker";

export function generateUserDetails() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const confirmPassword = password;
    const username = firstName + faker.number.int();
    return {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        username
    }
}

