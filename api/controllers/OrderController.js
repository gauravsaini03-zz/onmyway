/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyDlogF2t42Ep5940UE7vJFMLHwWClsp6LI');

module.exports = {

    complete: function(req,res) {
        Order.create(req.body).exec(function createCB(err, created){
            if(err) {
                res.json({error:err});
            }
            if(created === undefined){
                res.notFound();
            } else{
                res.json({success:true});

                message.addData('title', "You are Selected");
                message.addData('message', 'Hurray and take up the order');
                message.addData('listid',req.body.listid);

                var regIds = [];
                Push.find().where({carrierid:req.body.carrierid}).exec(function createCB(err, result){
                    regIds.push(result.regid);

                    sender.send(message, regIds, function (err, result) {
                        if(err) console.error(err);
                        else    console.log(result);
                    });

                    sender.sendNoRetry(message, regIds, function (err, result) {
                        if(err) console.error(err);
                        else    console.log(result);
                    });

                });
                
            }
        });
    }
};

