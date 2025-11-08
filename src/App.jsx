import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Citylist from "./Components/Citylist"
import Countrylist from "./Components/Countrylist"
import City from "./Components/City"
import Form from "./Components/Form"
import SpinnerFullPage from "./Components/SpinnerFullPage"

import { Navigate } from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./Pages/ProtectedRoute"

const Homepage = lazy(() => import("./Pages/Homepage"))
const Product = lazy(() => import("./Pages/Product"))
const Pricing = lazy(() => import("./Pages/Pricing"))
const Login = lazy(() => import("./Pages/Login"))
const AppLayout = lazy(() => import("./Pages/AppLayout"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound"))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route index element={<Citylist />} />
                <Route path="cities" element={<Citylist />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<Countrylist />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
