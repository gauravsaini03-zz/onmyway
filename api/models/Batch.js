/**
* Batch.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    amount: {
        type:'integer',
        required: true
    },
    userid: {
        type:'integer',
        unique: true,
        required: true
    },
    listid: {
        model: 'list',
        required: true
    }

  }
};

