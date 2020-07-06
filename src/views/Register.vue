<template>
        <div class="register_background ">
        <AlertDialog v-bind:message="message" ref="alertdialog" />
        <b-container>
            <b-row>
                <b-card class="col-sm-9 col-md-7 col-lg-5 mx-auto my-5">
                    <b-card-title>
                        <b-img :src="require('../assets/images/navbar/instagram.png')" alt="Instagram" class="mb-2" />   
                    </b-card-title>
                    <b-form @submit.prevent="registerUser" class="form-signin">
                         <div class="profile_photo_background">
                            <input type="file" ref="fileInput" v-on:change="onFileChanged" style="display: none;">   
                                
                            <b-avatar button :src="imageUrl" size="8.0rem" v-on:click="$refs.fileInput.click()" variant="info" class="profile_photo p-0"></b-avatar>      
                          
                            <div class="browse browse_margin">Browse</div>                 
                        </div>      
                        <div class="mt-4 form-label-group">
                            <input type="text" id="input-2" class="form-control" placeholder="Name" required  v-model="formData.name">
                            <label for="input-2">Name</label>
                        </div>      
                        <div class="form-label-group">
                            <input type="text" id="input-3" class="form-control" placeholder="Description" required  v-model="formData.role">
                            <label for="input-3">Description</label>
                        </div>  
                        <div class="form-label-group">
                            <input type="tel" id="input-4" class="form-control" placeholder="Mobile no." required  pattern="[0-9]{10}" autofocus  v-model="formData.mobile_no">
                            <label for="input-4">Mobile No.</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="input-5" class="form-control" placeholder="Password" required  v-model="formData.password">
                            <label for="input-5">Password</label>
                        </div>  

                        <button class="btn btn-lg btn-primary btn-block text-uppercase mt-2" type="submit">Register</button>
                        <hr class="my-3">      
                        <button v-on:click="navigate" style="background: white;" class="btn btn-lg btn-block custom_back_button text-uppercase" >Go back</button>
                    </b-form>    
                </b-card>
            </b-row>
        </b-container>

    </div>     
</template>

<script>
    import Connect from '../mixins/connect'
    import AlertDialog from '../components/AlertDialog'
    export default  {
        name: 'Register',
        mixins: [
            Connect
        ],
        components: {
            AlertDialog
        },
        data()  {
            return  {  
                mainProps:  {
                    height: 125,
                    width: 125    
                },
                formData:   {
                    name: '',
                    role: '',
                    photo_url: '',
                    mobile_no: '',
                    password: '',
                },
                imageFile: null,
                imageUrl: null,
                message: ''
            }
        },
        methods:    {

            registerUser: async function()   {
              const photo_url=await this.uploadPhoto()
              if(photo_url) {  
                this.formData.photo_url=photo_url
                const { status, body }=await this.postRequest(`${this.subUrl.register}`, this.formData)
                this.message=body['message']
                if(status===201)    {

                    this.formData={
                        mobile_no: '',
                        password: '',
                        name: '',
                        role: '',
                        photo_url: ''
                    }
                    this.imageFile=null
                    this.imageUrl=null
                }   else if(!this.message)    {
                    this.message='Failed to connect'
                }
                this.$refs.alertdialog.showDialog()   
            }
            },
            async uploadPhoto() {
              const formData1=new FormData()
              formData1.append('file', this.imageFile)
              const { status, body }=await this.multipartRequest(`${this.subUrl.upload}?file_type=users`, formData1)
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
            onFileChanged: async function(e)   {
                this.imageFile=e.target.files[0]
                if(this.imageFile)  {
                    this.imageUrl=URL.createObjectURL(this.imageFile)
                    console.log('imageFile: ',this.imageFile)
                }
            },
            navigate: async function()  {
                this.$router.back()
            }    
            
        }
    }         
</script>           
            
<style scoped>            
    .custom_back_button    {
       border: 1px solid #000;
    }
    .profile_photo_background   {
        position: relative;
        text-align: center;
    }
    .browse    {
        position: absolute;
        /* left: 41.5%; */
        bottom: 5%;
        font-size: 14px;    
        color: #fff;    
    }
     @media only screen and (max-width: 265px) {
  .browse_margin  {
    left: 40%;
  } 
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .browse_margin  {
    left: 40%;
  } 
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .browse_margin  {
    left: 41%;
  } 
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .browse_margin  {
    left: 43%;
  } 
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
 .browse_margin  {
    left: 43%;
  } 
}
@media only screen and (max-width: 580px) and (min-width : 480px) {
  .browse_margin  {
    left: 45%;
  } 
}

@media only screen and (max-width: 630px) and (min-width : 580px) {
   .browse_margin  {
    left: 43%;
  } 
}
  @media only screen and (min-width : 630px) {
   .browse_margin  {
    left: 43%;
  } 
}  
    :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
    .register_background   {
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
        height: 100%;
    }
  
    .form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: 50px;
 
  border-radius: 2rem;
}


.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  display: block;
  width: 100%;
  margin-bottom: 0;
  padding: 3% 0% 0% 5%;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
   padding-left: 5%;
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
   padding-left: 5%;
  font-size: 12px;
  color: #777;
}
.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}
            
            
            
</style>
