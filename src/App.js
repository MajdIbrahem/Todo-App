import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

// Components
import Loading from "./components/Loading";

// Pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <TodoPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{ className: "toaster" }}
          position="bottom-center"
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
