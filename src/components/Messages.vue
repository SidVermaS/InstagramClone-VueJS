<template>
    <div class="custom_messages_background">
        <div v-for="(message, index) in messages" :key="index" class="mt-3"> 
            <span v-if="message.user.user_id===user_id" class="text-right d-block">
                <span class="custom_self_message">{{message.message_text}}</span>
            </span>
            <span v-else class="text-left d-block">
                        <span v-if="index===0 || messages[(index-1)].user.user_id!==message.user.user_id" style="font-size: 12px;" class="d-block mb-2 ml-4 custom_faded_color">{{message.user.name}}</span>

                        <b-avatar v-if="index===(messages.length-1) || messages[(index+1)].user.user_id!==message.user.user_id" :src="`${baseUrlUserPhoto}${message.user.photo_url}`" size="1.4rem"></b-avatar>
                        <span v-else class="custom_other_message_margin"  />
                        <span style="width: 1.4rem; height: 1.4rem;"></span>  
                        <span class="custom_other_message">{{message.message_text}}</span>
            </span>
        </div>   
    </div>
</template>
<script>
    import Vuex from 'vuex'
     import Connect from '../mixins/connect'
    export default {
        name: 'Messages',
        props: ['messages', 'user_id'],
        mixins: [Connect],
        methods:    {
           
        }
    }
</script>
<style scoped>
    .custom_self_message    {
        background: #f5f5f5;        
        border: 1px solid #f5f5f5;
        border-radius: 10%;
        padding: 5px;
        /* text-align: left; */
        /* width: 50%; */
        /* overflow: hidden; */
    }
    .custom_other_message   {
        border: 1px solid #f5f5f5;
        border-radius: 10%;
        padding: 5px;
        /* text-align: left; */
        /* width: 50%; */
        /* overflow: hidden; */
    }
    .custom_messages_background {
        font-size: 14px;
        padding: 0% 3.5% 0% 3.5%;
        /* width: 100%;
        height: 100%; */
        /* overflow-y: scroll; */
    }
    .custom_other_message_margin    {
        margin-left: 1.4rem;
    }
    ul  {
        list-style-type: none;
    }
</style>