import { useState } from "react";
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
  const [variant, setVariant] = useState("baseline");

  const renderForm = () => {
  switch (variant) {
    case "baseline": return <BaselineForm />;
    case "bem": return <BemForm />;
    case "css-modules": return <CssModulesForm />;
    case "utility": return <UtilityForm />;
    case "inline": return <InlineForm />;
    case "css-in-js": return <CssInJsForm />;
    case "mui": return <MuiForm />;
    case "hybrid": return <HybridForm />; // ← ДОБАВИЛИ
    default: return null;
  }
};

  return (
    <PageLayout title="Демонстрационное приложение: стилизация веб-форм">
      <NavTabs active={variant} onChange={setVariant} />
      <div className="form-container">{renderForm()}</div>
    </PageLayout>
  );
}