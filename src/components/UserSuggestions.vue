<template>
    <div>
        <b-row >
            <b-col cols="3">
                <span v-on:click="navigateToUser">
                    <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle"  id="custom_user_photo" style="display: inline-block;">
                    </b-img>
                    <span  style="display: inline-block;">
                        <p id="custom_user_name">{{this.user.name}}</p>      
                        <span id="custom_user_role" class="custom_faded_color">{{this.user.role}}</span>           
                    </span>
                </span>
            </b-col>    
            <b-col cols="1" style="margin-top: 1%;">
                <span  v-on:click="navigateToUser" class="custom_secondary_color" id="custom_view">View</span>
            </b-col>
        </b-row>
    </div>
</template>
         
<script>
import Vuex from 'vuex'
import Connect from '../mixins/connect' 

export default {
    name: 'UserSuggestions',
    mixins: [Connect],
    props:  ['user', 'index'],
    methods:    {
        navigateToUser: async function()    {
            this.$emit('navigate-to-user', this.user.user_id)
        }
    }
    
         

            
            
            

    
         

            
            
            

    
         
}
</script>           
            
<style scoped>        
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        padding: 10% 0% 0% 0%;  
        margin-bottom: -10%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }
    #custom_user_photo  {
        width: 35px;
        height: 35px;
        margin: -5% 3% 0% 0%; 
    }   
    #custom_view    {
        font-size: 75%;
        margin: 0% 0% 0% -100%;
    }
            
            
            

</style>