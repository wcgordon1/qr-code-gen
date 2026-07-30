import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { GENERATOR_ROUTES } from "./config/generatorConfig.js";
import { loadMicrosoftClarity } from "./utils/analytics.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const QrCodeGeneratorPage = lazy(
  () => import("./pages/GeneratorPage.jsx"),
);
const TermsOfServicePage = lazy(
  () => import("./pages/TermsOfServicePage.jsx"),
);

/**
 * Configures analytics, routing, and lazy page loading for the application.
 *
 * @returns {JSX.Element} The complete client-side application.
 */
export default function App() {
  useEffect(() => {
    loadMicrosoftClarity(import.meta.env.VITE_CLARITY_PROJECT_ID);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {GENERATOR_ROUTES.map((generator) => (
            <Route
              key={generator.path}
              path={generator.path}
              element={<QrCodeGeneratorPage generatorType={generator.type} />}
            />
          ))}
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
