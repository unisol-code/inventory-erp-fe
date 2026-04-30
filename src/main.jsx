import { createRoot } from 'react-dom/client'
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer />
    <App />
  </RecoilRoot>
)
