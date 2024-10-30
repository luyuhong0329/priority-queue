import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import NiceModal from "@ebay/nice-modal-react"

createRoot(document.getElementById("root")!).render(
  <NiceModal.Provider>
    <App />
  </NiceModal.Provider>
)
