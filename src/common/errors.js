export class DoesNotExistsError extends Error {
  constructor() {
    super(`id not exist in db`);
  }
}
export class UserDoesNotExistsError extends Error {
  constructor(id) {
    super(`User with id: ${id} does not exists.`);
  }
}

export class NotValidUuidError extends Error {
  constructor(id) {
    super(`The id: ${id} does not a valid uuid.`);
  }
}
