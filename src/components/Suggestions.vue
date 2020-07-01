<template>
    <div id="custom_suggestion">    

        <b-img :src="`${this.baseUrlUserPhoto}${this.$store.state.user.photo_url}`" rounded="circle" id="custom_user_photo_side" style="display: inline-block;"></b-img>
        <span style="display:inline-block;">           
            <p id="custom_user_name">{{this.$store.state.user.name}}</p>      
            <span id="custom_user_role" class="custom_faded_color">{{this.$store.state.user.role}}</span>
        </span>
            <b-row style="margin-top: 1%;">
                <b-col cols="3">
                    <span class="custom_faded_color custom_personal_suggestion custom_font_size" >Suggestions For You</span>
                </b-col>
                <b-col cols="1">
                    <router-link to="\explore">
                        <span class="custom_personal_suggestion custom_font_size" style="margin-left: -110%;">See All</span>
                    </router-link>     
                </b-col>
            </b-row>
            <div style="margin-top: 0.7%; ">
                <div v-for="(user, index) in users" :key="index" >
                    <UserSuggestions :user="user" :index="index" v-on:navigate-to-user="navigateToUser" />  
                </div>   
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
                    if(body['users'])   {
                        let index
                        body['users'].filter((user, i)=>   {
                            if(user.user_id===this.$store.state.user.user_id)   {
                                index=i
                            } 
                        })
                        if(index!==undefined)   {
                            body['users'].splice(index,1)
                        }
                        if(body['users'].length>5)  {
                            body['users'].splice(5)
                        }
                        this.users.push(...body['users']) 
                    }
                } 
            },
            navigateToUser: async function(user_id)   {
                this.$router.push({ name: 'User', params: { user_id: user_id }})
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
        width: 55px;
        height: 55px;
        margin: -1.3% 1% 0% 0%;
    }  
    #custom_suggestion  {
        padding: 8% 0% 0% 1.25%;
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