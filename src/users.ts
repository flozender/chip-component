import { faker } from "@faker-js/faker";

export type User = {
  name: string;
  email: string;
};

export function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 20,
});
