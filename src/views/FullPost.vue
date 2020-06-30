<template>
    <div class="custom_background custom_full_post_background">
        <AlertDialog :message="message" ref="alertdialog"  />
        <span v-if="post!==null">
            <b-card no-body class="custom_b-card custom_comment_desktop"> 
                <b-row class="p-0 m-0 ">
                    <b-col lg="8" md="7" class="p-0 m-0">
                        <b-card-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_full_post_image"></b-card-img>
                    </b-col>  
                    <b-col lg="4" md="5" class="p-0 m-0">  
                        <b-row class="w-100 text-left" style="height: 10vh;">
                            <b-row class="w-100 ml-3 pt-2 pb-0 text-left" align-h="between">
                                    <b-col cols="10">
                                        <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo mr-1"></b-img>
                                        <span class="custom_user_name mt-1">{{post.name}}</span>
                                    </b-col>
                                    <b-col cols="2" class="text-right">
                                        <b-icon icon="three-dots" scale="1.2" class="mt-1 custom_more_icon"></b-icon>
                                    </b-col>
                            </b-row>
                            <b-row class="w-100 p-0 ml-3">
                                <div class="custom_post_line"></div>
                            </b-row>  
                        </b-row>      
                        <b-row class="w-100 m-0 p-0 text-left" style="overflow-x: hidden; overflow-y: scroll; height: 55vh;">
                            <b-row class="w-100 ml-0 text-left">
                                <b-col cols="2" class="m-0 pl-3">
                                    <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo m-0 p-0"></b-img>
                                </b-col>
                                <b-col cols="10" class="m-0 p-0">
                                    <span class="custom_full_post_user_name mt-1 mr-1">{{post.name}}</span>
                                    <span class="custom_caption_text">{{post.caption}}</span> 
                                </b-col>
                            </b-row>
                            <b-row class="w-100 ml-1 my-4" align-h="center">
                                <b-icon icon="plus-circle" scale="1.6" v-on:click="retrieveAllComments"></b-icon>
                            </b-row>
                            <b-row class="w-100 m-0 p-0 text-left" style="">  
                                <b-row v-for="(comment, index) in comments.slice().reverse()" :key="index" class="w-100 mx-0 my-2 p-0 text-left" >
                                    <b-col cols="2" class="m-0 pl-3">
                                        <b-img :src="`http://localhost:3000/uploads/users/${comment.user.photo_url}`" rounded="circle" class="custom_user_photo m-0 p-0"></b-img>
                                    </b-col>
                                    <b-col cols="10" class="m-0 p-0">
                                        <span class="custom_full_post_user_name" style="display: inline-block;">{{comment.user.name}}</span>
                                        <span class="custom_caption_text ml-1">{{comment.comment_text}}</span> 
                                    </b-col>
                                </b-row>
                            </b-row>
                        </b-row>
                        <b-row class="w-100 p-0 py-0 m-0 border text-left" style="height: 15h;">
                            <span class="mt-2 mb-0 px-3">
                                <span style="display: inline-block;" class="p-0 mr-4 my-0">
                                    <b-icon v-if="post.status==='like'" icon="heart-fill" variant="danger" scale="1.6" v-on:click="giveReaction"></b-icon>
                                    <b-icon v-else icon="heart" scale="1.6" v-on:click="giveReaction"></b-icon>
                                </span>
                                <span>
                                    <b-icon icon="chat" scale="1.6" style=""></b-icon>
                                </span>
                            </span>
                            <span class="w-100 px-3 mb-0 custom_caption_user_name custom_full_post_reaction" >{{post.reactions_count}} reacts</span>
                            <div class="custom_post_line"></div>
                            <b-input-group>
                                <b-form-textarea              
                                    rows="1" max-rows="2" placeholder="Add a comment..."
                                    class="custom_textarea_comment" size="sm" v-model="comment_text">
                                </b-form-textarea>   
                                <b-input-group-append>    
                                    <span class="px-1 custom_textarea_comment_button custom_secondary_color">Post</span>
                                </b-input-group-append>
                            </b-input-group>
                        </b-row>
                    
                    </b-col>   
                </b-row>
            </b-card>
            <span class="p-0 m-0 custom_comment_mobile">
                <PostSm :post="post" :comments="comments"  />
            </span>
        </span>
        
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import Connect from '../mixins/connect'
    import AlertDialog from '../components/AlertDialog'
    import Comments from '../components/Comments'
    import PostSm from '../components/PostSm'

    export default  {
        name: 'FullPost',
        mixins: [Connect],
        props:  [],
        components: {
            Comments,
            PostSm,
            AlertDialog
        },
        data()  {
            return  {
                post: null,
                comment_text: '',
                comments: [],
                page: -1,
                message: '',
            }
        },
        methods:    {
            async retrievePost()  {

                const { status, body }=await this.getRequest(`${this.subUrl.post}${this.$route.params.post_id}?user_id=${this.$store.state.user.user_id}`)
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
             async giveReaction()  {
        
                const formData={ status: this.post.status===null || this.post.status!=='like'?'like':'remove', post_id: parseInt(reaction.post_id), user_id: parseInt(reaction.user_id) }
                
                const { status, body }=await this.patchRequest(`${this.subUrl.reaction}`, formData)
                this.message=body['message']
                if(status===200)  {
                    this.post.status=reaction.status
                    if(reaction.status==='like') {
                        this.post.reactions_count=this.post.reactions_count+1
                    } else  {
                        this.post.reactions_count=this.post.reactions_count-1
                    }
                }   else    {  
                    if(!this.message)    {
                        this.message='Failed to connect'
                    }      
                    this.$refs.alertdialog.showDialog()  
                }  

            },
      },
        created()   {
            this.retrievePost()
            this.retrieveAllComments()
            this.setCurrentPage('current_page',null)
        }





   
}

</script>

<style scoped>
.custom_full_post_image {
    width: 100%;
    height: 80vh;
}


.custom_textarea_comment, .custom_textarea_comment:focus  {
    padding-bottom: 0%;    
    border: none;
    overflow: auto;
    outline: none;
    background-color: transparent;
    border-style: none;

    -webkit-appearance:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;

} 
.custom_textarea_comment_button  {
    font-size: 75%;
    font-weight: 700;       
    text-align: center;
    padding: 50% 10% 0% 0%;
    margin: 0% 5% 0% 5%;
}





@media only screen and (max-width: 445px) {
    .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        display: block;
    }
        .custom_full_post_background    {
        padding: 20% 0% 0% 0%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}

@media only screen and (max-width: 480px) and (min-width : 445px) {
    .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        display: block;
    }
        .custom_full_post_background    {
        padding: 15.5% 0% 0% 0%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}

    /* Custom, iPhone Retina */ 
@media only screen and (max-width : 480px)  and (min-width : 665px)  {
    .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        display: block;
    }
        .custom_full_post_background    {
        padding: 9.5% 0% 0% 0%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}

/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 665px) and (min-width : 480px) {
     .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        display: block;
    }
    .custom_full_post_background    {
        padding: 12.5% 0% 0% 0%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}

@media only screen and (max-width: 768px) and (min-width : 665px) {
     .custom_comment_desktop    {
       display: none;
    }
    .custom_comment_mobile {
        display: block;
    }
    .custom_full_post_background    {
        padding: 8.5% 0% 0% 0%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}
/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
     .custom_comment_desktop    {
       display: block;
    }
    .custom_comment_mobile {
        display: none;
    }
        .custom_full_post_background    {
        padding: 9.5% 1% 0% 1%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
    .custom_comment_desktop    {
       display: block;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: none;
    }
        .custom_full_post_background    {
        padding: 6.5% 2.5% 0% 2.5%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
     .custom_comment_desktop    {
       display: block;
    }
    .custom_comment_mobile {
        margin: 15% 0% 4% 0%;
        display: none;
    }
        .custom_full_post_background    {
        padding: 6.5% 15% 0% 15%;
    }
    .custom_b-card  {
        height: 80vh;
    }
}
</style>