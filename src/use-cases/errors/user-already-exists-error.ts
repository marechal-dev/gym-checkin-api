export class UserAlreadyExistsError extends Error {
  public constructor() {
    super('User already exists.')
  }
}
