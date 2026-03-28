import React from "react";
import "./ai-kinetic-card.css";

export default function AICineticCard() {
  return (
    <div className="ai-kinetic-card" aria-hidden="true">
      <svg
        className="ai-kinetic-card__svg"
        viewBox="0 0 520 420"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Construction lines */}
        <g className="ai-grid">
          <line x1="110" y1="80" x2="110" y2="340" />
          <line x1="260" y1="80" x2="260" y2="340" />
          <line x1="410" y1="80" x2="410" y2="340" />
          <line x1="90"  y1="130" x2="430" y2="130" />
          <line x1="90"  y1="210" x2="430" y2="210" />
          <line x1="90"  y1="290" x2="430" y2="290" />
        </g>

        {/* Letter A */}
        <g className="ai-letter ai-letter--a">
          <line className="stroke-base" x1="120" y1="310" x2="180" y2="110" />
          <line className="stroke-base" x1="180" y1="110" x2="240" y2="310" />
          <line className="stroke-base" x1="145" y1="230" x2="215" y2="230" />
          <line className="stroke-accent accent-1" x1="120" y1="310" x2="180" y2="110" />
          <line className="stroke-accent accent-2" x1="180" y1="110" x2="240" y2="310" />
          <line className="stroke-accent accent-3" x1="145" y1="230" x2="215" y2="230" />
        </g>

        {/* Letter I */}
        <g className="ai-letter ai-letter--i">
          <line className="stroke-base" x1="320" y1="110" x2="320" y2="310" />
          <line className="stroke-base" x1="280" y1="110" x2="360" y2="110" />
          <line className="stroke-base" x1="280" y1="310" x2="360" y2="310" />
          <line className="stroke-accent accent-4" x1="320" y1="110" x2="320" y2="310" />
          <line className="stroke-accent accent-5" x1="280" y1="110" x2="360" y2="110" />
          <line className="stroke-accent accent-6" x1="280" y1="310" x2="360" y2="310" />
        </g>

        {/* Nodes */}
        <g className="ai-nodes">
          <circle className="node node-1" cx="180" cy="110" r="4"   />
          <circle className="node node-2" cx="145" cy="230" r="3.5" />
          <circle className="node node-3" cx="215" cy="230" r="3.5" />
          <circle className="node node-4" cx="320" cy="110" r="4"   />
          <circle className="node node-5" cx="320" cy="210" r="3.5" />
          <circle className="node node-6" cx="320" cy="310" r="4"   />
        </g>

        {/* Micro labels */}
        <g className="ai-micro-labels">
          <text x="106" y="98">X1</text>
          <text x="250" y="98">A</text>
          <text x="392" y="98">I</text>
        </g>
      </svg>
    </div>
  );
}
