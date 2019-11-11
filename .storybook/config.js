import { configure } from "@storybook/polymer";

const req = require.context("../src", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename =>{
   
    if(filename === "./components/crds-image-title-cutout/crds-image-title-cutout.stories.js") {
      req(filename);
    }

   

  } );
}
configure(loadStories, module);
