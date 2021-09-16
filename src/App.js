import { Route, Switch } from "react-router-dom";

import "./App.css";
import ImageDetail from "./pages/ImageDetail";
import ImageForm from "./pages/ImageForm";
import ImageGallery from "./pages/ImageGallery";

function App() {
  return (
    <Switch>
      <Route path="/" component={ImageGallery} />
    </Switch>
  );
}

export default App;
