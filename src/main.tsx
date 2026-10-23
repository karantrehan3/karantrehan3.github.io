import ReactDOM from "react-dom/client";

import App from "@/App";
import { initialiseBuildInfo } from "@/utils/BuildInfo";

initialiseBuildInfo();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
