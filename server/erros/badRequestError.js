export class badRequestError extends Error {
  constructor(description) {
    super(description);
    this.name = "bad-request";
    this.code = 400;
  }
}
