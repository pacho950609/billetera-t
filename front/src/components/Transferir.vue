<template>
    <div class="row  contenido justify-content-md-center">
          <nav class="col-sm-12 navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white" >Billetera</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <a class="nav-link" > <router-link to="/home" style="color:white">Usuario</router-link> <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item active">
                <a class="nav-link"><router-link to="/transferir" style="color:white">Transanccion</router-link> </a>
              </li>
                <li class="nav-item active">
                <a class="nav-link cerrar"  v-on:click="cerrar">Cerrar Sesion</a>
              </li>
            
            </ul>
          </div>
        </nav>
     
      <div class="card col-xl-6" align="center">
          <div class="card-header">
              <b>Transferencia</b>
          </div>
            <div  class="card-body">
                <br>
                <div class="form-group row usuario">
                    <label for="staticEmail" class="col-sm-4 col-form-label">Usuario</label>
                    <div class="col-sm-8">
                      <input v-model="username" type="text" class="form-control"  value="email@example.com">
                    </div>
                </div>
                <table class="table">
                    <thead align="center">
                      <tr>
                        <th scope="col">Denominacion</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      <tr>
                        <th scope="row">$1.000</th>
                        <td><input v-model="b_1000" type="number"  class="form-control"></td>
                      </tr>
                      <tr>
                        <th scope="row">$2.000</th>
                        <td><input v-model="b_2000" type="number"  class="form-control"></td>
                      </tr>
                      <tr>
                        <th scope="row">$5.000</th>
                        <td><input v-model="b_5000" type="number"  class="form-control"></td>
                      </tr>
                      <tr>
                        <th scope="row">$10.000</th>
                        <td><input v-model="b_10000" type="number"  class="form-control"></td>
                      </tr>
                      <tr>
                        <th scope="row">$20.000</th>
                        <td><input v-model="b_20000" type="number"  class="form-control"></td>
                      </tr>
                      <tr>
                        <th scope="row">$50.000</th>
                        <td><input v-model="b_50000" type="number"  class="form-control"></td>
                      </tr>
                    </tbody>
                  </table>
                  <br>
                  <h5>
                    Transferiras $30.000 a {{username}}
                  </h5>
                  <br>
                  <button type="button" class="btn btn-primary" v-on:click="transferir">Transferir</button>
                
            </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Transferir',
   mounted: function()
    {    
        axios('/api/billetera',
        {
            method: 'get',
            withCredentials: true,
            crossdomain: true
        })
        .then(response => 
        {
          this.info= response.data;
        }).catch(e => 
        {
          this.info={};
        }); 
    },
    methods: 
    {
        transferir: function () 
        {
            if(this.info.b_1000 >= this.b_1000 && this.info.b_2000 >= this.b_2000 && this.info.b_5000 >= this.b_5000 && this.info.b_10000 >= this.b_10000 && this.info.b_20000 >= this.b_20000 && this.info.b_50000 >= this.b_50000)
            {
                let obj = 
                {
                    'b_1000':  Number(this.b_1000),
                    'b_2000':  Number(this.b_2000),
                    'b_5000':  Number(this.b_5000),
                    'b_10000': Number(this.b_10000),
                    'b_20000': Number(this.b_20000),
                    'b_50000': Number(this.b_50000),
                    'username' : this.username
                }
                axios('/api/enviar',
                {
                    method: 'put',
                    data:obj,
                    withCredentials: true,
                    crossdomain: true
                })
                .then(response => 
                {
                    this.info.b_1000 =  Number(this.info.b_1000) - Number(this.b_1000);
                    this.info.b_2000 = Number(this.info.b_2000) - Number(this.b_2000);
                    this.info.b_5000 = Number(this.info.b_5000) - Number(this.b_5000);
                    this.info.b_10000 = Number(this.info.b_10000) - Number(this.b_10000);
                    this.info.b_20000 = Number(this.info.b_20000) - Number(this.b_20000);
                    this.info.b_50000 = Number(this.info.b_50000) - Number(this.b_50000);
                    alert("Enviado exitosamente");
                }).catch(e => 
                {
                    alert("Error");
                });
            }
            else
            {
                alert("No tiene suficiente dinero")
            }
        },
        cerrar : function()
        {
             axios('/api/cerrar',
            {
                method: 'get',
                withCredentials: true,
                crossdomain: true
            })
            .then(response => 
            {
              this.$router.push('/');
            }).catch(e => 
            {
              alert("error");
            });
        }
    },
  data () {
    return {
        info: {},
        b_1000 : 0,
        b_2000 : 0,
        b_5000 : 0,
        b_10000 : 0,
        b_20000 : 0,
        b_50000 : 0,
        username : ''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contenido
{
    height: 730px;
}
.card-header
{
  background: lightgrey
}
.layout
{
  max-width: 1000px;
}
.contenido .card
{
    height: 720px;
    margin: 20px 20px;
    padding: 0px;
}

.contenido .card .card-body
{
    padding: 7px;
}
h2
{
    margin: 0px;
}
.table
{
    width: 80%;
}
.cerrar
{
    cursor: pointer;
}
button
{
    width: 60%;
}

</style>
