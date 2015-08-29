/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyDlogF2t42Ep5940UE7vJFMLHwWClsp6LI');

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

                message.addData('title', req.body.title);
                message.addData('message','from: '+req.body.from+' '+'to: ' + req.body.to);
                
                var regIds = [];
                Push.findByType('carrier').exec(function createCB(err, res){
                    
                    res.forEach(function(key){   
                        regIds.push(key.regid);
                    })

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

