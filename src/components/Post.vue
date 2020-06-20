<template>
    <div >
        <div class="custom_user_background">
            <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
            <span class="custom_user_name">{{post.name}}</span>
        </div>
        <b-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_image"></b-img>
        <div class="custom_post_caption">
            <p class="custom_user_name">{{post.reactions}}</p>
            <span class="custom_user_name">{{post.name}}</span>
            <span>{{post.caption}}</span> 
        </div>


            
            
            

    </div>
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
        }    
            


            
            
  }
</script>

            
<style scoped>
          
            

</style>