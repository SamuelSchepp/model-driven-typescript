export class NonExhaustiveError extends Error {
  constructor() {
    super(`Some code path was not exhaustive.`);
  }
}
