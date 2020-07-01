<template>
    <div class="custom_background custom_explore_background">
        <span class="custom_suggestion suggested_lg">Suggested</span>
        <b-card no-body class="pl-3  pt-2 ">
          <span class="custom_suggestion suggested_sm">Suggested</span>
            <b-row v-for="(user, index) in this.users" :key="index">
                <!-- <b-avatar :src="`${baseUrlUserPhoto}${user.photo_url}`" size="2.4rem" style="display: inline-block;"></b-avatar>
                    <span style="display:inline-block;">           
                        <span id="custom_user_name">{{user.name}}</span> <br>     
                        <span id="custom_user_role" class="custom_faded_color">{{user.role}}</span>
                    </span> -->
                 <b-col class="text-left">
                    <span v-on:click="navigateToUser(user.user_id)">
                        <span style="display: inline-block;">
                            <b-avatar :src="`${baseUrlUserPhoto}${user.photo_url}`" style="margin-bottom: 47.5%;" class="custom_user_photo" size="2.4rem"></b-avatar>
                        </span>
                        <span style="display: inline-block; margin-left: 3%;">
                            <span id="custom_user_name" style="display: block;" class="">{{user.name}}</span>
                            <span id="custom_user_role" class="custom_faded_color">{{user.role}}</span>         
                        </span>
                    </span>
                </b-col>    
            <b-col class="m-0 pl-0 pr-0 pt-1">
                <b-button variant="primary" v-on:click="navigateToUser(user.user_id)" class="custom_explore_view float-right p-0">View</b-button>
            </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Connect from '../mixins/connect' 
export default {
    name: 'Explore',
    mixins: [Connect],
    data()  {
        return  {
            page: -1,
            users: []
        }
    },
    methods:    {  
        retrieveAllUsers: async function()    {
            this.page++
            const { status, body }=await this.getRequest(`${this.subUrl.user}?page=${this.page}`)
            if(status===200)    {                      
                this.users.push(...body['users']) 
            } 
        },
        navigateToUser: async function(user_id)   {
            this.$router.push({ name: 'User', params: { user_id: user_id }})
        },         
        ...mapActions([
            "setCurrentPage"
        ])  
    },
    mounted()    {
        this.setCurrentPage('explore_active')
        this.retrieveAllUsers()
    }
}
</script>

<style scoped>
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        /* margin: 10% 0% -0% 0%; */
        padding: 0% 0% -10% 0%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }
    .custom_suggestion  {
      font-weight: 550;
      font-size: 95%;
      text-align: left;
    }
   
@media only screen and (max-width: 265px) {
  .custom_explore_background  {
      padding: 0% 0% 0% 0%; 
    }
 .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 26%;
        font-size: 75.5%;
         margin-right: 20%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .custom_explore_background  {
        padding: 0% 0% 0% 0%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 26%;
        font-size: 75.5%;
         margin-right: 20%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .custom_explore_background  {
        padding: 0% 0% 0% 0%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 23.5%;
        font-size: 75.5%;
         margin-right: 15%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .custom_explore_background  {
        padding: 0% 0% 0% 0%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 20.5%;
        font-size: 75.5%;
         margin-right: 15%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
  .custom_explore_background  {
        padding: 0% 0% 0% 0%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 18.5%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 630px) and (min-width : 480px) {
  .custom_explore_background  {
        padding: 0% 0% 0% 0%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
      margin-bottom: 3.0%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 700px) and (min-width : 630px) {
 .custom_explore_background  {
        padding: 4% 7% 4% 7%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 700px) {
  .custom_explore_background  {
        padding: 4% 7% 4% 7%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
          height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
  .custom_explore_background  {
        padding: 4% 8.5% 4% 8.5%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }    
    .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
  .custom_explore_background  {
        padding: 4% 17.5% 4% 17.5%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
        margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .custom_explore_background  {
        padding: 4% 22.5% 4% 22.5%; 
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 85.5%;
        margin-right: 10%;
    }
    .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}

</style>