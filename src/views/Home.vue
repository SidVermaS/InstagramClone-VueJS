<template>
  <div class="custom_background">
    <span style="display: inline;">
      <div v-for="post in displayed_posts" :key="post.post_id">
        <Post :post="post" class="custom_post" />
      </div>      
      <!-- <span style="display: inline;">
          <b-img :src="`${this.baseUrlPostPhoto}${this.$store.state.user.photo_url}`" rounded="circle" class="custom_user_photo_side"></b-img>
      </span> -->
    </span> 
    
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import Connect from '../mixins/connect'
  import Post from '../components/Post'
  export default {
    name: 'Home',
    mixins:[
      Connect,
    ],
    components: {
      Post
    },
    data()  {
      return  {
        displayed_posts: [],
        posts: [],
        page: -1,
        message: ''
      }
    },
    methods:  {
      async retrieveAllPosts()  {
        this.page++

        const { status, body }=await this.getRequest(`${this.subUrl.post}?page=${this.page}&user_id=${this.$store.state.user.user_id}`)
        this.message=body['message']
        if(status===200)  {
          this.posts.push(...body['posts'])
          this.displayed_posts=[...this.posts]
        } else if(!this.message)  {
          this.message='Failed to connect'
          this.$refs.alertdialog.showDialog()
        } else  {
          this.$refs.alertdialog.showDialog()
        }
      }
    },
    mounted()  {
      this.retrieveAllPosts()
    }
  }
  // #ED4956
// #3AACF7 blue

</script>


<style scoped>
  .custom_post  {
    margin-top: 3%;
  }    
  .custom_user_photo_side {
    width: 10%;
    height: 10%;
  }  





</style>