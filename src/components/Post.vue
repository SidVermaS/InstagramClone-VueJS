<template>
    <b-card class="col-sm-12 col-md-6 mx-auto">
        <div class="custom_user_background">
            <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
            <span class="custom_user_name">{{post.name}}</span>
        </div>
        <b-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_image"></b-img>
        <div class="custom_post_caption">
            
            <!-- <b-icon v-if="post.status==='like'" icon="person-plus-fill" scale="1.6" variant="primary"></b-icon>
            <b-icon v-else icon="person-plus" scale="1.6"></b-icon>
            <b-icon v-if="post.status==='dislike'" icon="person-dash-fill" scale="1.6" variant="primary" class="custom_hand_thumb_doswn"></b-icon>
            <b-icon v-else icon="person-dash" scale="1.6" class="custom_hand_thumb_down"></b-icon> -->
            <b-icon v-if="post.status==='like'" icon="heart-fill" variant="danger" scale="1.6"></b-icon>
            <b-icon v-else icon="heart" scale="1.6" ></b-icon>
            <b-icon icon="chat" scale="1.6" style="margin: 0% 0% 0.35% 4%;"></b-icon>
            
            <p class="custom_caption_user_name custom_caption_post_reaction">{{post.reactions}} reacts</p>
            <span class="custom_caption_user_name">{{post.name}}</span>
            <span class="custom_caption_text">{{post.caption}}</span> 
        </div>


            
            
            

    </b-card>
</template>           
            
 <script>   
    import Connect from '../mixins/connect'

    export default  {
        name: 'Post',
        mixins: [Connect],
        props:  ['post'],    
        data()  {
            return  {
            }
        },    
        computed:   {
        }    


            
            
  }
</script>

            
<style scoped>
          
            

</style>