<template>
    <div >
        <div class="custom_user_background">
            <b-img :src="`${this.baseUrlUserPhoto}${post.user_photo_url}`" rounded="circle" class="custom_user_photo"></b-img>
        </div>
        <b-img :src="`${this.baseUrlPostPhoto}${post.photo_url}`" class="custom_image"></b-img>
        <p>{{post.caption}}</p>    


            
            
            

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