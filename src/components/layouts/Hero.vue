<template>
  <div class="hero">
    <div class="hero--bg"></div>
    <base-container class="container--hero">
      <div class="half">
        <h1 class="heading-container">
          Making the internet<heading-to-move
            level="1"
            text="simple"
          ></heading-to-move
          >.
        </h1>
        <p>
          eklipse is focused on creating high-powered online experiences for
          fast-growing businesses.
        </p>
        <div class="spacer-helper">
          <base-button link to="/contact" class="button"
            >Contact Us</base-button
          >
        </div>
      </div>
      <div class="half half--center">
        <div class="hero--shapes">
          <large-circle></large-circle>
          <large-square></large-square>
          <small-circle></small-circle>
          <small-square></small-square>
          <smallest-square></smallest-square>
        </div>
      </div>
    </base-container>
  </div>
</template>

<script>
import LargeCircle from "../UI/animations/heroAnimation/LargeCircle.vue";
import LargeSquare from "../UI/animations/heroAnimation/LargeSquare.vue";
import SmallCircle from "../UI/animations/heroAnimation/SmallCircle.vue";
import SmallSquare from "../UI/animations/heroAnimation/SmallSquare.vue";
import SmallestSquare from "../UI/animations/heroAnimation/SmallestSquare.vue";

export default {
  components: {
    LargeCircle,
    LargeSquare,
    SmallCircle,
    SmallSquare,
    SmallestSquare,
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero--bg {
  position: absolute;
  left: auto;
  top: auto;
  right: auto;
  bottom: 100px;
  z-index: -1;
  width: 300vw;
  height: 300vw;
  border-radius: 50%;
  background-image: linear-gradient(
    0deg,
    var(--secondary-color),
    var(--color-white)
  );
}
.hero--shapes {
  position: relative;
  display: flex;
  width: 10vw;
  height: 10vw;
  flex-direction: column;
  align-items: center;
}
.half {
  width: 50%;
}
.half--center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.heading-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
@media only screen and (max-width: 991px) {
  .hero {
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .half {
    width: 100%;
  }
  .half.half--center {
    height: 400px;
  }
  .hero--shapes {
    width: 30vw;
    height: 30vw;
    margin-left: -30px;
  }
}
</style>
