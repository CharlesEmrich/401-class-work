module.exports = function getAuthAdmin(role) {
  return function authAdmin(req, res, next) {
    console.log(req.decoded[role]);
    if (req.decoded._doc[role]) {
      next();
    }
    else {
      next({status: 403, message: `User lacks ${role} permissions.`});
    }
  };
};
