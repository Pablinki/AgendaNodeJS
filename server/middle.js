module.exports = function(req, res, next){
  if(!req.session.email_user){
    res.redirect("/events/logout")
  }else next()
}