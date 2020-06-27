<template>
    <div class="custom_background custom_user_profile_background">
        <AlertDialog :message="this.message" ref="alertdialog"  />
        <div v-if="this.user!==null" style="text-align: left;">   
            <b-row class="custom_user_profile_desktop">
                <b-col cols="3" class="p-0 m-0">
                    <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle" class="custom_user_profile_photo"></b-img>
                </b-col>   
                <b-col cols="9" class="p-0 m-0">
                    <b-row>                     
                        <span style="font-size: 158%; margin-left: 2.5%;" >
                            {{this.user.name}}
                        </span>
                        <span style="margin: 0% 10.0% 0% 5.0%;">                       
                            <b-button v-if="this.$store.state.user.user_id===this.user.user_id" class="p-0 custom_b-button custom_b-button_size">Edit</b-button>
                            <b-button v-else class="p-0 custom_b-button custom_b-button_size">Call</b-button>
                        </span>
                        <span>
                            <b-icon icon="three-dots" scale="1.6" class="custom_more_icon"></b-icon>
                        </span>
                    </b-row>       
                    <b-row>
                        <b-col style="margin: 2.5% 0% 2.5% 0%">
                        <span class="custom_user_profile_details">
                            <span style="margin-right: 5%"><b>{{this.user.posts_count}}</b> posts</span>
                            <span><b>{{this.user.reactions_count}}</b> likes</span>
                        </span>   
                        </b-col>                     
                    </b-row>
                    <b-row>
                        <b-col>
                            <span style="font-size: 100%;">
                                {{this.user.role}}
                            </span>
                        </b-col>
                    </b-row>    
                   
                </b-col>
            </b-row>  
            <b-row class="custom_user_profile_mobile">
                <b-row class="mx-4">
                    <b-col cols="3">
                         <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle" class="custom_user_profile_photo"></b-img>
                    </b-col>
                    <b-col cols="7" class="ml-5">
                        <b-row>
                        <span style="font-size: 28px; margin: 0% 5% 0% 0.0%;" >
                            {{this.user.name}}
                        </span>
                        <span>
                            <b-icon icon="three-dots" scale="1.6" class="custom_more_icon"></b-icon>
                        </span>
                        </b-row>
                        <b-row>
                            <span style="">                       
                                <b-button v-if="this.$store.state.user.user_id===this.user.user_id" class="p-0 custom_b-button custom_b-button_size">Edit</b-button>
                                <b-button v-else class="p-0 custom_b-button custom_b-button_size">Call</b-button>
                            </span>
                        </b-row>
                    </b-col>
                </b-row>               
                <b-row class="mt-3 mx-4">
                    <b-col>
                        <span style="font-size: 100%;">
                            {{this.user.role}}
                        </span>
                    </b-col>
                </b-row>  
                <div class="custom_post_line custom_post_line_margin"></div>
                    
                 
                <b-row class="text-center" align-h="around">
                    <b-col cols="2">
                        <b>{{this.user.posts_count}}</b>
                        <div class="custom_faded_color">posts</div>
                    </b-col>
                    <b-col cols="2">
                        <b>{{this.user.reactions_count}}</b>
                        <div class="custom_faded_color">likes</div>
                    </b-col>                   
                </b-row>
            </b-row>
        </div>
        <div class="custom_post_line custom_post_line_margin"></div> 
        <span v-if="posts.length>0">
            <b-row v-for="indexRow in (Math.floor(posts.length/3)+1)" :key="indexRow"  class="custom_post_photo_row p-0">

                <b-col v-for="indexCol in 3" :key="indexCol" class="p-0 custom_post_photo_column">
                        <b-img v-if="posts[indexRow*indexCol]!==undefined" :src="`http://localhost:3000/uploads/posts/${posts[indexRow*indexCol].photo_url}`" class="p-0 m-0" style="width: 100%; height: 100%"  />
                  
                </b-col>
            </b-row>
        </span>





    </div>
</template>   

<script>
    import Vuex from 'vuex'
    import Connect from '../mixins/connect'
    import AlertDialog from '../components/AlertDialog'
    export default {
        name: 'User', 
        mixins: [Connect],
        components: {
            AlertDialog
        },
        data()  {
            return  {
                user: null,
                posts: [],
                page: -1,
                message: ''
            }
        },
        methods: {
            retrieveUser: async function()  {
                const { status, body }=await this.getRequest(`${this.subUrl.user}${this.$route.params.user_id}`)

                this.message=body['message']
                if(status===200)  {
                    this.user=body['user']
                } else if(!this.message)  {
                    this.message='Failed to connect'
                    this.$refs.alertdialog.showDialog()
                } else  {
                    this.$refs.alertdialog.showDialog()
                }
            },
            retrieveAllPosts: async function()  {
                this.page++

                const { status, body }=await this.getRequest(`${this.subUrl.post}${this.subUrl.user}?page=${this.page}&user_id=${this.$route.params.user_id}`)
                this.message=body['message']
                if(status===200)  {

                    this.posts.push(...body['posts'])
                } else if(!this.message)  {
                    this.message='Failed to connect'
                    this.$refs.alertdialog.showDialog()
                } else  {
                    this.$refs.alertdialog.showDialog()
                }



            }
        },
        computed:    {

        }, 
        created()   {
            this.retrieveUser()
            this.retrieveAllPosts()
        },
        mounted()   {
        }



    }
