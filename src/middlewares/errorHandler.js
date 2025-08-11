const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: status === 500 ? 'Something went wrong' : err.message,
    data: err.message,
  });
};

export default errorHandler;
