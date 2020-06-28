<template>
  <div class="custom_background m-0 p-0">
      <AlertDialog v-bind:message="message" ref="alertdialog" />
      <!-- <b-container fluid=true> -->
        <b-row class="custom_home">
          <b-col class="custom_all_posts">
              <span v-for="(post, index) in posts" :key="post.post_id">
                <Post :post="post" :index="index" v-on:give-reaction="giveReaction" v-on:navigate-to-user="navigateToUser" v-on:navigate-to-post="navigateToFullPost" v-on:show-dialog="showDialog" class="custom_post" />
              </span>  
          </b-col> 
          <b-col class="custom_suggestions">
              <Suggestions class="position-fixed w-100 h-100 custom_suggestions" />
          </b-col>
        </b-row>
      <!-- </b-container> -->
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
      navigateToFullPost: async function(post_id) {
        this.$router.push({ name: 'FullPost', params: { post_id: post_id } })
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

 @media only screen and (max-width: 265px) {
  .custom_post  {
    height: 35vh;
    margin: 92.5% 0% 92.5% 0%;
     /* padding: 0% -1% 0% -1%; */
  } 
  .custom_home  {
    padding:0;
    
  } 
  .custom_all_posts {
    margin: -33.5% 0% 10% 0%;
  }
  .custom_suggestions {
    display: none;
  }
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .custom_post  {
    height: 35vh;
    margin: 80.5% 0% 80.5% 0%;
     /* padding: 0% -1% 0% -1%; */
  } 
  .custom_home  {
    padding:0;
    
  } 
  .custom_all_posts {
    margin: -33.5% 0% 10% 0%;
  }
  .custom_suggestions {
    display: none;
  }
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .custom_post  {
    height: 45vh;
    margin: 72.5% 0% 72.5% 0%;
     /* padding: 0% -1% 0% -1%; */
  } 
  .custom_home  {
    padding:0;
    
  } 
  .custom_all_posts {
    margin: -33.5% 0% 10% 0%;
  }
  .custom_suggestions {
    display: none;
  }
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .custom_post  {
    height: 45vh;
    margin: 60.5% 0% 60.5% 0%;
     /* padding: 0% -1% 0% -1%; */
  } 
  .custom_home  {
    padding:0;
    
  } 
  .custom_all_posts {
    margin: -35.5% 0% 10% 0%;
  }
  .custom_suggestions {
    display: none;
  }
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
  .custom_post  {
    height: 45vh;
    margin: 52.5% 0% 52.5% 0%;
     /* padding: 0% -1% 0% -1%; */
  } 
  .custom_home  {
    padding:0;
    
  } 
  .custom_all_posts {
    margin: -33.5% 0% 10% 0%;
  }
  .custom_suggestions {
    display: none;
  }
}
@media only screen and (max-width: 630px) and (min-width : 480px) {
  .custom_post  {
    height:60vh;
    margin: 50.5% 0% 50.5% 0%;
  } 
  .custom_home  {
     margin: 0% 0% 0% 0%;
     padding: 0%;
  } 
  .custom_all_posts {
    margin-top: -30%;
  }
  .custom_suggestions {
    display: none;
  }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 700px) and (min-width : 630px) {
  .custom_post  {
    height:60vh;
    margin: 40.5% 0% 40.5% 0%;
  } 
  .custom_home  {
     margin: 0% 0% 0% 0%;
     padding: 0%;
  } 
  .custom_all_posts {
    margin-top: -25%;
  }
  .custom_suggestions {
    display: none;
  }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 700px) {
  .custom_post  {
    height: 70vh;
    margin: 40.5% 0% 40.5% 0%;
  } 
  .custom_home  {
     margin: 0% 5% 0% 5%;
  } 
  .custom_all_posts {
    margin-top: -35%;
  }
  .custom_suggestions {
    display: none;
  }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
  .custom_post  {
    height: 70vh;
     margin: 47.5% 0% 47.5% 0%;
  } 
  .custom_home  {
     margin: 0% 10% 0% 10%;
  } 
  .custom_all_posts {
    margin-top: -35%;
  }
  .custom_suggestions {
    display: none;
  }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
  .custom_post  {
    height: 70vh;
     margin: 47.5% 0% 47.5% 0%;
  } 
  .custom_home  {
    margin: 0% -25% 0% 2%;
  } 
  .custom_all_posts {
    margin-top: -15%;
  }
  .custom_suggestions {
    display: block;
  }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .custom_post  {
    height: 70vh;
    margin: 47.5% 0% 47.5% 0%;
  } 
  .custom_home  {
    margin: 0% -10% 0 15%;
  } 
  .custom_all_posts {
    margin-top: -15%;
  }
  .custom_suggestions {
    display: block;
  }
}




</style>