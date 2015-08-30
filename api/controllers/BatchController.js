/**
 * BatchController
 *
 * @description :: Server-side logic for managing batches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    new: function(req,res){
        Batch.create(req.body).exec(function createCB(err, created){
            if(err) {
                res.json({error:err});
            }
            if(created === undefined){
                res.notFound();
            } else{
                res.json({success:true});
            }
        });
    }
	
};

