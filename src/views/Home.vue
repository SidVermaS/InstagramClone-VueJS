<template>
  <div class="custom_background">
      <AlertDialog v-bind:message="message" ref="alertdialog" />
      <b-container fluid=true>
        <b-row>
          <b-col lg="2" sm="0">
          </b-col>
          <b-col lg="6" sm="12">
              <span v-for="(post, index) in posts" :key="post.post_id">
                <Post :post="post" :index="index" v-on:give-reaction="giveReaction" v-on:navigate-to-user="navigateToUser" v-on:show-dialog="showDialog" class="custom_post"  />
              </span>  
          </b-col> 
          <b-col lg="4" sm="0">
              <Suggestions class="position-fixed w-100 h-100" />
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import Connect from '../mixins/connect'
  import Post from '../components/Post'
  import Suggestions from '../components/Suggestions'
  import AlertDialog from '../components/AlertDialog'
  export default {
    name: 'Home',
    mixins:[
      Connect,
    ],
    components: {
      Post,
      Suggestions,
      AlertDialog
    },
    data()  {
      return  {
        displayed_posts: [],
        posts: [],
        page: -1,
        message: '',
      }
    },
    methods:  {
      async retrieveAllPosts()  {
        this.page++

        const { status, body }=await this.getRequest(`${this.subUrl.post}?page=${this.page}&user_id=${this.$store.state.user.user_id}`)
        this.message=body['message']
        if(status===200)  {

          this.posts.push(...body['posts'])
        } else if(!this.message)  {
          this.message='Failed to connect'
          this.$refs.alertdialog.showDialog()
        } else  {
          this.$refs.alertdialog.showDialog()
        }
      },
      async giveReaction(reaction)  {
        
        const formData={ status: reaction.status, post_id: parseInt(reaction.post_id), user_id: parseInt(reaction.user_id) }
        
        const { status, body }=await this.patchRequest(`${this.subUrl.reaction}`, formData)
        this.message=body['message']
        if(status===200)  {
          this.posts[reaction.index].status=reaction.status
          if(reaction.status==='like') {
            this.posts[reaction.index].reactions_count=this.posts[reaction.index].reactions_count+1
          } else  {
            this.posts[reaction.index].reactions_count=this.posts[reaction.index].reactions_count-1
          }
        }   else    {  
          if(!this.message)    {
              this.message='Failed to connect'
          }      
          this.$refs.alertdialog.showDialog()  
        }  

      },
      navigateToUser: async function(user_id)   {
            this.$router.push({ name: 'User', params: { user_id: user_id }})
      },
      async showDialog(sentMessage)  {
        this.message=sentMessage
        this.$refs.alertdialog.showDialog()
      }
      
    },
    created()  {
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






</style>