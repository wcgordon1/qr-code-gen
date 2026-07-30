import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const QRCodeGeneratorPage = lazy(() => import("./pages/QRCodeGeneratorPage"));
const EmailQRGeneratorPage = lazy(() => import("./pages/EmailQRGeneratorPage"));
const TextMessageQRGeneratorPage = lazy(
  () => import("./pages/TextMessageQRGeneratorPage")
);
const PhoneCallQRGeneratorPage = lazy(
  () => import("./pages/PhoneCallQRGeneratorPage")
);
const WifiQRGeneratorPage = lazy(() => import("./pages/WifiQRGeneratorPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));

const injectClarity = () => {
  const scriptId = "microsoft-clarity";
  if (document.getElementById(scriptId)) return;

  const script = document.createElement("script");
  script.id = scriptId;
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);
      t.async=1;
      t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "o596utu2ie");
  `;
  document.body.appendChild(script);
};

const App = () => {
  useEffect(() => {
    injectClarity();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qr-code-generator" element={<QRCodeGeneratorPage />} />
          <Route
            path="/email-qr-code-generator"
            element={<EmailQRGeneratorPage />}
          />
          <Route
            path="/free-text-message-qr-code-generator"
            element={<TextMessageQRGeneratorPage />}
          />
          <Route
            path="/phone-call-qr-generator"
            element={<PhoneCallQRGeneratorPage />}
          />
          <Route path="/wifi-qr-code-generator" element={<WifiQRGeneratorPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
