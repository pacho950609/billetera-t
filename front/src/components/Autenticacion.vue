<template>
  <div class="container" id="app">
                    <div class="row justify-content-md-center">
                        <div class="col-md-6 ">
                              <br>
                              <br>
                               <legend>Iniciar sesion </legend> 
                               usuario -> inalambria , clave -> inalambria123 
                               <br>
                               usuario2 -> inalambria2 , clave -> inalambria123
                               <br>
                               <br>
                                    
                                    <input v-model="usuario" name="username" class="form-control input-lg" placeholder="Ingrese el usuario" />
                                     <br> 
                                    <input v-model="password" type="password"  name="password" class="form-control input-lg" placeholder="ingrese la clave"/>   
                                    <br />
                      
                                    <button  type="submit" v-on:click="login" class="btn btn-lg btn-primary btn-block signup-btn" >
                                        Iniciar sesion</button>
                                    {{msg}}        
                          </div> 
                  </div>            
                  </div>
</template>

<script>
export default {
  name: 'Autenticacion',
  data () {
    return {
      msg: '',
      usuario:'',
      password:''
    }
  },
   methods: 
    {
        login: function () 
        {
           
          let obt=
            {
                "username":this.usuario,
                "password":this.password
            };
            axios('/api/log',
            {
                method: 'post',
                data:obt,
                withCredentials: true,
                crossdomain: true
            })
            .then(response => 
            {
              this.$router.push('/home');
            }).catch(e => 
            {
              this.msg="Usuario o clave incorrecta"
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
