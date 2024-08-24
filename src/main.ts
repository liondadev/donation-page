import App from "./App.svelte";

// global imports
import "./assets/css/reset.css";
import "./assets/css/main.scss";
import "./assets/css/swal-dark.scss";

// Library css inmports
import "toastr/build/toastr.min.css";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
