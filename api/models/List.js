/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	title: 'string',
    userid: {
        type: 'integer',
        required: true
    },
	from: {
	    type:'string',
	    required: true
	},
	to: {
        type:'string',
        required: true
    },
	geolocation: 'string',
	status: {
	    type: 'string',
        defaultsTo: 'pending',
	    enum: ['pending','approved','denied']
	},
	onmyway: {
	    type: 'boolean',
	    defaultsTo: false
	},
	bids: {
	    collection: 'bid',
	    via: 'listid'
	},
    batches: {
        collection: 'batch',
        via: 'listid'
    }
  },
  getFullName: function (){
      return this.from + ' ' + this.to;
  },
  enroll: function (options, cb) {

    List.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      theUser.enrolledIn.add(options.courses);
      theUser.save(cb);
    });
  }  

};

