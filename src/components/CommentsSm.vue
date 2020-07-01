<template>
    <div class="custom_comments_sm_background">
        <b-icon icon="arrow-left" size="2.4" v-on:click="showCommentsSm" class="text-left float-left"></b-icon>
        <b-row class="w-100 text-left" style="height: 10vh;">
            <b-row class="w-100 ml-3 pt-0 pb-0 text-left" align-h="between">
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
                <b-col cols="10" class="p-0 m-0">
                    <span class="custom_full_post_user_name custom_comment_sm_user_name mt-1 mr-1">{{post.name}}</span>
                    <span class="custom_caption_text">{{post.caption}}</span> 
                </b-col>
            </b-row>
            <b-row class="w-100 ml-1 my-4" align-h="center">
                <b-icon icon="plus-circle" scale="1.6" v-on:click="retrieveAllComments"></b-icon>
            </b-row>
            <b-row class="w-100 m-0 p-0 text-left" style="">  
                <b-row v-for="(comment, index) in comments.slice().reverse()" :key="index" class="w-100 mx-0 my-2 p-0 text-left" >
                    <b-col cols="2" class="m-0 pl-3 pr-2">
                        <b-img :src="`${baseUrlUserPhoto}${comment.user.photo_url}`" rounded="circle" class="custom_user_photo m-0 p-0"></b-img>
                    </b-col>
                    <b-col cols="10" class="m-0 p-0 ">
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
    </div>
</template>

  <script>   
    import Connect from '../mixins/connect'

    export default  {
        name: 'CommentsSm',
        mixins: [ Connect ],
        props:  ['post', 'comments', 'isCommentsShowed' ],    
        data()  {
            return  {
                comment_text: ''
            }
        },    
        methods:    {
            async addComment()    {
                
            },
            async giveReaction()    {
               
                this.$emit('give-reaction', reaction) 
           },
           async retrieveAllComments()  {
               this.$emit('retrieve-all-comments')
           },
           async showCommentsSm() {
               this.$emit('show-comments-sm')
           },
            navigateToUser: async function()    {
                this.$emit('navigate-to-user', this.post.user_id)
            },
            navigateToFullPost: async function()    {
               this.$emit('navigate-to-post', this.post.post_id) 
            },

        },
        computed:   {
        }    


            
            
  }
</script> 
<style scoped>
@media only screen and (max-width: 445px) {
       .custom_comments_sm_background   {
        padding: 4.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}

@media only screen and (max-width: 480px) and (min-width : 445px) {
        .custom_comments_sm_background   {
        padding: 0.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}

    /* Custom, iPhone Retina */ 
@media only screen and (max-width : 480px)  and (min-width : 665px)  {
       .custom_comments_sm_background   {
        padding: 0.5% 0% 0% 0%;
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}

/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 665px) and (min-width : 480px) {
        .custom_comments_sm_background   {
        padding: 0.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}

@media only screen and (max-width: 768px) and (min-width : 665px) {
        .custom_comments_sm_background   {
        padding: 6.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}
/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
       .custom_comments_sm_background   {
        padding: 6.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
      .custom_comments_sm_background   {
        padding: 6.5% 0% 0% 0%
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
    .custom_comments_sm_background   {
        padding: 6.5% 0% 0% 0%;
    }
    .custom_comment_sm_user_name    {
        padding-left: 4%;
    }
}
</style>