var User = {
  attributes: {
    username: {
        type:'string',
        required: true
    },
    password: {
        type:'string',
        required: true
    },
    type: {
        type: 'string',
        required: true,
        enum: ['seller','carrier']
    }
  }
};

module.exports = User;
