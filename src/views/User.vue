<template>
    <div class="custom_background custom_user_profile_background">
        <AlertDialog :message="this.message" ref="alertdialog"  />
        <div v-if="this.user!==null" style="text-align: left;">            
                <span style="display: inline-block;" class="">
                    <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle" class="custom_user_profile_photo"></b-img>
                </span>
                
                    <!-- <span style="margin-left: 0%;"> -->
                        <span style="font-size: 158%; display: inline-block; margin: 0% 0% 0% 10%;">
                            {{this.user.name}}
                        </span>
                        <span style="margin: 0% 3.5% 0% 3%; display: inline-block;">
                            <b-button v-if="this.$store.state.user.user_id===this.user.user_id" class="p-1 custom_b-button">Edit</b-button>
                            <b-button v-else class="p-1 custom_b-button">Call</b-button>
                        </span>
                        <span>
                            <b-icon icon="three-dots" scale="1.6" class="custom_more_icon"></b-icon>
                        </span>
                    
                        <div style="margin: 0.2% 0% 2% 0%;" class="custom_user_profile_details">
                            <span class="custom_user_profile" style="margin-right: 5%"><b>{{this.user.posts_count}}</b> posts</span>
                            <span><b>{{this.user.reactions_count}}</b> likes</span>
                        </div>
                        <div class="custom_user_profile" style="font-size: 100%;">
                            {{this.user.role}}
                        </div>
                    <!-- </span> -->

        </div>







        <div class="custom_post_line"></div> 
   






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
            }









        },
        computed:    {

        }, 
        created()   {
            this.retrieveUser()
        }



    }
</script>

<style scoped>
    .custom_user_profile_photo  {
        width: 150px;
        height: 150px;
        margin: 0% 0% -50% 0%;
        padding: 0% 0% 0% 0%;
    }
    .custom_user_profile_background {
        padding: 8% 15% 0% 15%;
        overflow-x: hidden;
    }
    .custom_b-button    {
        width: 150%;
        height: 0.0%;
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
        margin: 5% 0% 0% 0%;
    }
    .custom_user_profile    {
        margin-left: 25.5%;
    }


   






</style>