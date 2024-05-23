import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Intent from "./pages/Intent";
import Entities from "./pages/Entities";
import Knowledge from "./pages/Knowledge";
import IntentDummy from "./pages/IntentDummy";
import EntityDummy from "./pages/EntityDummy";
import Settings from "./pages/Settings";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="intents" element={<Intent />} />
      <Route path="entities" element={<Entities />} />
      <Route path="knowledge" element={<Knowledge />} />
      <Route path="intentdummy" element={<IntentDummy />} />
      <Route path="entitydummy" element={<EntityDummy />} />
      <Route path="settings/*" element={<Settings />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
