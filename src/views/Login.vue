<template>
    <!-- <div :style="{'background-image': 'url(' + require('../assets/images/background.jpg') + ')'}"> 
        <AlertDialog v-bind:message="message" ref="alertdialog" />
        <b-card no-body class="custom_card login_card col-sm-12 col-md-4 ml-auto">
            <b-form @submit.prevent="loginUser">
                <b-img v-bind="mainProps" :src="require('../assets/images/app_logo.png')" rounded alt="App Logo"></b-img>
                <b-form-group
                    id="custom_group"
                    label="Mobile No."
                    label-for="input-1">
                    <b-form-input
                        class="custom_input"
                        id="input-1"
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        placeholder="Enter mobile no."
                        v-model="formData.mobile_no">
                    </b-form-input>    
                </b-form-group>
                <b-form-group
                    id="custom_group"
                    label="Password"
                    label-for="input-2">
                    <b-form-input
                        id="input-2"
                        type="password"
                        required
                        placeholder="Enter password"
                        v-model="formData.password">                    
                    </b-form-input>   
                </b-form-group> 
                <b-button class="btn-block custom_button" type="submit" variant="primary">Login</b-button>   
                <div class="or">OR</div>
                <b-button v-on:click="navigate" class="btn-block" variant="primary">Register</b-button>
            </b-form>    
        </b-card>
    </div>   -->
    <div class="login_background ">
        <b-container>
            <b-row>
                <b-card class="col-sm-9 col-md-7 col-lg-5 mx-auto my-5">
                    <b-card-title>
                        <b-img :src="require('../assets/images/navbar/instagram.png')" alt="Instagram" class="mb-2" />   
                    </b-card-title>
                    <b-form @submit.prevent="loginUser" class="form-signin">
                        <div class="form-label-group">
                            <input type="tel" id="input-1" class="form-control" placeholder="Mobile no." required  pattern="[0-9]{10}" autofocus  v-model="formData.mobile_no">
                            <label for="input-1">Mobile No.</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="input-2" class="form-control" placeholder="Password" required  v-model="formData.password">
                            <label for="input-2">Password</label>
                        </div>  

                        <button class="btn btn-lg btn-primary btn-block text-uppercase mt-2" type="submit">Sign in</button>
                        <hr class="my-3">      
                        <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                    </b-form>    
                </b-card>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import LocalStorageManager from '../mixins/local_storage_manager'
    import AlertDialog from '../components/AlertDialog'
    import Connect from '../mixins/connect'
    import { mapActions } from 'vuex'

    export default  {
        name: 'Login',
        mixins: [
            LocalStorageManager,
            Connect
        ],
        components: {
            AlertDialog
        },
        data()  {
            return  {
                mainProps:  {
                    width: 125,
                    height: 125,
                },
                formData:   {
                    mobile_no: '',
                    password: ''
                },
                message: ''
            }
        },
        methods:    {
            ...mapActions([
                'setUser'
            ]),
            loginUser: async function()   {
                const { status, body }=await this.postRequest(`${this.subUrl.login}`, this.formData)
                this.message=body['message']
                if(status===200)    {
                    const user=body['user']
                    user.token=`bearer ${user.token}`
                    this.setUser('user', user)
                    this.setStoreValue('user', JSON.stringify(user))

                    this.$router.replace('/')

                }   else    {  
                    if(!this.message)    {
                        this.message='Failed to connect'
                    }      
                    this.$refs.alertdialog.showDialog()  
                }    
            },
            navigate: async function()  {
                this.$router.push('/register')
            }
        }



// #1d7ed6
// #083863









    }
</script>
<style scoped>
    .or {
        margin: 1% 0% 1% 0%;
    }
    .login_background   {
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
        height: 100vh;
    }
     :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
    .form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: 50px;
 
  border-radius: 2rem;
}


.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  display: block;
  width: 100%;
  margin-bottom: 0;
  padding: 3% 0% 0% 5%;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
   padding-left: 5%;
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
   padding-left: 5%;
  font-size: 12px;
  color: #777;
}
.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}
/* :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: 50px;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  text-align: left;
  padding-left: 5%;

  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
padding-left: 5%;
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
} */





    
</style>