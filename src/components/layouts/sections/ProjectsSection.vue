<template>
  <base-section class="section--projects">
    <base-container class="container--margin-bottom">
      <div class="grid">
        <div id="main">
          <h2 class="heading-container">
            <span>Our</span><heading-to-move text="work"></heading-to-move>
          </h2>
          <p>
            Your project will not be our first. Over the years, we have
            accomplished some pretty cool things and have delivered high quality
            results to our clients.
          </p>
          <div class="spacer-helper">
            <base-button link to="/projects" class="button"
              >See projects</base-button
            >
          </div>
        </div>
      </div>
    </base-container>
    <img
      class="bg-image"
      src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/6063250a6e80d70d0e0c3665_wellfull_screens.png"
    />
  </base-section>
</template>

<style scoped>
#main {
  max-width: 55ch;
}
.bg-image {
  position: absolute;
  left: 15%;
  top: 10%;
  right: 0;
  bottom: 0;
  z-index: -1;
}
@media only screen and (max-width: 1291px) {
  .bg-image {
    top: 25%;
  }
}
@media only screen and (max-width: 1024px) {
  .bg-image {
    position: relative;
    left: 0%;
    top: 0%;
  }
}
.list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.heading-24 {
  font-size: 40px;
  line-height: 50px;
}
.heading-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.heading-container span {
  margin-right: 10px;
}
</style>
