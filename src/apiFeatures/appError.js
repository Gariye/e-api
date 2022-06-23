export class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
  }
}

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next);
};
