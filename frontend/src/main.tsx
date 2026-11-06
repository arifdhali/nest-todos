
import ReactDOM from "react-dom/client";
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from "./routes";


const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);