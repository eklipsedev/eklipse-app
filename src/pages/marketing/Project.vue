<template>
  <div>
    <hero-secondary :subtext="getProject[0].projectDescription"
      ><heading-to-move
        level="1"
        :text="getProject[0].projectName"
      ></heading-to-move
    ></hero-secondary
    >
    <base-section>
      <base-container>
        <div class="grid">
          <div class="content-container">
            <h2>Background</h2>
            <div class="w-richtext">
              <p>
                OnBord is a start-up FinTech company based out of Philadelphia,
                PA. A few months prior to the release of their product, the
                <a href="/projects/onbord-app">OnBord App</a>, we were tasked
                with creating a new lead-generation website to represent it. The
                goal was to make the website fit the brand while delivering
                their message in a clear &amp; persuasive way.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://uploads-ssl.webflow.com/5bd882b916e1ea3c9a5c4fb2/6065e262640bbb58a83945a2_onbord_support_1.PNG"
              loading="lazy"
              alt=""
              sizes="90vw"
              srcset="
                https://uploads-ssl.webflow.com/5bd882b916e1ea3c9a5c4fb2/6065e262640bbb58a83945a2_onbord_support_1-p-500.png 500w,
                https://uploads-ssl.webflow.com/5bd882b916e1ea3c9a5c4fb2/6065e262640bbb58a83945a2_onbord_support_1-p-800.png 800w,
                https://uploads-ssl.webflow.com/5bd882b916e1ea3c9a5c4fb2/6065e262640bbb58a83945a2_onbord_support_1.PNG       993w
              "
              class="image"
            />
          </div></div
      ></base-container>
    </base-section>
    <cta-section></cta-section>
  </div>
</template>

<script>
export default {
  computed: {
    getProject() {
      const projectId = this.$route.params.projectId;
      const projects = this.$store.getters.getProjects;
      return projects.filter((project) => {
        if (project.id === projectId) {
          return true;
        }
      });
    },
  },
  created() {
    this.$store.dispatch("setProjects");
  }

};
</script>

<style scoped>
.grid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 5rem;
  grid-row-gap: 50px;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: auto;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.image {
  border-radius: 20px;
  box-shadow: 0 4px 12px 0 #d7d7d7;
}
</style>
