<template>
     <div :style="{'background-image': 'url(' + require('../assets/images/background.jpg') + ')'}">
        <b-card no-body class="custom_card col-sm-12 col-md-4 ml-auto">            
            <b-form @submit.prevent="registerUser">
                <b-img v-bind="mainProps" :src="require('../assets/images/app_logo.png')" rounded alt="App Logo"></b-img>
                <b-form-group id="custom_group"
                    label="Name"
                    label-for="input-1">
                    <b-form-input
                        class="custom_input"
                        id="input-1"
                        type="text"
                        required
                        placeholder="Enter name"
                        v-model="formData.name">                        
                    </b-form-input>
                </b-form-group>
                <b-form-group 
                    id="custom_group"
                    label="Role"
                    label-for="input-2">
                    <b-form-input
                        class="custom_input"
                        id="input-2"
                        type="text"
                        required
                        placeholder="Enter role"
                        v-model="formData.role">
                    </b-form-input>
                </b-form-group> 
                <b-form-group
                    id="custom_group"
                    label="Mobile No."
                    label-for="input-3">
                    <b-form-input
                        class="custom_input"
                        id="input-3"
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
                    label-for="input-4">
                    <b-form-input
                        class="custom_input"
                        id="input-4"
                        type="password"
                        required
                        placeholder="Enter password"
                        v-model="formData.password">                        
                    </b-form-input>
                </b-form-group>
                <b-button class="btn-block custom_button" type="submit" variant="primary">Register</b-button> 
                <b-button v-on:click="navigate" class="btn-block" variant="outline-dark">Go back</b-button>
            </b-form>     
        </b-card>   
    </div>        
</template>

<script>
    import Connect from '../mixins/connect'

    export default  {
        name: 'Register',
        mixins: [
            Connect
        ],
        data()  {
            return  {  
                mainProps:  {
                    height: 125,
                    width: 125    
                },
                formData:   {
                    name: '',
                    role: '',
                    mobile_no: '',
                    password: '',
                },
                message: ''
            }
        },
        methods:    {

            registerUser: async function()   {
                
                const { status, body }=await this.postRequest(`${this.subUrl.register}`, this.formData)
                this.message=body['message']
                if(status===201)    {

                    this.formData={
                        mobile_no: '',
                        password: '',
                        name: '',
                        role: ''
                    }
                }   else if(!this.message)    {
                    this.message='Failed to connect'
                }
            },
            navigate: async function()  {
                this.$router.back()
            }    
            
        }
    }         
</script>           
            
<style scoped>            
    .back_button    {
        margin-top: 5%;
    }

            
            
            
</style>