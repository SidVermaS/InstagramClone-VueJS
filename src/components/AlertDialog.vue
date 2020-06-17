<template>
    <div v-if="showAlert">
        <b-button @click="removeDialog" id="close-button">X</b-button>
        <b-alert variant="secondary" id="message-alert" show>
            <p> {{ message }} </p>
        </b-alert>
    </div>
</template>

<script>
    export default  {
        name: 'AlertDialog',
        props:  {
            message: '',
        },
        data()  {
            return  {
                dismissSeconds: 4000,
                showAlert: false
            }
        },
        methods: {
            showDialog: function()  {
                this.showAlert=true
                setTimeout(()=> {
                    this.showAlert=false
                }, this.dismissSeconds)
            },
            removeDialog()  {
                this.showAlert=false
            }
        }
    }
</script>
    
<style scoped>
    #message-alert  {
        position: relative;
        z-index: 1;
        background: #2176E3;
    }
    #close-button   {
        position: absolute;
        z-index: 3;
        right: 1.5%;
        float: right;
        outline: none;
        background: transparent;
        border: 0;
        box-shadow: none;
    }
    p   {
        color: #fff;
    }
</style>