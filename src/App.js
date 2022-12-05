import React, { useEffect } from "react";
import { KeyringProvider, useKeyring } from "@w3ui/react-keyring";
import { UploaderProvider } from "@w3ui/react-uploader";
import {
  accessServiceConnection,
  accessServicePrincipal,
  uploadServiceConnection,
  uploadServicePrincipal,
} from "./StagingService";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./routes/Home";
import Upload from "./routes/Upload";
import { ProtectedRoute } from "./ProtectedRoute";
import Signin from "./routes/Signin";
import Dashboard from "./routes/Dashboard";

function Index() {
  const [{ space }] = useKeyring();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, the default page should be the upload one.
    // But it should still be able to navigate to the user need
    if (space?.registered()) {
      navigate("/upload");
    }
  }, [space, navigate]);
  return <Home />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div> Ups! Not found! Go back to homepage </div>,
  },
]);

function App() {
  return (
    <KeyringProvider
      servicePrincipal={accessServicePrincipal}
      connection={accessServiceConnection}
    >
      <UploaderProvider
        servicePrincipal={uploadServicePrincipal}
        connection={uploadServiceConnection}
      >
        <AgentLoader>
          <RouterProvider router={router} />
        </AgentLoader>
      </UploaderProvider>
    </KeyringProvider>
  );
}

function AgentLoader({ children }) {
  const [, { loadAgent }] = useKeyring();
  // eslint-disable-next-line
  useEffect(() => {
    loadAgent();
  }, []); // load agent - once.
  return children;
}

export default App;
