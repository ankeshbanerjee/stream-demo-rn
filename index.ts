if (__DEV__) {
  require("./ReactotronConfig");
}

import { registerRootComponent } from "expo";

import App from "./App";
import { setPushConfig } from "./src/utils/setPushConfig";
import { setFirebaseListeners } from "./src/utils/setFirebaseListeners";

setPushConfig(); // Set push config
setFirebaseListeners(); // Set the firebase listeners

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
