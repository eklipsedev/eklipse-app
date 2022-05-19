<template>
  <base-section>
    <base-container class="container--vertical"
      ><div role="list" class="grid">
        <div
          v-for="project in projectArray"
          :key="project.id"
          role="listitem"
          class="project--item"
        >
          <a :href="`/projects/${project.id}`" class="project--link"
            ><div class="card--overlay">
              <h2 class="heading-24">{{ project.projectName }}</h2>
              <p>{{ project.projectDescription }}</p>
            </div>
            <img
              loading="lazy"
              :src="project.projectThumbnail[0].url"
              alt="OnBord"
              sizes="(max-width: 479px) 40vw, (max-width: 767px) 49vw, 52vw"
              :srcset="
                `${project.projectThumbnail[0].url} 500w,
                ${project.projectThumbnail[0].url} 800w,
                ${project.projectThumbnail[0].url} 1080w,
                ${project.projectThumbnail[0].url} 1600w,
                ${project.projectThumbnail[0].url} 2000w,
                ${project.projectThumbnail[0].url} 2600w,
                ${project.projectThumbnail[0].url} 3200w,
                ${project.projectThumbnail[0].url} 3300w`
              "
              class="project-img"
          /></a>
        </div></div
    ></base-container>
  </base-section>
</template>

<script>
import { app } from "../../../../db.js";

export default {
  data() {
    return {
      projectArray: [],
    };
  },
  created() {
    app.content
      .get({
        schemaKey: "projects",
        populate: ["projectThumbnail"],
      })
      .then((projects) => {
        const projectObjects = Object.values(projects);
        this.projectArray = projectObjects;
      })
      .catch((error) => console.log(error)); // handle any errors
  },
};
</script>

<style scoped>
.project--link {
  position: relative;
  display: flex;
  overflow: hidden;
  width: auto;
  height: 400px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: var(--input-bg-color);
}
.card--overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--color), 0.8);
  opacity: 0;
  transition: opacity var(--global-transition);
  color: var(--color-white);
  text-align: center;
}
.card--overlay:hover {
  opacity: 1;
}
.heading-24 {
  font-size: 40px;
  line-height: 50px;
}
.project-img {
  width: 150%;
  height: 150%;
  max-width: none;
  transition: opacity var(--global-transition);
  object-fit: contain;
}
</style>
