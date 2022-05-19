<template>
  <nav class="nav" :class="getIsMenuOpen ? 'open' : null" ref="nav">
    <div class="nav--bar">
      <router-link
        :to="!isLoggedIn ? '/' : '/dashboard'"
        aria-current="page"
        class="nav--logo"
      >
        <base-logo></base-logo>
      </router-link>
      <ul role="list" class="nav--list">
        <li v-if="!isLoggedIn" class="nav--list-item">
          <base-button link to="/projects" class="button--nav">
            <div>Projects</div>
          </base-button>
        </li>
        <li v-if="!isLoggedIn" class="nav--list-item">
          <base-button link to="/services" class="button--nav">
                <div>Services</div>
              </base-button>
        </li>
        <li v-if="!isLoggedIn" class="nav--list-item">
          <base-button link to="/contact" class="button--nav">
            <div>Contact</div>
          </base-button>
        </li>
        <li v-if="!isLoggedIn" class="nav--list-item">
          <base-button link to="/login" class="button--nav">
            <div>Login</div>
          </base-button>
        </li>
        <li v-if="isLoggedIn" class="nav--list-item">
          <base-dropdown>
            <template #toggle>
              <base-button to="/contact" class="button--nav">
                <div>Menu</div>
              </base-button>
            </template>
            <template #nav>
              <base-list>
                <li v-for="(menuItem, index) in menuItems" :key="index">
                  <base-button
                    :to="
                      `/${menuItem
                        .toLowerCase()
                        .replace(/ /g, '-')
                        .replace(/[^\w-]+/g, '')
                        .replace('--', '-')}`
                    "
                    link
                    class="button--nav-secondary"
                    >{{ menuItem }}</base-button
                  >
                </li>
              </base-list>
            </template>
          </base-dropdown>
        </li>
        <li v-if="isLoggedIn" class="nav--list-item">
          <base-dropdown>
            <template #toggle>
              <base-button to="/contact" class="button--nav">
                <div>
                  <font-awesome-icon
                    :icon="['fad', 'user-circle']"
                    class="fa-lg mr-5"
                  ></font-awesome-icon>
                  <!-- <img
                    src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60f321cc81d3a5b692c4eaf0_user%20(9).svg"
                    width="20"
                    height="20"
                    alt="profile picture"
                  /> -->
                  Account
                </div>
              </base-button>
            </template>
            <template #nav>
              <base-list
                ><li>
                  <base-button
                    link
                    :to="`/account/${user.id}/details`"
                    class="button--nav-secondary"
                    >Details</base-button
                  >
                </li>
                <li>
                  <base-button
                    link
                    :to="`/account/${user.id}/users`"
                    class="button--nav-secondary"
                    >Users</base-button
                  >
                </li>
                <li>
                  <base-button
                    link
                    :to="`/account/${user.id}/support`"
                    class="button--nav-secondary"
                    >Support</base-button
                  >
                </li>
              </base-list>
            </template>
          </base-dropdown>
        </li>
        <li v-if="isLoggedIn" class="nav--list-item">
          <base-button @click="logout" to="/logout" class="button--nav">
            <div>Logout</div>
          </base-button>
        </li>
      </ul>
      <menu-button></menu-button>
      <side-nav></side-nav>
    </div>
  </nav>
</template>

<script>
import MenuButton from "../UI/elements/MenuButton.vue";
import SideNav from "../../components/UI/elements/SideNav.vue";

export default {
  components: {
    MenuButton,
    SideNav,
  },
  data() {
    return {
      menuItems: {
        item3: "Time Tracker",
        item4: "Changelog",
        item6: "Documents",
      },
    };
  },
  created() {
    window.addEventListener("scroll", this.navScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.navScroll);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.getUser;
    },
    getIsMenuOpen() {
      return this.$store.getters.isMenuOpen;
    },
    getRootServices() {
      return this.$store.getters.getRootServices;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
    navScroll() {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        document.querySelector(".nav").classList.add("scrolled");
      } else {
        document.querySelector(".nav").classList.remove("scrolled");
      }
    },
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  z-index: 2000;
  width: 100vw;
  transform: translateX(0px);
  transition: var(--global-transition);
  background-color: rgba(255, 255, 255, 0);
}
.nav.scrolled {
  box-shadow: 5px 10px 18px #999999;
  background-color: var(--color-white);
}
.nav.open {
  transform: translateX(-400px);
}
.nav--bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 90vw;
  margin: 0 auto;
}
.nav--logo {
  display: flex;
  max-width: 80px;
  justify-content: center;
  align-items: center;
}
.nav--list {
  display: flex;
}
@media only screen and (max-width: 768px) {
  .nav--list {
    display: none;
  }
}
.profile-pic-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--input-bg-color);
}
.profile-pic-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mr-5 {
  margin-right: 0.5rem;
}
@media only screen and (max-width: 991px) {
  .nav--bar {
    height: 60px;
  }
  .nav--logo {
    max-width: 60px;
  }
}
</style>
