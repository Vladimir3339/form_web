import { NavLink } from "react-router-dom";

type Variant = {
  id: string;
  label: string;
};

const variants: Variant[] = [
  { id: "baseline",   label: "Глобальный CSS" },
  { id: "bem",        label: "BEM" },
  { id: "css-modules", label: "CSS Modules" },
  { id: "utility",    label: "Utility CSS" },
  { id: "inline",     label: "Inline-стили" },
  { id: "css-in-js",  label: "CSS-in-JS" },
  { id: "mui",        label: "UI-библиотека" },
  { id: "hybrid",     label: "Гибридный" },
];

export function NavTabs() {
  return (
    <nav className="nav-tabs" aria-label="Варианты стилизации формы">
      {variants.map((v) => (
        <NavLink
          key={v.id}
          to={v.id} // относительный путь: /baseline, /bem и т.д. [web:18]
          className={({ isActive }) =>
            "nav-tab" + (isActive ? " nav-tab--active" : "")
          }
          end
        >
          {v.label}
        </NavLink>
      ))}
    </nav>
  );
}