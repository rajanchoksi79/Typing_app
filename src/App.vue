<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const dark_theme = ref(true);
const router = useRouter()

function theme_change() {
  const html = document.documentElement;
  if (dark_theme.value) {
    html.classList.add("light");
  }
  else {
    html.classList.remove("light");
  }
  dark_theme.value = !dark_theme.value;
}

function home_page() {
  router.push("/");
}

function about_page() {
  router.push("/about");
}

function privacy_page() {
  router.push("/privacy");
}


</script>


<template>
  <div id="container">
    <header id="homepage_header">
      <h1>Typing Practice</h1>
      <div id="header_button_div">
        <button v-on:click="home_page()">Home</button>
        <button v-on:click="theme_change()">Theme</button>
        <button v-on:click="privacy_page()">Privacy Policy</button>
        <button v-on:click="about_page()">About</button>
      </div>
    </header>
    <main id="main_area">
      <router-view></router-view>
    </main>
    <footer id="homepage_footer">
      <p>&copy; 2024 Rajan Choksi All Right Reserved.</p>
    </footer>
  </div>
</template>


<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  display: grid;
  background-color: var(--background_color_one);
  grid-template-rows: 1fr 8fr 0.5fr;
}

/* styling for header area */

#homepage_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background-color: var(--font_color_three);
  box-shadow: 1px 1px 10px var(--font_color_one);
  animation-name: appearance;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
}

#homepage_header:hover {
  box-shadow: 2px 2px 20px var(--font_color_one);
  background-color: var(--font_color_three);
}

#homepage_header h1 {
  color: var(--font_color_one);
  animation-name: color_change;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
}

#homepage_header h1:hover {
  text-shadow: 1px 1px 5px var(--font_color_one);
  font-style: italic;
}

#header_button_div button {
  padding: 5px 10px;
  margin: 0px 5px;
  border-radius: 10px;
  background-color: var(--font_color_three);
  color: var(--font_color_one);
  border: 1px solid var(--font_color_three);
  font-weight: 700;
  font-size: 18px;
  animation-name: color_change;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
}

#header_button_div button:hover {
  background-color: var(--font_color_one);
  color: var(--background_color_one);
  box-shadow: 2px 2px 10px var(--font_color_one);
  border: 1px solid var(--font_color_one);
  font-style: italic;
}

/* styling for footer area */

#homepage_footer {
  box-shadow: 1px 1px 10px var(--font_color_one);
  background-color: var(--font_color_three);
  padding: 10px;
  animation-name: appearance;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
}

#homepage_footer:hover {
  box-shadow: 2px 2px 20px var(--font_color_one);
  background-color: var(--font_color_three);
}

#homepage_footer p {
  text-align: center;
  color: var(--font_color_one);
  animation-name: color_change;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
}

#homepage_footer p:hover {
  text-shadow: 1px 1px 5px var(--font_color_one);
  font-style: italic;
}
</style>