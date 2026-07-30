import { useState } from "react";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlinePaintBrush,
  HiOutlinePhoto,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

import QrCodeAdvancedControls from "./QrCodeAdvancedControls.jsx";
import QrCodeColorControls from "./QrCodeColorControls.jsx";
import QrCodeLogoControls from "./QrCodeLogoControls.jsx";
import QrCodePatternControls from "./QrCodePatternControls.jsx";

const EDITOR_TABS = Object.freeze([
  {
    id: "pattern",
    label: "Style",
    icon: HiOutlineSquares2X2,
  },
  {
    id: "color",
    label: "Color",
    icon: HiOutlinePaintBrush,
  },
  {
    id: "logo",
    label: "Logo",
    icon: HiOutlinePhoto,
  },
  {
    id: "advanced",
    label: "More",
    icon: HiOutlineAdjustmentsHorizontal,
  },
]);

/**
 * Organizes the complete design editor into focused, approachable tabs.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Shared QR appearance editor.
 */
export default function QrCodeStyleControls({
  design,
  logoName,
  onApplyPreset,
  onDesignChange,
  onLogoChange,
  onLogoRemove,
  onReset,
}) {
  const [activeTab, setActiveTab] = useState("pattern");

  return (
    <section
      className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_55px_rgba(30,41,59,0.08)] ring-1 ring-slate-200/80"
      aria-labelledby="design-editor-heading"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-indigo-600 uppercase">
            Step 2
          </p>
          <h2
            id="design-editor-heading"
            className="mt-1 text-lg font-semibold tracking-tight text-slate-950"
          >
            Design your QR
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset design
        </button>
      </div>

      <div
        className="grid grid-cols-4 border-b border-slate-200 bg-slate-50/70 px-2 pt-2 sm:px-4"
        role="tablist"
        aria-label="QR design controls"
      >
        {EDITOR_TABS.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`editor-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-controls={`editor-panel-${tab.id}`}
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex min-h-14 items-center justify-center gap-1.5 rounded-t-lg px-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-600 sm:text-sm ${
                isSelected
                  ? "bg-white text-indigo-700 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-indigo-600"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`editor-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`editor-tab-${activeTab}`}
        className="p-5 sm:p-6"
      >
        {activeTab === "pattern" && (
          <QrCodePatternControls
            design={design}
            onApplyPreset={onApplyPreset}
            onDesignChange={onDesignChange}
          />
        )}
        {activeTab === "color" && (
          <QrCodeColorControls
            design={design}
            onDesignChange={onDesignChange}
          />
        )}
        {activeTab === "logo" && (
          <QrCodeLogoControls
            design={design}
            logoName={logoName}
            onDesignChange={onDesignChange}
            onLogoChange={onLogoChange}
            onLogoRemove={onLogoRemove}
          />
        )}
        {activeTab === "advanced" && (
          <QrCodeAdvancedControls
            design={design}
            onDesignChange={onDesignChange}
          />
        )}
      </div>
    </section>
  );
}
