<template>
  <div class="row justify-content-md-center">
        <nav class="col-sm-12 navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white">Billetera</a>
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
        
      <div class="card col-xl-6 layout" align="center">
          <div class="card-header">
              <b>Cuenta</b>
          </div>
            <div  class="card-body">
                <h3>
                  Bienvenido
                </h3>
                <h4>
                  {{info.nombre}}
                </h4>
                <br>
                <h3>
                   Tienes {{info.b_1000*1000 + info.b_2000*2000 +info.b_5000*5000 + info.b_10000*10000 + info.b_20000*20000 + info.b_50000*50000}} de saldo
                </h3>
                <br>
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
                        <td>{{info.b_1000}}</td>
                      </tr>
                      <tr>
                        <th scope="row">$2.000</th>
                        <td>{{info.b_2000}}</td>
                      </tr>
                      <tr>
                        <th scope="row">$5.000</th>
                        <td>{{info.b_5000}}</td>
                      </tr>
                      <tr>
                        <th scope="row">$10.000</th>
                        <td>{{info.b_10000}}</td>
                      </tr>
                      <tr>
                        <th scope="row">$20.000</th>
                        <td>{{info.b_20000}}</td>
                      </tr>
                      <tr>
                        <th scope="row">$50.000</th>
                        <td>{{info.b_50000}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br>
                  <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">Agregar saldo</button>
            </div>
      </div>
  


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
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
              <h4>
                Agregaras ${{b_1000*1000 + b_2000*2000 +b_5000*5000 + b_10000*10000 + b_20000*20000 + b_50000*50000}} a tu billetera
              </h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="agregar" >Save changes</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
          console.log(this.info);
        }).catch(e => 
        {
          this.info={};
        }); 
    },
    methods: 
    {
        agregar: function () 
        {
          let obj = 
          {
            'b_1000': Number(this.info.b_1000) + Number(this.b_1000),
            'b_2000': Number(this.info.b_2000) + Number(this.b_2000),
            'b_5000': Number(this.info.b_5000) + Number(this.b_5000),
            'b_10000': Number(this.info.b_10000) + Number(this.b_10000),
            'b_20000': Number(this.info.b_20000) + Number(this.b_20000),
            'b_50000': Number(this.info.b_50000) + Number(this.b_50000),
          }
          axios('/api/billetera',
          {
              method: 'put',
              data:obj,
              withCredentials: true,
              crossdomain: true
          })
          .then(response => 
          {
            this.info.b_1000 =  Number(this.info.b_1000) + Number(this.b_1000);
            this.info.b_2000 = Number(this.info.b_2000) + Number(this.b_2000);
            this.info.b_5000 = Number(this.info.b_5000) + Number(this.b_5000);
            this.info.b_10000 = Number(this.info.b_10000) + Number(this.b_10000);
            this.info.b_20000 = Number(this.info.b_20000) + Number(this.b_20000);
            this.info.b_50000 = Number(this.info.b_50000) + Number(this.b_50000);
          }).catch(e => 
          {
            alert("Error");
          });
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
  margin-top: 30px;
}
.cerrar
{
  cursor: pointer;
}
.contenido .card
{
    height: 670px;
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
button
{
    width: 60%;
}
.layout
{
  padding: 0;
}

</style>
