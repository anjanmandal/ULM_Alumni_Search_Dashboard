// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set to 500 if status code is 200 (default)
    
    res.status(statusCode).json({
      message: err.message,
      // If in development, provide stack trace for debugging
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  // Middleware for handling 404 errors
  const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  module.exports = {
    errorHandler,
    notFound,
  };
  