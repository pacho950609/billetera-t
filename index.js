

const mongoUtil = require( './db/coneccion' );

mongoUtil.connectToServer( ( err ) =>
    {

        const configuracion = require('./configuracion.json');
        const express = require("express");
        const tasks = require("./routes/servicios");
        const bodyParser = require("body-parser");
        const port =  process.env.PORT || configuracion.puerto;
        const app  = express() ; 
        const passport= require('passport') ;
        const session = require('express-session'); 
        const helmet = require('helmet');
        const compression = require('compression');
        const dir = require('path')
        const http = require('http');
        require('./passport/passport')(passport);

        //diminuye significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web
        app.use(compression());

        app.use(express.static(dir.join(__dirname, './dist')));
 
        app.use(session({
             secret : 'secret',
             resave:false ,
             saveUninitialized : false,
        }));

        //Proteje la app de vulnerabilidades estableciendo cabeceras http
        app.use(helmet());
        
        app.get('/test', function(req, res) {
            let reqDir = dir.join(__dirname, '../front/container/autenticacion/autenticacion.html');
            res.sendFile(reqDir);
            //res.sendFile('views/test.html', {root: __dirname })
        });

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', tasks);
        app.get('*', (req, res) => 
        {
            res.sendFile(dir.join(__dirname, './../vista/dist/index.html'));
        });
        const servidor = http.createServer(app);
        app.listen(port, () => { console.log('Server started on port'+port);} );
    });

