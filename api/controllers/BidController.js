/**
 * BidController
 *
 * @description :: Server-side logic for managing bids
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req,res){
        Bid.create(req.body).exec(function createCB(err, created){
            if(err) {
                res.json({error:err});
            }
            if(created === undefined){
                res.notFound();
            } else{
                res.json({success:true});
//              //var gcm = require('node-gcm');
//              //var message = new gcm.Message();
	            //var regIds = ['YOUR_REG_ID_HERE'];
                var message = new gcm.Message({
					collapseKey: 'demo',
					priority: 'high',
					contentAvailable: true,
					delayWhileIdle: true,
					timeToLive: 3,
					restrictedPackageName: "somePackageName",
					dryRun: true,
					data: {
						key1: 'message1',
						key2: 'message2'
					},
					notification: {
						title: "Hello, World",
						icon: "ic_launcher",
						body: "This is a notification that will be displayed ASAP."
					}
				});

                var regIds = req.param('regIds');

                sender.send(message, regIds, function (err, result) {
                    if(err) console.error(err);
                    else    console.log(result);
                });
                
            }
        });
    }
};

