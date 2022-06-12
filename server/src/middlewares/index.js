const jwt = require('jsonwebtoken');

function notFound(res, req, next){
  const error = new Error('Not Found:', req.originalUrl);
  res.status(404);
  next(error)
};

function errorHandler(err,res,res,next){
  const statusCode = res.statusCode || 500;
  res
    .status(statusCode)
    .json({
      status: statusCode,
      message: err.message,
      stack:err.stack
    });
};

async function createJWT(user,res){
  delete user._doc.password;
  delete user._doc.createdAt;
  delete user._doc.updatedAt;
  delete user._doc.__v;
  const payload = {...user._doc};
  jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'1d'}, (error, token) => {
    if (error){
      console.log(error)
      res.status(500).json(error);
    } else {
      res.status(200).json({token:token});
    }
  })
};


function checkTokenSetUser(req,res,next) {
  const authHeader = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWTSECRET, (error, user) => {
        if (error) {
          next(error);
        }
        req.user = user;
        next();
      })
    } else {
      next();
    }
  } else {
    next();
  }
};

function isLoggedIn(req,res,next) {
  if (req.user) {
    next();
  } else {
    const error = new Error('Unauthorized');
    res.status(401);
    next(error);
  }
};



module.exports = {
  notFound,
  errorHandler,
  createJWT,
  isLoggedIn,
  checkTokenSetUser
}