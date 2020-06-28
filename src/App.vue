<template>
  <div id="app">
     <b-navbar type="light" variant="info" fixed="top">
      <b-navbar-brand tag="h1" class="mb-0">BootstrapVue</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#custom_group    {
    text-align: left;
}

.custom_card  {
  padding-top: 5%;
  height: 100vh;
}
.custom_button  {
  margin-top: 10%;
}

.custom_background  {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0%;
  margin: 0%;
  overflow-x: hidden;
  overflow-y: hidden;
}
.custom_user_background {
  background: #fff;
  padding: 2% 0% 2% 2%;
  text-align: left;
}
.custom_image {
  width: 100%;
  height: 100%;
}
.custom_user_photo  {
  width: 30px;
  height: 30px;
}
.custom_user_name {
  font-weight: bold;
  font-size: 85%;
  margin-left: 2.5%;
}
.custom_caption_user_name {
  font-weight: bold;
  font-size: 85%;
  margin: 0% 1% 0% 0%;
}
.custom_post_caption  {
  background: #fff;
  text-align: left;
  padding: 2% 2% 0% 2%;
}
.custom_actions {
  margin-left: 1%;
}
.custom_caption_text  {
  font-size: 90%;
}
.custom_hand_thumb_down {
  margin: 0% 4.0% 0% 4.0%;
}
.custom_caption_post_reaction {
  margin-top: 2%;
}
.custom_comment_line  {
  width: 104%;
  height: 1px;
  background: lightgrey;
  margin: 0% 0% 0% -2%;
}
.custom_comments  {
  margin-bottom: 2%;
}
.custom_faded_color {
  color: #A9A9A9;
}
.custom_secondary_color {
  color: #3AACF7; 
}
.custom_font_size {
  font-weight: bold;
}
.custom_post_line   {
    width: 100%;
    height: 1px;
    background: lightgrey;       
}

</style>
