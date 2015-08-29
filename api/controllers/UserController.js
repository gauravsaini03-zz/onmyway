/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    login: function(req,res){
        var user     =   req.param('user');
        var password =   req.param('password');

        List.findByUser(user)
            .exec(function(err,user){
            console.log(user);
            
            
            if(err)
                res.json({error:err});
              if(user === undefined)
                res.notFound();
              else
                res.json(listings);
        })
    }
};

