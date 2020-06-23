<template>
    <div id="custom_suggestion">    
    
                <b-img :src="`${this.baseUrlPostPhoto}${this.$store.state.user.photo_url}`" rounded="circle" id="custom_user_photo_side" style="display: inline-block;"></b-img>
                <span style="display:inline-block;">           
                    <p id="custom_user_name">{{this.$store.state.user.name}}</p>      
                    <span id="custom_user_role" class="custom_faded_color">{{this.$store.state.user.role}}</span>
                </span>
              
                    <!-- <span style="display: inline-block;">
                        <span class="custom_faded_color custom_personal_suggestion">Suggestions For You</span>
                        <div v-for="(user, index) in users" :key="index">
                            <UserSuggestions :user="user" />  
                        </div>         
                    </span> 
                    <span style="display: inline-block;">
                        <span class="custom_personal_suggestion custom_font_size">See All</span>
                        <div v-for="(user, index) in users" :key="index" id="custom_view">
                            <span class="custom_secondary_color" >View</span>
                        </div> 
                    </span> -->
                     <div v-for="(user, index) in users" :key="index">
                            <UserSuggestions :user="user" />  
                        </div>   
                





   </div>      
</template>

<script>
    import Vuex from 'vuex'
    import Connect from '../mixins/connect'
    import UserSuggestions from './UserSuggestions'
    export default {     
        name: 'Suggestions',
        mixins: [Connect],
        data()  {
            return  {
                users: []
            }
        },
        components: {
            UserSuggestions

        },
        methods:    {
            retrieveAllUsers: async function()    {
                const { status, body }=await this.getRequest(`${this.subUrl.user}?page=0`)
                if(status===200)    {
                    console.log(body['users'].indexOf({ user_id: this.$store.state.user.user_id }))
                    this.users.push(...body['users'])
                }     


            }    
        },
        created() {
            this.retrieveAllUsers()
        }

    }
</script>

<style scoped>
    #custom_user_photo_side {
          /* width: 10%;
        height: 95%; */
        width: 4.5%;
        height: 10.5%;
        margin: -1.3% 1% 0% 0%;
    }  
    #custom_suggestion  {
        padding: 3.5% 0% 0% 0%;
        text-align: left;
        float: left;
    }
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        padding: 10% 0% 0% 0%;  
        margin-bottom: -6%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }
    #custom_user_photo  {
        width: 1%;
        height: 3%;    
    } 
    .custom_personal_suggestion {
        font-size: 79.5%;
    }
    #custom_view    {
        font-size: 75%;
        margin: 0.0% 0% 35% 0%;
    }
    

</style>