export class ResourceNotFoundError extends Error {
  public constructor() {
    super('Resource not found.')
  }
}
