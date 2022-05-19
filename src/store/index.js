import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import usersModule from "./modules/users/index.js";
import changelogsModule from "./modules/changelogs/index.js";
import companyModule from "./modules/company/index.js";
import documentsModule from "./modules/documents/index.js";
import quickbooksModule from "./modules/quickbooks/index.js";
import timesModule from "./modules/times/index.js";
import microProjectsModule from "./modules/micro-projects/index.js";
import utilsModule from "./modules/utils/index.js";
import servicesModule from "./modules/services/index.js";
import projectsModule from "./modules/projects/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    users: usersModule,
    changelogs: changelogsModule,
    company: companyModule,
    documents: documentsModule,
    quickbooks: quickbooksModule,
    times: timesModule,
    microProjects: microProjectsModule,
    utils: utilsModule,
    services: servicesModule,
    projects: projectsModule,
  },
});

export default store;
