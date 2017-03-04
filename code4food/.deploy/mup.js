module.exports = {
  servers: {
    one: {
      host: '138.68.174.20',
      username: 'root',
      // pem:
      password: 'Jux444719'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'Bareme',
    path: '../../Bareme',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: false,
    },
    env: {
      ROOT_URL: 'http://138.68.174.20:80',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {},
    },
  },
};
