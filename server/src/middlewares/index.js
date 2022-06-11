
function notFound(res, req, next){
  const error = new Error('Not Found:', req.originalUrl);
  res.status(404);
  next(error)
};

function errorHandler(error,res,res,next){
  const statusCode = res.statusCode || 500;
  res
    .status(statusCode)
    .json({
      status: statusCode,
      message: err.message,
      stack:err.stack
    });
}



module.exports = {
  notFound,
  errorHandler
}