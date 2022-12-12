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
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home";
import Upload from "./routes/Upload/Upload";
import { ProtectedRoute } from "./ProtectedRoute";
import Signin from "./routes/Signin";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header/Header.js";
import UploadNew from "./routes/Upload/UploadNew";
import UploadSuccess from "./routes/Upload/UploadSuccess";
import UploadError from "./routes/Upload/UploadError";
import Download from "./routes/Download";

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

function Root() {
  return (
    <>
      <Header
        navLinks={[
          {
            text: "Upload",
            to: "upload",
          },
          {
            text: "Your files",
            to: "dashboard",
          },
        ]}
      ></Header>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div> Ups! Not found! Go back to homepage </div>,
    children: [
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
        path: "/download/:cid",
        element: <Download />,
      },
      {
        path: "/upload/",
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <UploadNew /> },
          {
            path: "success/",
            element: <UploadSuccess />,
          },
          {
            path: "error/",
            element: <UploadError />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
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
          <RouterProvider router={router}></RouterProvider>
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
  }, [loadAgent]); // load agent - once.
  return children;
}

export default App;