</script>

<style scoped>
    
    /* .custom_user_profile_background {
        padding: 8% 15% 0% 15%;
        overflow-x: hidden;
    } */
    .custom_b-button    {      
        color: black;
        font-size: 77.5%;
        font-weight: bold;
        border: 1px solid #a9aaa1;
        border-radius: 5px;
        background: transparent;
        
    }    
    .custom_more_icon   {
        margin: 0.5% 0% 0% 0%;
    }
    .custom_user_profile_details {
        font-size: 96.5%;
    }
    .custom_post_line   {
        width: 100%;
        height: 1px;
        background: lightgrey;       
    }
    
    .custom_post_photo  {
        width: 85%;
        height: 135%;

    }

/* Custom, iPhone Retina */ 
@media only screen and (max-width : 480px) {
    .custom_user_profile_desktop    {
       margin: 6% 0% 0% 4%;
       display: none;
    }
    .custom_user_profile_mobile {
        margin: 15% 0% 4% 0%;
        display: block;
    }
    
    .custom_user_profile_photo  {
         width: 77px;
        height: 77px;
    }
    .custom_user_profile_info   {
        /* margin-left: 20%; */
    }
    .custom_b-button_size   {
        width: 250%;
        height: 100.0%;
    }
    .custom_post_line_margin    {
        margin: 2.5% 0% 2.5% 0%;
    }
    .custom_post_photo_row   {
        margin: 1.5% 0% 0% 0%;
        width: 100%;
        height: 120px;
    }
    .custom_more_icon   {
        margin: 5% 0% 0% 0%;
    }
    .custom_user_profile_background {
        padding: 8% 0% 10% 0%;
        overflow-x: hidden;
    }
    .custom_post_photo_column   {
        margin: 0% 0.7% 0% 0.7%;
    }

}

/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 480px) {
    .custom_user_profile_desktop    {
       margin: 5% 0% 0% 4%;
       display: block;
    }
     .custom_user_profile_mobile {

        display: none;
    }
    .custom_user_profile_photo  {
         width: 120px;
        height: 120px;
    }
    .custom_user_profile_info   {
        /* margin-left: 20%; */
    }
     .custom_b-button_size   {
        width: 250%;
        height: 70.0%;
    }
      .custom_post_line_margin    {
        margin: 5% 0% 5% 0%;
    }
    .custom_post_photo_row   {
        margin: 1.5% 0% 0% 0%;
        width: 100%;
        height: 200px;
    }
    .custom_user_profile_background {
        padding: 8% 0% 10% 0%;
        overflow-x: hidden;
    }
    .custom_post_photo_column   {
        margin: 0% 0.7% 0% 0.7%;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
    .custom_user_profile_desktop    {
       margin: 5% 0% 0% 4%;
       display: block;
    }
      .custom_user_profile_mobile {

        display: none;
    }
     .custom_user_profile_photo  {
        width: 120px;
        height: 120px;
    }
    .custom_user_profile_info   {
        /* margin-left: 20%; */
    }
     .custom_b-button_size   {
        width: 250%;
        height: 70.0%;
    }
      .custom_post_line_margin    {
        margin: 5% 0% 5% 0%;
    }
    .custom_post_photo_row   {
        margin: 1.5% 0% 0% 0%;
        width: 100%;
        height: 200px;
    }
    .custom_user_profile_background {
        padding: 8% 15% 10% 15%;
        overflow-x: hidden;
    }
    .custom_post_photo_column   {
        margin: 0% 0.7% 0% 0.7%;
    }
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
    .custom_user_profile_desktop    {
       margin: 0% 0% 0% 4%;
       display: block;
    }
      .custom_user_profile_mobile {

        display: none;
    }
    .custom_user_profile_photo  {
        width: 150px;
        height: 150px;
    }
    .custom_user_profile_info   {
        /* margin-left: 50%; */
    }
     .custom_b-button_size   {
        width: 250%;
        height: 70.0%;
    }
      .custom_post_line_margin    {
        margin: 5% 0% 5% 0%;
    }
    .custom_post_photo_row   {
       margin: 2.5% 0% 0% 0%;
        width: 100%;
        height: 250px;
    }
    .custom_user_profile_background {
        padding: 8% 15% 10% 15%;
        overflow-x: hidden;
    }
    .custom_post_photo_column   {
        margin: 0% 1.3% 0% 1.3%;
    }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
    .custom_user_profile_desktop    {
       margin: 0% 0% 0% 4%;
       display: block;
    }
      .custom_user_profile_mobile {

        display: none;
    }
    .custom_user_profile_photo  {
        width: 150px;
        height: 150px;
    }
    .custom_user_profile_info   {
        /* margin-left: 20%; */
    }
     .custom_b-button_size   {
        width: 250%;
        height: 70.0%;
    }
      .custom_post_line_margin    {
        margin: 5% 0% 5% 0%;
    }
    .custom_post_photo_row   {
        margin: 2.5% 0% 0% 0%;
        width: 100%;
        height: 250px;
    }
    .custom_user_profile_background {
        padding: 8% 15% 10% 15%;
        overflow-x: hidden;
    }
    .custom_post_photo_column   {
        margin: 0% 1.3% 0% 1.3%;
    }  
}





</style>