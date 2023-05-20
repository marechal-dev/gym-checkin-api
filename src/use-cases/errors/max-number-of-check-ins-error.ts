export class MaxNumberOfCheckInsError extends Error {
  public constructor() {
    super('Max number of check-ins reached.')
  }
}
