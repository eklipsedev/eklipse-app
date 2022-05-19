import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

const Home = () => import("../pages/marketing/Home.vue");
const Projects = () => import("../pages/marketing/Projects.vue");
const Project = () => import("../pages/marketing/Project.vue");
const Services = () => import("../pages/marketing/Services.vue");
const Contact = () => import("../pages/marketing/Contact.vue");
const PrivacyCookies = () => import("../pages/marketing/PrivacyCookies.vue");

const Login = () => import("../pages/app/auth/Login.vue");
const ResetPassword = () => import("../pages/app/auth/ForgotPassword.vue");
const NewPassword = () => import("../pages/app/auth/NewPassword.vue");

const Dashboard = () => import("../pages/app/portal/Dashboard.vue");
const TimeTracker = () => import("../pages/app/portal/TimeTracker.vue");
const Changelog = () => import("../pages/app/portal/Changelog.vue");
const Documents = () => import("../pages/app/portal/Documents.vue");
const Details = () => import("../pages/app/portal/account/Details.vue");
const Users = () => import("../pages/app/portal/account/Users.vue");
const Billing = () => import("../pages/app/portal/account/Billing.vue");
const Support = () => import("../pages/app/portal/account/Support.vue");

const NotFound = () => import("../pages/NotFound.vue");

// additional UI elements needed on a macro level
import BaseNav from "../components/layouts/BaseNav.vue";
import MarketingFooter from "../components/layouts/sections/FooterSection.vue";
import AppFooter from "../components/layouts/sections/AppFooterSection.vue";

const titleEnding = "| eklipse Development";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      components: { default: Home, nav: BaseNav, footer: MarketingFooter },
      props: true,
      meta: { requiresAuth: false, title: `Home ${titleEnding}` },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresAuth: false, title: `Login ${titleEnding}` },
    },
    {
      path: "/reset-password",
      name: "reset password",
      component: ResetPassword,
      meta: {
        requiresAuth: false,
        title: `Reset Password ${titleEnding}`,
      },
    },
    {
      path: "/new-password",
      name: "new password",
      component: NewPassword,
      meta: {
        requiresAuth: false,
        title: `New Password ${titleEnding}`,
      },
    },
    {
      path: "/projects",
      name: "projects",
      components: { default: Projects, nav: BaseNav, footer: MarketingFooter },
      props: true,
      meta: { requiresAuth: false, title: `Projects ${titleEnding}` },
    },
    {
      path: "/projects/:projectId",
      name: "project",
      components: { default: Project, nav: BaseNav, footer: MarketingFooter },
      meta: (route) => ({
        requiresAuth: false,
        title: `${route.params.projectId} ${titleEnding}`,
      }),
    },
    {
      path: "/services",
      name: "services",
      components: { default: Services, nav: BaseNav, footer: MarketingFooter },
      meta: () => ({
        requiresAuth: false,
        title: `Services ${titleEnding}`,
      }),
    },
    {
      path: "/contact",
      name: "contact",
      components: { default: Contact, nav: BaseNav, footer: MarketingFooter },
      meta: { requiresAuth: false, title: `Contact ${titleEnding}` },
    },
    {
      path: "/privacy-cookies",
      name: "privacy & cookies",
      components: {
        default: PrivacyCookies,
        nav: BaseNav,
        footer: MarketingFooter,
      },
      meta: {
        requiresAuth: false,
        title: `Privacy & Cookies ${titleEnding}`,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: { default: Dashboard, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Dashboard ${titleEnding}` },
    },
    {
      path: "/time-tracker",
      name: "Time Tracker",
      components: { default: TimeTracker, nav: BaseNav, footer: AppFooter },
      meta: {
        requiresAuth: false,
        title: `Time Tracker ${titleEnding}`,
      },
    },
    {
      path: "/changelog",
      name: "Changelog",
      components: { default: Changelog, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Changelog ${titleEnding}` },
    },
    {
      path: "/documents",
      name: "Documents",
      components: { default: Documents, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Documents ${titleEnding}` },
    },
    {
      path: "/account/:userId/details",
      name: "Account Details",
      components: { default: Details, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Account Details ${titleEnding}` },
    },
    {
      path: "/account/:companyId/billing-invoicing",
      name: "Account Billing Invoicing",
      components: { default: Billing, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Account Details ${titleEnding}` },
    },
    {
      path: "/account/:companyId/support",
      name: "Support",
      components: { default: Support, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Support ${titleEnding}` },
    },
    {
      path: "/account/:companyId/users",
      name: "Account Users",
      components: { default: Users, nav: BaseNav, footer: AppFooter },
      meta: { requiresAuth: false, title: `Users ${titleEnding}` },
    },
    {
      path: "/:notFound(.*)",
      name: "Not Found",
      component: NotFound,
      meta: { requiresAuth: false, title: "404 Page Not Found" },
    },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, _, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
