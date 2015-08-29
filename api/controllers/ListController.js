/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('YOUR_API_KEY_HERE');

module.exports = {

    new: function(req,res){
        List.create(req.body).exec(function createCB(err, created){
            if(err) {
                res.json({error:err});
            }
            if(created === undefined){
                res.notFound();
            } else{
                res.json({success:true});

//                var gcm = require('node-gcm');

  //              var message = new gcm.Message();

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
    },

    bydistance: function(req,res)
    {
        
        var distance = req.param('distance');
        var geoU =   req.param('geo').split(',');
        
        List.findByStatus('pending')
            .exec(function(err,user){
            listings = [];
            user.forEach(function(key){
                geoL = key.geo.split(',');
                userLoc = { lat: geoU[0], lng: geoU[1] };
                listLoc = { lat: geoL[0], lng: geoL[1] };
            function pointsNear(checkPoint, centerPoint, km) {
                var ky = 40000 / 360;
                var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
                var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
                var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
                return Math.sqrt(dx * dx + dy * dy) <= km;
            }
            if(pointsNear(listLoc, userLoc, distance)) {
                listings.push(key);
            }
            });

              if(err)
                res.json({error:err});
              if(user === undefined)
                res.notFound();
              else
                res.json(listings);

        });
    }
	
};

