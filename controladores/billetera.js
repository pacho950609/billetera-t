
const mongoUtil = require( '../db/coneccion' );
const db = mongoUtil.getDb();
var ObjectId = require('mongodb').ObjectID;

module.exports = 
{
    modificar: function(req, res, next)
    {
         let billetera = db.collection('billetera');

         billetera.update({'username': req.user.username },
            {$set:  { 
                        'b_1000': req.body.b_1000,
                        'b_2000': req.body.b_2000,
                        'b_5000': req.body.b_5000,
                        'b_10000': req.body.b_10000,
                        'b_20000': req.body.b_20000,
                        'b_50000': req.body.b_50000,
                    }},
            (err,result) =>
            {
                if(err)
                {
                    res.status(401).send('no se pudo actualizar la billetera');  
                }
                else
                {
                    res.json(result);
                }
                
            });  
    },
    obtener: function(req, res, next)
    {
        let billetera = db.collection('billetera');
        billetera.findOne(
            {'username': req.user.username },
            (err,result) =>
            {
                   if(result == undefined)
                   {   
                    res.status(401).send('error encontrando la billetera');  
                   }
                   else
                   {
                       res.json(result);
                   }
   
            });
  
    },
    enviar: function(req, res, next)
    {
        let billetera = db.collection('billetera');
        billetera.findOne(
            {'username': req.body.username },
            (err,result) =>
            {
                   if(result == undefined)
                   {   
                      res.status(401).send('error encontrando al usuario que desea enviarle');  
                   }
                   else
                   {
                        billetera.update({'username': req.body.username },
                        {$set:  { 
                                    'b_1000': req.body.b_1000 + result.b_1000,
                                    'b_2000': req.body.b_2000 + result.b_2000,
                                    'b_5000': req.body.b_5000 + result.b_5000,
                                    'b_10000': req.body.b_10000+result.b_10000,
                                    'b_20000': req.body.b_20000+result.b_20000,
                                    'b_50000': req.body.b_50000+result.b_50000,
                                }},
                        (err,result) =>
                        {
                            if(err)
                            {
                                res.status(401).send('error encontrando al usuario que desea enviarle');  
                   
                            }
                            else
                            {
                                billetera.findOne(
                                    {'username': req.user.username },
                                    (err,result) =>
                                    {
                                           if(result == undefined)
                                           {   
                                            res.status(401).send('error encontrando la billetera');  
                                           }
                                           else
                                           {
                                            billetera.update({'username': req.user.username },
                                            {$set:  { 
                                                'b_1000': result.b_1000 - req.body.b_1000,
                                                'b_2000': result.b_2000 - req.body.b_2000,
                                                'b_5000': result.b_5000 - req.body.b_5000 ,
                                                'b_10000': result.b_10000 - req.body.b_10000,
                                                'b_20000': result.b_20000 - req.body.b_20000,
                                                'b_50000': result.b_50000 - req.body.b_50000,
                                                    }},
                                            (err,result) =>
                                            {
                                                if(err)
                                                {
                                                    res.status(401).send('no se pudo actualizar la billetera');  
                                                }
                                                else
                                                {
                                                    res.json(result);
                                                }
                                                
                                            });  
                                           }
                           
                                    });
                            }
                            
                        });  
                   }
   
            });
  
    }
    




}