import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Route } from "./components/Route.jsx";
import { ContactPage } from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={ContactPage} />
      <Footer />
    </>
  );
}

export default App;
