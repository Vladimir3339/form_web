import { Routes, Route, Navigate } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { NavTabs } from "./components/layout/NavTabs";
import { BaselineForm } from "./components/form/baseline/BaselineForm";
import { BemForm } from "./components/form/bem/BemForm";
import { CssModulesForm } from "./components/form/cssModules/CssModulesForm";
import { UtilityForm } from "./components/form/utility/UtilityForm.tsx";
import { InlineForm } from "./components/form/inline/InlineForm";
import { CssInJsForm } from "./components/form/cssInJs/CssInJsForm";
import { MuiForm } from "./components/form/mui/MuiForm";
import { HybridForm } from "./components/form/hybrid/HybridForm";
import "./styles/global.css";

export default function App() {
  return (
    <PageLayout title="Демонстрационное приложение: стилизация веб-форм">
      <NavTabs />
      <div className="form-container">
        <Routes>
          <Route index element={<Navigate to="baseline" replace />} />
          <Route path="baseline"    element={<BaselineForm />} />
          <Route path="bem"         element={<BemForm />} />
          <Route path="css-modules" element={<CssModulesForm />} />
          <Route path="utility"     element={<UtilityForm />} />
          <Route path="inline"      element={<InlineForm />} />
          <Route path="css-in-js"   element={<CssInJsForm />} />
          <Route path="mui"         element={<MuiForm />} />
          <Route path="hybrid"      element={<HybridForm />} />
        </Routes>
      </div>
    </PageLayout>
  );
}