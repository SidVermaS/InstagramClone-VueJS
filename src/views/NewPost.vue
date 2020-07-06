<template>
  <div class="custom_background custom_direct_background">
      <AlertDialog v-bind:message="message" ref="alertdialog" />
         <b-card no-body>
            <b-row style="height: 65vh;">
                <input type="file" ref="fileInput" v-on:change="onFileChanged" style="display: none;"   />
                <span v-if="imageFile" class="mx-auto mb-2">
                    <b-img :src="imageUrl" v-on:click="$refs.fileInput.click()" class="select_image" />
                </span>
                <span v-else class="mx-auto my-auto">                   
                    <b-img :src="require('../assets/images/add_image.png')" v-on:click="$refs.fileInput.click()" class="add_image"  />                    
                    <span class="d-block mt-4 h5">Browse Image</span>
                    <span class="custom_faded_color" style="font-size: 15px;">Write a caption for the new post</span>
                </span>
            </b-row>
            <b-row style="height: 20vh;" class="caption_row">
              <b-input-group class="custom_input_group">
                <b-form-textarea rows="1" max-rows="2" placeholder="Caption..." size="sm" v-model="caption" class="custom_textarea_comment"></b-form-textarea>
                <b-input-group-append>
                  <span v-on:click="addPost" class="custom_textarea_comment_button custom_secondary_color">Post</span>
                </b-input-group-append>
              </b-input-group>
            </b-row>
        </b-card>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import { mapActions } from 'vuex'
  import Connect from '../mixins/connect'
  import AlertDialog from '../components/AlertDialog'
  
  export default {
    name: 'NewPost',
    mixins:[
      Connect,
    ],
    components: {
      AlertDialog,
    },
    data()  {
      return  {
        imageFile: null,
        imageUrl: null,
        caption: '',
        message: '',
      }
    },
    methods:  {
      
        async addPost()    {
              const photo_url=await this.uploadPhoto()
              if(photo_url) {
                const formData={
                      caption: this.caption,
                      user_id: this.$store.state.user.user_id,       
                      photo_url: photo_url
                  }
                  
                  const { status, body }=await this.postRequest(this.subUrl.post, formData)
                  this.message=body['message']

                  if(status===201)  {
                      this.imageFile=null
                      this.imageUrl=null
                      this.caption=''
                      this.$refs.alertdialog.showDialog()  
                  } else if(!this.message)  {
                      this.message='Failed to connect'
                      this.$refs.alertdialog.showDialog()                       
                  } else  {
                    this.$refs.alertdialog.showDialog()
                  }
              }
            },
             onFileChanged: async function(e)   {
                this.imageFile=e.target.files[0]
                if(this.imageFile)  {
                    this.imageUrl=URL.createObjectURL(this.imageFile)
                    console.log('imageFile: ',this.imageFile)
                }
            },
            async uploadPhoto() {
              const formData=new FormData()
              formData.append('file', this.imageFile)
              const { status, body }=await this.multipartRequest(`${this.subUrl.upload}?file_type=posts`, formData)
              this.message=body['message']
              if(status===201)  {
              }  else if(!this.message)  {
                this.message='Failed to connect'
                this.$refs.alertdialog.showDialog()                    
              } else  {
                 this.$refs.alertdialog.showDialog()
              } 
              console.log('pu: ',body['photo_url'])
              return body['photo_url']
            },
      navigateToHome: async function(post_id) {
        this.$router.push({ name: 'Home', })
      },
      async showDialog(sentMessage)  {
        this.message=sentMessage
        this.$refs.alertdialog.showDialog()
      },
       ...mapActions([
      "setCurrentPage"
    ])
    },
    created()  {
      this.setCurrentPage('new_post_active')
      
    }
  }

</script>


<style scoped>
  .custom_direct_message  {
        width: 160px;
        height: 160px;
        padding: 12px;
        float: center;
        border-width: thick;
    }
    .add_image  {
        width: 200px;
        height: 200px;
    }
    .select_image   {
        width: 370px;
        height: 370px;
    }
        .custom_textarea_comment, .custom_textarea_comment:focus  {
        /* margin-right: 3.5%; */
        padding: 0.5% 2% 0% 2%;   
        border: 1px solid #c7bfbf;

    } 
    .custom_textarea_comment_button  {
       font-size: 80%;
       font-weight: 700;       
       text-align: center;
       margin: 120% 0% 0% 40%;
    }
 @media only screen and (max-width: 265px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 5% 1.5% 5%;
    }
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 5% 1.5% 5%;
    }
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 5% 1.5% 5%;
    }
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 5% 1.5% 5%;
    }
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 5% 1.5% 5%;
    }
}
@media only screen and (max-width: 580px) and (min-width : 480px) {
 .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 3% 1.5% 3%;
    }
}
@media only screen and (max-width: 630px) and (min-width : 580px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 3% 1.5% 3%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 700px) and (min-width : 630px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 0% 7% 0% 7%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 3% 1.5% 3%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 700px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
       padding: 0% 7% 0% 7%; 
        overflow-y: hidden;
    }
          .caption_row  {
      margin: -5% 3% 1.5% 3%;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
       padding: 1% 8.5% 1% 8.5%; 
        overflow-y: hidden;
    }
      .caption_row  {
      margin: -5% 4% 1.5% 3%;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
        padding: 1% 17.5% 1% 17.5%; 
        overflow-y: hidden;
    }
      .caption_row  {
      margin: -5% 4% 1.5% 3%;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .custom_home  {
    padding:0;    
  } 
  .custom_direct_background  {
      padding: 1% 22.5% 1% 22.5%; 
        overflow-y: hidden;
    }
    .caption_row  {
      margin: -5% 4% 1.5% 3%;
    }
}




</style>