import createError from 'http-errors';

const notFoundHandler = (_req, _res, next) => {
  next(createError(404, 'Route not found'));
};

export default notFoundHandler;
