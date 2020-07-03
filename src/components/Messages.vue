<template>
    <div class="custom_messages_background">
        <span v-for="(message, index) in messages" :key="index" class="mt-2"> 
            <!-- <b-row>  -->
            <span v-if="message.user.user_id===user_id">
                <!-- <span class=""> -->
                    <span class="custom_self_message">
                            <div>{{message.message_text}}</div>
                    <!-- </span> -->
                </span>
            </span>
            <span v-else>
                <!-- <span class=""> -->
                    <span v-if="messages[index===0?0:(index-1)].user.user_id===message.user.user_id" class="">{{message.user.name}}</span>
                    <span>
                        <b-avatar v-if="messages[index===(messages.length)?index:(index+1)].user.user_id===message.user.user_id" :src="message.user.photo_url" size="1.4rem"></b-avatar>
                        <span class="custom_other_message ">
                                <div>{{message.message_text}}</div>
                        </span>
                    </span>
                <!-- </span> -->
            </span>
            <!-- </b-row>      -->
        </span>
    </div>
</template>
<script>
    import Vuex from 'vuex'
    export default {
        name: 'Messages',
        props: ['messages', 'user_id'],
        methods:    {
           
        }
    }
</script>
<style scoped>
    .custom_self_message    {
        background: #f5f5f5;
        border: 1px solid #f5f5f5;
        padding: 10px;
        border-radius: 25px;
        /* text-align: left; */
        width: 50%;
        /* overflow: hidden; */
    }
    .custom_other_message   {
        border: 1px solid #f5f5f5;
        padding: 10px;
        border-radius: 25px;
        /* text-align: left; */
        width: 50%;
        /* overflow: hidden; */
    }
    .custom_messages_background {
        font-size: 14px;
        padding: 0% 5% 0% 5%;
        /* overflow-y: scroll; */
    }
</style>