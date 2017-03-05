module.exports = {
  servers: {
    one: {
      host: '138.68.135.130',
      username: 'root',
      // pem:
      password: PASSWORD
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'codeforfood',
    path: '../../codeforfood',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
        cleanAfterBuild: true
    },
    env: {
      ROOT_URL: 'http://138.68.135.130:80',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
