<template>
    <div class="custom_background custom_direct_background">
        <b-card no-body>
            <b-row style="height: 75vh;" >
                <span v-if="messages.length">
                  <Messages :messages="messages" :user_id="user.user_id" />
                </span>
                <span v-else class="mx-auto my-auto">
                    <b-img :src="require('../assets/images/direct_message.png')" class="rounded-circle border border-dark rotate-90 custom_direct_message"  /> 
                    <span class="d-block mt-4 h5">Your Messages</span>
                    <span class="custom_faded_color" style="font-size: 15px;">Start sending messages in the group.</span>
                </span>
            </b-row>
            <b-row style="height: 10vh;">
              <b-input-group>
                <b-form-textarea rows="1" max-rows="4" placeholder="Message..." sm v-model="message_text" class="custom_textarea_comment"></b-form-textarea>
                <b-input-group-append>
                  <span v-on:click="sendMessage" class="custom_textarea_comment_button custom_secondary_color">Send</span>
                </b-input-group-append>
              </b-input-group>
            </b-row>
        </b-card>
    </div>
</template>

<script> 
  import Vuex from 'vuex'
  import { mapGetters, mapActions } from 'vuex'

  import Messages from '../components/Messages.vue'

  import Connect from '../mixins/connect'

export default {
    name: 'Direct',
    mixins: [Connect],
    components: {
      Messages,
    },
    data()  {
        return  {
            messages: [],
            connection: null,
            message_text: '',            
            user: null 
        }
    },
    methods:    {   
        connectToChat() {
            const externalContext=this
            // this.user={  user_id: 50, name: this.getUser().name, photo_url: this.getUser().photo_url  }
                
       this.user={  user_id: this.getUser().user_id, name: this.getUser().name, photo_url: this.getUser().photo_url  }

            console.log("Starting connection to WebSocket Server")
            this.connection=new WebSocket(this.baseUrlWs)            

            this.connection.onopen=function(event)  {
                console.log('onopen: ',event)
                console.log("Successfully connected to the echo websocket server...")   
            }
            
            this.connection.onmessage=function(event)   {
                console.log('onmessage: ',event.data)
                externalContext.messages.push(JSON.parse(event.data))
            }
            this.connection.onclose=function(event) {
              console.log('onopen: ',event)
            }
            this.connection.onerror=function(event) {
              console.log('onerror: ',event)
            }
        },  
        sendMessage()   {
          if(this.connection && this.message_text!=='')  {
            const message=JSON.stringify({user: this.user, message_text: this.message_text})
            this.connection.send(message)
            this.message_text=''
          }
        },   
        ...mapGetters([
            'getUser'
        ]),
        ...mapActions([
            "setCurrentPage"
        ])  
    },
    created()    {
        this.setCurrentPage('direct_active')
        this.connectToChat()
    }
}
</script>

<style scoped>
    .custom_direct_message  {
        width: 100px;
        height: 100px;
        padding: 12px;
        float: center;
        border-width: thick;
    }
    #custom_user_name {
        font-weight: bold;
        font-size: 79.5%;     
        /* margin: 10% 0% -0% 0%; */
        padding: 0% 0% -10% 0%;
    }
    #custom_user_role    {
        font-size: 79.5%;
    }
    .custom_suggestion  {
      font-weight: 550;
      font-size: 95%;
      text-align: left;
    }
     .custom_textarea_comment, .custom_textarea_comment:focus  {
        padding-bottom: 0%;    
        border: none;
        overflow: auto;
        outline: none;
        background-color: transparent;
        border-style: none;

        -webkit-appearance:none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

       resize: none;

    }
      .custom_textarea_comment_button  {
       font-size: 80%;
       font-weight: 700;       
       text-align: center;
       padding: 50% 0% 0% 0%;
    }
   
@media only screen and (max-width: 265px) {
  .custom_direct_background  {
      padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
 .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 26%;
        font-size: 75.5%;
         margin-right: 20%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 300px) and (min-width : 265px) {
  .custom_direct_background  {
        padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 26%;
        font-size: 75.5%;
         margin-right: 20%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 350px) and (min-width : 300px) {
  .custom_direct_background  {
        padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 23.5%;
        font-size: 75.5%;
         margin-right: 15%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 445px) and (min-width : 350px) {
  .custom_direct_background  {
        padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 20.5%;
        font-size: 75.5%;
         margin-right: 15%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
     /* Custom, iPhone Retina */ 
@media only screen and (max-width: 480px) and (min-width : 445px) {
  .custom_direct_background  {
        padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 18.5%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
       margin-bottom: 3%;
    }
}
@media only screen and (max-width: 630px) and (min-width : 480px) {
  .custom_direct_background  {
        padding: 0% 0% 0% 0%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: none;
    }
    .suggested_sm {
      display: block;
      margin-bottom: 3.0%;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 700px) and (min-width : 630px) {
 .custom_direct_background  {
        padding: 0% 7% 0% 7%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Extra Small Devices, Phones */ 
@media only screen and (max-width: 768px) and (min-width : 700px) {
  .custom_direct_background  {
        padding: 0% 7% 0% 7%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
          height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 992px) and (min-width : 768px) {
  .custom_direct_background  {
        padding: 1% 8.5% 1% 8.5%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
         margin-right: 10%;
    }    
    .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 1200px) and (min-width : 992px) {
  .custom_direct_background  {
        padding: 1% 17.5% 1% 17.5%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 75.5%;
        margin-right: 10%;
    }
        .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .custom_direct_background  {
        padding: 1% 22.5% 1% 22.5%; 
        overflow-y: hidden;
    }
  .custom_b-card  {
    margin: 0% 20% 0% 20%;
  }
   .custom_explore_view    {
        height: 55%;
        width: 15%;
        font-size: 85.5%;
        margin-right: 10%;
    }
    .suggested_lg {
      display: block;
    }
    .suggested_sm {
      display: none;
    }
}

</style>