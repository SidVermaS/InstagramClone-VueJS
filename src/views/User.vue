<template>
    <div class="custom_background custom_user_profile_background">
        <AlertDialog :message="this.message" ref="alertdialog"  />
        <b-row v-if="this.user!==null">
            <b-col>
                <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
            </b-col>
            <b-col style="margin-left: -17.5%;">
                <b-row>
                    <span style="margin-right: 4%; font-size: 158%; font-weight: 4;">{{this.user.name}}</span>
                    <b-button v-if="this.$store.state.user.user_id===this.user.user_id" class="p-0 custom_b-button">Edit</b-button>
                    <b-button class="p-1 custom_b-button">Call</b-button>
                    <b-icon icon="three-dots" scale="1.6" class="custom_more_icon"></b-icon>
                </b-row>
                <b-row style="font-size: 96.5%; margin: 2% 0% 2% 0%;">
                    <span><b>{{this.user.posts_count}}</b> posts</span>
                     <span style="margin-left: 5%;"><b>{{this.user.reactions_count}}</b> reactions</span>
                </b-row>
            </b-col>




   


        </b-row>

   






   






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
    .custom_user_photo  {
        width: 19.5%;
        height: 129.5%;
    }
    .custom_user_profile_background {
        padding: 7.5% 0% 0% 0%;
    }
    .custom_b-button    {
        width: 10%;
        height: 50.0%;
        color: black;
        font-size: 77.5%;
        font-weight: bold;
        border: 1px solid #a9aaa1;
        border-radius: 5px;
        background: transparent;
        
    }    
    .custom_more_icon   {
        margin: 0.5% 0% 0% 2.75%;
    }






   






</style>