<template>
    <div class="custom_background custom_explore_background">
        <span class="suggested_lg">Suggested</span>
        <b-card no-body class="pl-3  pt-2">
            <b-row v-for="(user, index) in this.users" :key="index">
                <!-- <b-avatar :src="`${baseUrlUserPhoto}${user.photo_url}`" size="2.4rem" style="display: inline-block;"></b-avatar>
                    <span style="display:inline-block;">           
                        <span id="custom_user_name">{{user.name}}</span> <br>     
                        <span id="custom_user_role" class="custom_faded_color">{{user.role}}</span>
                    </span> -->
                 <b-col class="text-left">
                    <span v-on:click="navigateToUser">
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
                <b-button variant="primary" v-on:click="navigateToUser" class="custom_explore_view float-right p-0">View</b-button>
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
    .custom_user_photo  {
        /* margin: 0% 5% 15% 0%; */
    } 
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        /* margin: 10% 0% -0% 0%; */
        padding: 0% 0% -10% 0%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }
   
@media only screen and (max-width: 265px) {
  .custom_explore_background  {
        padding: 35% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 55%;
        width: 30%;
        font-size: 75.5%;
         margin-right: 20%;
    }
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .custom_explore_background  {
        padding: 20% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 55%;
        width: 30%;
        font-size: 75.5%;
         margin-right: 20%;
    }
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .custom_explore_background  {
        padding: 15% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 30%;
        font-size: 75.5%;
         margin-right: 15%;
    }
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .custom_explore_background  {
        padding: 20% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 30%;
        font-size: 75.5%;
         margin-right: 15%;
    }
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
  .custom_explore_background  {
        padding: 20% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 20%;
        font-size: 75.5%;
         margin-right: 10%;
    }
}
@media only screen and (max-width: 630px) and (min-width : 480px) {
  .custom_explore_background  {
        padding: 9.5% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 20%;
        font-size: 75.5%;
         margin-right: 10%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 700px) and (min-width : 630px) {
 .custom_explore_background  {
        padding: 10% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 20%;
        font-size: 75.5%;
         margin-right: 10%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 700px) {
  .custom_explore_background  {
        padding: 10% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 20%;
        font-size: 75.5%;
         margin-right: 10%;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
  .custom_explore_background  {
        padding: 10% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: none;
  }
   .custom_explore_view    {
        height: 65%;
        width: 20%;
        font-size: 75.5%;
         margin-right: 10%;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
  .custom_explore_background  {
        padding: 10% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: block;
  }
   .custom_explore_view    {
        height: 65%;
        width: 15%;
        font-size: 75.5%;
        margin-right: 10%;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .custom_explore_background  {
        padding: 10% 0% 0% 0%; 
    }
  .custom_suggestions {
    display: block;
  }
   .custom_explore_view    {
        height: 65%;
        width: 15%;
        font-size: 75.5%;
        margin-right: 10%;
    }
}

</style>