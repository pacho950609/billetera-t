module.exports = 
{
    user: function(req, res, next)
    {
        if(req.isAuthenticated())
        {
            res.json(
                {
                    username: req.user.username
                });
        } 
        else
        {
            res.status(401).send('no autorizado');  
        }
    },

    fail: function(req, res, next)
    {
        res.status(401).send('Usuario o contraseña incorrecta');  
    },

    cerrar: function(req, res, next)
    {
        req.session.destroy(function (err) 
        {
            res.json("cerrado");
        });  
    },


}