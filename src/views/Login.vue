<template>
    <div :style="{'background-image': 'url(' + require('../assets/images/background.jpg') + ')'}">
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

                    this.setUser('user', user)
                    this.setStoreValue('user', JSON.stringify(user))

                    this.$router.replace('/')

                }   else if(!this.message)    {
                    this.message='Failed to connect'
                }     
                this.$refs.alertdialog.showDialog()      
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
</style>