import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export function initFontAwesome() {
  library.add(faArrowsAltH);
  Vue.component("font-awesome-icon", FontAwesomeIcon);
}
