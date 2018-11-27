
module.exports=
    { 
        isLogged:function(req,res,next)
        {
            if(req.isAuthenticated())
            {
                next();
            }
    
            else 
            {
                res.status(401).send('No esta autorizado, inicie sesion');  
            }
        }
    }