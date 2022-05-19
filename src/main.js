import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

const app = createApp(App).use(router);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSparkles } from "@fortawesome/pro-duotone-svg-icons";
import { faTools } from "@fortawesome/pro-duotone-svg-icons";
import { faLayerPlus } from "@fortawesome/pro-duotone-svg-icons";
import { faSirenOn } from "@fortawesome/pro-duotone-svg-icons";
import { faFileUpload } from "@fortawesome/pro-duotone-svg-icons";
import { faTicket } from "@fortawesome/pro-duotone-svg-icons";
import { faTasks } from "@fortawesome/pro-duotone-svg-icons";
import { faStopwatch } from "@fortawesome/pro-duotone-svg-icons";
import { faFolderTree } from "@fortawesome/pro-duotone-svg-icons";
import { faCreditCard } from "@fortawesome/pro-duotone-svg-icons";
import { faArchive } from "@fortawesome/pro-duotone-svg-icons";
import { faEdit } from "@fortawesome/pro-duotone-svg-icons";
import { faExternalLink } from "@fortawesome/pro-duotone-svg-icons";
import { faUniversity } from "@fortawesome/pro-duotone-svg-icons";
import { faImage } from "@fortawesome/pro-duotone-svg-icons";
import { faFilePdf } from "@fortawesome/pro-duotone-svg-icons";
import { faUserCircle } from "@fortawesome/pro-duotone-svg-icons";
import { faFileWord } from "@fortawesome/pro-duotone-svg-icons";
import { faFileExcel } from "@fortawesome/pro-duotone-svg-icons";
import { faBellOn } from "@fortawesome/pro-duotone-svg-icons";
import { faCodeBranch } from "@fortawesome/pro-duotone-svg-icons";
import { faClone } from "@fortawesome/pro-duotone-svg-icons";
import { faBringFront } from "@fortawesome/pro-duotone-svg-icons";
import { faClipboardListCheck } from "@fortawesome/pro-duotone-svg-icons";
import { faSwatchbook } from "@fortawesome/pro-duotone-svg-icons";
import { faExchange } from "@fortawesome/pro-duotone-svg-icons";
import { faCode } from "@fortawesome/pro-duotone-svg-icons";
import { faUsbDrive } from "@fortawesome/pro-duotone-svg-icons";
import { faCogs } from "@fortawesome/pro-duotone-svg-icons";
import { faBrowser } from "@fortawesome/pro-duotone-svg-icons";
import { faSitemap } from "@fortawesome/pro-duotone-svg-icons";
import { faFolderOpen } from "@fortawesome/pro-duotone-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import BaseNav from "./components/layouts/BaseNav.vue";
import MainContainer from "./components/layouts/containers/MainContainer.vue";
import HeroSecondary from "./components/layouts/HeroSecondary.vue";
import BaseSection from "./components/layouts/containers/BaseSection.vue";
import BaseContainer from "./components/layouts/containers/BaseContainer.vue";
import BaseCard from "./components/layouts/containers/CardContainer.vue";
import BaseButton from "./components/UI/elements/BaseButton.vue";
import BaseForm from "./components/UI/elements/BaseForm.vue";
import BaseInput from "./components/UI/elements/BaseInput.vue";
import BaseCheckbox from "./components/UI/elements/BaseCheckbox.vue";
import BaseSelect from "./components/UI/elements/BaseSelect.vue";
import BaseTextArea from "./components/UI/elements/BaseTextArea.vue";
import BaseFormError from "./components/UI/elements/BaseFormError.vue";
import BaseSpinner from "./components/UI/elements/BaseSpinner.vue";
import BaseDropdown from "./components/UI/elements/BaseDropdown.vue";
import BasePill from "./components/UI/elements/BasePill.vue";
import BaseBackdrop from "./components/UI/elements/BaseBackdrop.vue";
import BaseModal from "./components/UI/elements/BaseModal.vue";
import BaseLogo from "./components/UI/elements/BaseLogo.vue";
import BaseList from "./components/UI/lists/BaseList.vue";
import BaseHeading from "./components/UI/elements/BaseHeading.vue";
import ListHeader from "./components/UI/lists/ListHeader.vue";
import ListRow from "./components/UI/lists/ListRow.vue";
import ListCell from "./components/UI/lists/ListCell.vue";
import ListActions from "./components/UI/lists/ListActions.vue";
import ListTransition from "./components/UI/lists/ListTransition.vue";
import BaseEmptyState from "./components/UI/elements/BaseEmptyState.vue";
import BaseSnackbar from "./components/UI/elements/BaseSnackbar.vue";
import BaseUploader from "./components/UI/elements/BaseUploader.vue";
import AppFooter from "./components/layouts/sections/AppFooterSection.vue";
import Footer from "./components/layouts/sections/FooterSection.vue";
import SideNav from "./components/UI/elements/SideNav.vue";
import CtaSection from "./components/layouts/sections/CTASection.vue";
import HeadingToMove from "./components/UI/elements/HeadingToMove.vue";

library.add(
  faSparkles,
  faTools,
  faLayerPlus,
  faSirenOn,
  faFileUpload,
  faTicket,
  faTasks,
  faStopwatch,
  faFolderTree,
  faCreditCard,
  faArchive,
  faTimes,
  faEdit,
  faExternalLink,
  faUniversity,
  faTrash,
  faEllipsisH,
  faImage,
  faFileWord,
  faFileExcel,
  faBellOn,
  faFilePdf,
  faUserCircle,
  faArrowsAltV,
  faCodeBranch,
  faClone,
  faBringFront,
  faClipboardListCheck,
  faSwatchbook,
  faExchange,
  faCode,
  faUsbDrive,
  faCogs,
  faBrowser,
  faSitemap,
  faFolderOpen
);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("main-container", MainContainer);
app.component("base-nav", BaseNav);
app.component("hero-secondary", HeroSecondary);
app.component("base-section", BaseSection);
app.component("base-container", BaseContainer);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-form", BaseForm);
app.component("base-spinner", BaseSpinner);
app.component("base-input", BaseInput);
app.component("base-checkbox", BaseCheckbox);
app.component("base-select", BaseSelect);
app.component("base-text-area", BaseTextArea);
app.component("base-form-error", BaseFormError);
app.component("base-dropdown", BaseDropdown);
app.component("base-pill", BasePill);
app.component("base-backdrop", BaseBackdrop);
app.component("base-modal", BaseModal);
app.component("base-logo", BaseLogo);
app.component("base-list", BaseList);
app.component("base-heading", BaseHeading);
app.component("list-header", ListHeader);
app.component("list-row", ListRow);
app.component("list-cell", ListCell);
app.component("list-actions", ListActions);
app.component("base-empty-state", BaseEmptyState);
app.component("base-snackbar", BaseSnackbar);
app.component("base-uploader", BaseUploader);
app.component("app-footer", AppFooter);
app.component("base-footer", Footer);
app.component("side-nav", SideNav);
app.component("list-transition", ListTransition);
app.component("cta-section", CtaSection);
app.component("heading-to-move", HeadingToMove);

app.use(router);
app.use(store);

app.mount("#app");
