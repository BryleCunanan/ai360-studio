import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Intent from "./pages/Intents/Intent";
import Entities from "./pages/Entities/Entities";
import Knowledge from "./pages/Knowledge/Knowledge";
import CreateIntent from "./pages/Intents/CreateIntent";
import EntityDummy from "./pages/Entities/EntityDummy";
import Settings from "./pages/Settings/Settings";
import RootLayout from "./layouts/RootLayout";
import IntentIndex from "./pages/Intents/IntentIndex";
import EntityIndex from "./pages/Entities/EntityIndex";
import UserAccess from "./pages/Settings/UserAccess";
import OtherPage from "./pages/Settings/OtherPage";
import Testing from "./pages/Testing/Testing";
import TestGround from "./pages/Testing/TestGround";
import Selection from "./pages/Selection";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="select" element={<Selection />} />
      <Route path="intents" element={<Intent />}>
        <Route index element={<IntentIndex />} />
        <Route path=":id" element={<CreateIntent />} />
      </Route>
      <Route path="entities" element={<Entities />}>
        <Route index element={<EntityIndex />} />
        <Route path="entitydummy" element={<EntityDummy />} />
      </Route>
      <Route path="knowledge" element={<Knowledge />} />
      <Route path="test" element={<Testing />}>
        <Route index element={<TestGround />} />
      </Route>
      <Route path="settings" element={<Settings />}>
        <Route path="users" element={<UserAccess />} />
        <Route path="config" element={<OtherPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
