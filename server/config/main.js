'use strict';

module.exports = {
    // Setting port for server
    port: process.env.PORT || 3000,

    // Database connection information
    database: {
        dbStr: 'mongodb://quynhcn:isteam2017@ds129143.mlab.com:29143/isteam-db',
        dbOptions: {
            useMongoClient: true
        }
    },

    // Secret key for JWT signing and encryption
    secret: 'KCMgEja8kBlZgpyV5-yV-gvzbc38yjQk'
}