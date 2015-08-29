/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    login: function(req,res){
        var username =   req.body.user;
        var password =   req.body.password;
        
        User.findByUser(username)
            .exec(function(err,user){
            user =  user[0];
            if(err)
                res.json({error:err});          
            if(user === undefined)
                res.notFound(); 
            if(user.password === req.body.password) {
                res.json(user);
            } else {
                res.json({status:401,message:"Username and password does not match"})
            }
        })
    }
};

