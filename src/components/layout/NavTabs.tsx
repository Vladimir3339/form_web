type Variant = {
  id: string;
  label: string;
};

const variants: Variant[] = [
  { id: "baseline", label: "Глобальный CSS" },
  { id: "bem", label: "BEM" },
  { id: "css-modules", label: "CSS Modules" },
  { id: "utility", label: "Utility CSS" },
  { id: "inline", label: "Inline-стили" },
  { id: "css-in-js", label: "CSS-in-JS" },
  { id: "mui", label: "UI-библиотека" },
  { id: "hybrid", label: "Гибридный" }, // ← ДОБАВИЛИ
];

type NavTabsProps = {
  active: string;
  onChange: (id: string) => void;
};

export function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav className="nav-tabs" aria-label="Варианты стилизации формы">
      {variants.map((v) => (
        <button
          key={v.id}
          type="button"
          className={"nav-tab" + (v.id === active ? " nav-tab--active" : "")}
          onClick={() => onChange(v.id)}
        >
          {v.label}
        </button>
      ))}
    </nav>
  );
}