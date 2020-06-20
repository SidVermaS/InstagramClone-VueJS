<template>
  <div id="app">
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
  background: #FAFAFA;
}
.custom_post1  {
  width: 50%;
  height: 50%;
}
.custom_user_background {
  background: #fff;
  padding: 0% 2% 2% 0%;
  text-align: left;
}
.custom_image {
  width: 100%;
  height: 100%;
}
.custom_user_photo  {
  width: 8%;
  height: 12%;
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
  padding: 2% 2% 2% 2%;
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
</style>
