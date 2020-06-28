<template>
    <div style="overflow: scroll;">
        <div v-for="(comment, index) in comments.slice().reverse()" :key="index">
           <b-row class="mx-3 my-3 p-0">
                            <b-col cols="2" class="m-0 p-0">
                                <b-img :src="`http://localhost:3000/uploads/users/${comment.user.photo_url}`" rounded="circle" class="custom_user_photo m-0 p-0"></b-img>
                            </b-col>
                            <b-col cols="10" class="m-0 p-0">
                                <span class="custom_full_post_user_name" style="display: inline-block;">{{comment.user.name}}</span>
                                <span class="custom_caption_text ml-1">{{comment.comment_text}}</span> 
                            </b-col>
           </b-row>
        </div>
    </div>
</template>

<script>
import Connect from '../mixins/connect'

export default {
    name: 'Comments',
    mixins: [Connect],
    props:  ['comments'],
    methods:    {

    }
}
</script>

<style scoped>

</style>