<template>
    <div class="custom_background custom_full_post_background">
        <AlertDialog :message="this.message" ref="alertdialog"  />
        <b-card no-body style="" class="p-0 mr-2">        
            <b-row no-gutters class="p-0 m-0">
                <b-col cols="7" class="p-0 m-0">
                    <b-card-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_full_post_image"></b-card-img>
                </b-col>  
                <b-col cols="4" class="p-0 m-0 text-left">
                    <b-row class="mx-2 my-4" align-h="between">
                        <b-col cols="10">
                            <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo mr-2"></b-img>
                            <span class="custom_user_name mt-1">{{post.name}}</span>
                        </b-col>
                        <b-col cols="2" class="text-right">
                            <b-icon icon="three-dots" scale="1.2" class="mt-1 custom_more_icon"></b-icon>
                        </b-col>
                    </b-row>
                    <div class="custom_post_line"></div>
                    <b-row class="mx-4 my-3 p-0">
                        <b-col cols="1" class="m-0 p-0">
                            <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo m-0 p-0"></b-img>
                        </b-col>
                        <b-col cols="11" class="m-0 pl-2 p-0">
                            <span class="custom_full_post_user_name mt-1 mr-1">{{post.name}}</span>
                            <span class="custom_caption_text">{{post.caption}}</span> 
                        </b-col>
                    </b-row>
                    <b-row align-h="center">
                        <b-icon icon="plus-circle" scale="1.6"></b-icon> 
                    </b-row>
                </b-col>
            </b-row>















        </b-card>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import Connect from '../mixins/connect'
    import AlertDialog from '../components/AlertDialog'

    export default  {
        name: 'FullPost',
        mixins: [Connect],
        props:  [],
        components: {
            AlertDialog
        },
        data()  {
            return  {
                post: null,
                comments: [],
                page: -1,
                message: '',
            }
        },
        methods:    {
            async retrievePost()  {

                const { status, body }=await this.getRequest(`${this.subUrl.post}${this.$route.params.post_id}`)
                this.message=body['message']
                if(status===200)  {
                    this.post=body['post']
                } else if(!this.message)  {
                    this.message='Failed to connect'
                    this.$refs.alertdialog.showDialog()
                } else  {
                    this.$refs.alertdialog.showDialog()
                }
            },
            async retrieveAllComments()  {
                this.page++
                
                const { status, body }=await this.getRequest(`${this.subUrl.comment}?page=${this.page}&post_id=${this.$route.params.post_id}`)

                this.message=body['message']
                
                if(status===200)  {

                    this.comments.push(...body['comments'])
                } else if(!this.message)  {
                    this.message='Failed to connect'
                    this.$refs.alertdialog.showDialog()
                } else  {
                    this.$refs.alertdialog.showDialog()
                }
            },    
      },
        created()   {
            this.retrievePost()
            this.retrieveAllComments()
        }





   
}

</script>

<style scoped>
.custom_full_post_image {
    width: 100%;
    height: 100%;
}

.custom_full_post_user_name {
  font-weight: bold;
  font-size: 85%;
}










    /* Custom, iPhone Retina */ 
@media only screen and (max-width : 480px) {
    .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: block;
    }
        .custom_full_post_background    {
        padding: 5% 0% 0% 0%;
    }

}

/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 480px) {
     .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: block;
    }
        .custom_full_post_background    {
        padding: 10% 0% 0% 0%;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
       .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: block;
    }
        .custom_full_post_background    {
        padding: 6.5% 10% 5% 10%;
    }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
     .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: block;
    }
        .custom_full_post_background    {
        padding: 6.5% 10% 5% 10%;
    }
}
</style>