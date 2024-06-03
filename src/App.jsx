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
import CreateIntent from "./pages/CreateIntent";
import EntityDummy from "./pages/EntityDummy";
import Settings from "./pages/Settings";
import RootLayout from "./layouts/RootLayout";
import IntentIndex from "./pages/IntentIndex";
import EntityIndex from "./pages/EntityIndex";
import UserAccess from "./pages/UserAccess";
import OtherPage from "./pages/OtherPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="intents" element={<Intent />}>
        <Route index element={<IntentIndex />} />
        <Route path=":id" element={<CreateIntent />} />
      </Route>
      <Route path="entities" element={<Entities />}>
        <Route index element={<EntityIndex />} />
        <Route path="entitydummy" element={<EntityDummy />} />
      </Route>
      <Route path="knowledge" element={<Knowledge />} />
      <Route path="settings" element={<Settings />}>
        <Route path="users" element={<UserAccess />} />
        <Route path="others" element={<OtherPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
