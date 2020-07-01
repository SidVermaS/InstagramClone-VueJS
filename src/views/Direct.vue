<template>
    <div class="custom_background custom_direct_background">
        <b-card no-body>
            <b-row style="height: 10vh;"></b-row>
        </b-card>
    </div>
</template>

<script> 
    import Vuex from 'vuex'
  import { mapGetters, mapActions } from 'vuex'
  import Connect from '../mixins/connect'
export default {
    name: 'Direct',
    mixins: [Connect],
    data()  {
        return  {
            connection: null,
            message_text: '',
            messages: [],
            user: null 
        }
    },
    methods:    {   
        connectToChat() {
            console.log("Starting connection to WebSocket Server")
            this.connection=new WebSocket(this.baseUrlWs)

            this.connection.onmessage=function(event)   {
                console.log('onmessage: ',event);
                this.messages.push(event)
            }

            this.connection.onopen=function(event)  {
                console.log('onopen: ',event)
                console.log("Successfully connected to the echo websocket server...")   
                this.user={ user_id: this.$store.state.user.user_id, name: this.$store.state.user.name, photo_url: this.$store.state.user.photo_url }
            }
            this.connection.onclose=function(event) {
                console.log('onopen: ',event)
            }
            this.connection.onerror=function(event) {
                console.log('onerror: ',event)
            }
        },  
        sendMessage()   {
            if(this.connection)  {
                
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