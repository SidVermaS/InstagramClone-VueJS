<template>
    <div>
        <CommentsSm v-if="isCommentsShowed" :post="post" :comments="comments" v-on:show-comments-sm="showCommentsSm" v-on:retrieve-all-comments="retrieveAllComments"   /> 
        <b-card v-else no-body class="p-0">
            <div class="custom_user_background">
                <span v-on:click="navigateToUser">
                <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
                <span class="custom_user_name">{{post.name}}</span>
                </span>
            </div>
            <b-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_image"></b-img>
            <div class="custom_post_caption">
                
                <!-- <b-icon v-if="post.status==='like'" icon="person-plus-fill" scale="1.6" variant="primary"></b-icon>
                <b-icon v-else icon="person-plus" scale="1.6"></b-icon>
                <b-icon v-if="post.status==='dislike'" icon="person-dash-fill" scale="1.6" variant="primary" class="custom_hand_thumb_doswn"></b-icon>
                <b-icon v-else icon="person-dash" scale="1.6" class="custom_hand_thumb_down"></b-icon> -->
                <div class="custom_actions">
                    <b-icon v-if="post.status==='like'" icon="heart-fill" variant="danger" scale="1.6" v-on:click="giveReaction"></b-icon>
                    <b-icon v-else icon="heart" scale="1.6" v-on:click="giveReaction"></b-icon>
                    <b-icon v-on:click="showCommentsSm" icon="chat" scale="1.6" style="margin: 0% 0% 0.35% 4%;"></b-icon>
                </div>

                <p class="custom_caption_user_name custom_caption_post_reaction">{{post.reactions_count}} reacts</p>
                <span class="custom_caption_user_name">{{post.name}}</span>
                <span class="custom_caption_text">{{post.caption}}</span> 
            
                <div class="custom_comment_line"></div>         

            </div>
        </b-card>
    </div>
</template>           
<script>   
    import Connect from '../mixins/connect'
    import CommentsSm from '../components/CommentsSm'
    export default  {
        name: 'PostSm',        
        mixins: [ Connect ],
        props:  ['post', 'comments' ],   
        components: {
            CommentsSm
        },
        data()  {
            return  {
                isCommentsShowed: false
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
            navigateToUser: async function()    {
                this.$emit('navigate-to-user', this.post.user_id)
            },
            navigateToFullPost: async function()    {
               this.$emit('navigate-to-post', this.post.post_id) 
            },
            showCommentsSm: async function()    {
                this.isCommentsShowed=!this.isCommentsShowed
            }
        },
        computed:   {
        }    


            
            
  }
</script>          