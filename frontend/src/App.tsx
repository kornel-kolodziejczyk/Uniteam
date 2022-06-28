import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddApplication from "./components/AddApplication";
import AddOffer from "./components/AddOffer";
import Applications from "./components/Applications";
import EditApplication from "./components/EditApplication";
import EditOffer from "./components/EditOffer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Offers from "./components/Offers";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/offers/add" element={<AddOffer />}></Route>
          <Route path="/offers/:id/edit" element={<EditOffer />}></Route>
          <Route path="/offers/:id/applications" element={<Applications />}></Route>
          <Route path="/offers/:id/applications/:applicationId/edit" element={<EditApplication />}></Route>
          <Route path="/offers/:id/applications/add" element={<AddApplication />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
