const MongoClient = require( 'mongodb' ).MongoClient;
const configuracion = require('./../configuracion.json');
var _db;
const conectionurl = 'mongodb://'+configuracion.usuarioDB+':'+configuracion.contraseniaDB +'@'+configuracion.dbUrl;

module.exports = 
{

  connectToServer: ( callback ) =>
  {
    MongoClient.connect(conectionurl,(err,database) => 
        { 
            _db = database.db('inalambria')
            
            return callback( err );
        });
  },

  getDb:()=>
  {
    return _db;
  }

};