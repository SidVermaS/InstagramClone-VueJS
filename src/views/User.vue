<template>
    <div class="custom_background">
        <AlertDialog :message="this.message" ref="alertdialog"  />
        <b-row v-if="this.user!==null" style="padding-top: 30%;">
            <b-col>
                <b-img :src="`${this.baseUrlUserPhoto}${this.user.photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
            </b-col>
            <b-col>

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
        width: 25%;
        height: 100%;
    }



   






   






</style>