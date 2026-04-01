export type CircuitVariant = "voice" | "sales" | "tasks" | "crm" | "analytics" | "default";

interface CardCircuitProps {
  variant?: CircuitVariant;
}

export default function CardCircuit({ variant = "default" }: CardCircuitProps) {
  return (
    <div className="card-circuit" aria-hidden="true">
      <CircuitSVG variant={variant} />
    </div>
  );
}

function CircuitSVG({ variant }: { variant: CircuitVariant }) {
  if (variant === "voice") {
    return (
      <svg viewBox="0 0 220 360" className="circuit-svg">
        <g className="circuit-fade">
          <path d="M176 0V360" />
          <path d="M150 0V360" />
          <path d="M124 0V360" />
        </g>
        <g className="circuit-traces">
          <path className="trace t1" d="M176 24V110H142V164" />
          <path className="trace t2" d="M150 52V128H110V190H62" />
          <path className="trace t3" d="M124 86V156H166V246" />
          <path className="trace t4" d="M176 180H126V292H82" />
          <path className="trace t5" d="M150 220V334H190" />
        </g>
        <g className="circuit-nodes">
          <circle className="node n1" cx="176" cy="24"  r="4"   />
          <circle className="node n2" cx="142" cy="110" r="3.5" />
          <circle className="node n3" cx="110" cy="128" r="3.5" />
          <circle className="node n4" cx="62"  cy="190" r="3.5" />
          <circle className="node n5" cx="166" cy="246" r="3.5" />
          <circle className="node n6" cx="82"  cy="292" r="3.5" />
          <circle className="node n7" cx="190" cy="334" r="4"   />
        </g>
        <g className="circuit-rects">
          <rect x="132" y="170" width="24" height="10" rx="2" />
          <rect x="138" y="154" width="12" height="34" rx="6" />
        </g>
      </svg>
    );
  }

  if (variant === "sales") {
    return (
      <svg viewBox="0 0 220 360" className="circuit-svg">
        <g className="circuit-fade">
          <path d="M174 0V360" />
          <path d="M148 0V360" />
          <path d="M122 0V360" />
        </g>
        <g className="circuit-traces">
          <path className="trace t1" d="M174 26V92H136V146H92" />
          <path className="trace t2" d="M148 54V126H108V186H60" />
          <path className="trace t3" d="M122 88V152H162V234" />
          <path className="trace t4" d="M174 170H128V286H82" />
          <path className="trace t5" d="M148 214V330H188" />
        </g>
        <g className="circuit-nodes">
          <circle className="node n1" cx="174" cy="26"  r="4"   />
          <circle className="node n2" cx="136" cy="92"  r="3.5" />
          <circle className="node n3" cx="92"  cy="146" r="3.5" />
          <circle className="node n4" cx="60"  cy="186" r="3.5" />
          <circle className="node n5" cx="162" cy="234" r="3.5" />
          <circle className="node n6" cx="82"  cy="286" r="3.5" />
          <circle className="node n7" cx="188" cy="330" r="4"   />
        </g>
        <g className="circuit-rects">
          <rect x="126" y="160" width="14" height="22" rx="2" />
          <rect x="146" y="160" width="14" height="34" rx="2" />
          <rect x="166" y="160" width="14" height="48" rx="2" />
        </g>
      </svg>
    );
  }

  if (variant === "tasks") {
    return (
      <svg viewBox="0 0 220 360" className="circuit-svg">
        <g className="circuit-fade">
          <path d="M180 0V360" />
          <path d="M156 0V360" />
          <path d="M132 0V360" />
        </g>
        <g className="circuit-traces">
          <path className="trace t1" d="M182 30V88H144V136" />
          <path className="trace t2" d="M156 58V124H108V186H58" />
          <path className="trace t3" d="M132 90V220H168V270" />
          <path className="trace t4" d="M182 150H126V300H78" />
          <path className="trace t5" d="M156 196V332H192" />
        </g>
        <g className="circuit-nodes">
          <circle className="node n1" cx="182" cy="30"  r="4"   />
          <circle className="node n2" cx="144" cy="88"  r="3.5" />
          <circle className="node n3" cx="108" cy="124" r="3.5" />
          <circle className="node n4" cx="58"  cy="186" r="3.5" />
          <circle className="node n5" cx="168" cy="220" r="3.5" />
          <circle className="node n6" cx="78"  cy="300" r="3.5" />
          <circle className="node n7" cx="192" cy="332" r="4"   />
        </g>
        <g className="circuit-rects">
          <rect x="118" y="170" width="18" height="28" rx="2" />
        </g>
      </svg>
    );
  }

  if (variant === "crm") {
    return (
      <svg viewBox="0 0 220 360" className="circuit-svg">
        <g className="circuit-fade">
          <path d="M176 0V360" />
          <path d="M148 0V360" />
          <path d="M120 0V360" />
        </g>
        <g className="circuit-traces">
          <path className="trace t1" d="M176 28V86H140V148H86" />
          <path className="trace t2" d="M148 52V118H110V176H62" />
          <path className="trace t3" d="M120 84V144H158V232" />
          <path className="trace t4" d="M176 166H122V286H72" />
          <path className="trace t5" d="M148 210V332H186" />
        </g>
        <g className="circuit-nodes">
          <circle className="node n1" cx="176" cy="28"  r="4"   />
          <circle className="node n2" cx="140" cy="86"  r="3.5" />
          <circle className="node n3" cx="86"  cy="148" r="3.5" />
          <circle className="node n4" cx="62"  cy="176" r="3.5" />
          <circle className="node n5" cx="158" cy="232" r="3.5" />
          <circle className="node n6" cx="72"  cy="286" r="3.5" />
          <circle className="node n7" cx="186" cy="332" r="4"   />
        </g>
        <g className="circuit-rects">
          <rect x="132" y="124" width="14" height="22" rx="2" />
          <rect x="92"  y="206" width="16" height="26" rx="2" />
        </g>
      </svg>
    );
  }

  if (variant === "analytics") {
    return (
      <svg viewBox="0 0 220 360" className="circuit-svg">
        <g className="circuit-fade">
          <path d="M178 0V360" />
          <path d="M152 0V360" />
          <path d="M126 0V360" />
        </g>
        <g className="circuit-traces">
          <path className="trace t1" d="M178 24V92H144V154" />
          <path className="trace t2" d="M152 56V136H116V214H72" />
          <path className="trace t3" d="M126 88V164H170V250" />
          <path className="trace t4" d="M178 174H132V296H88" />
          <path className="trace t5" d="M152 224V330H194" />
        </g>
        <g className="circuit-nodes">
          <circle className="node n1" cx="178" cy="24"  r="4"   />
          <circle className="node n2" cx="144" cy="92"  r="3.5" />
          <circle className="node n3" cx="116" cy="136" r="3.5" />
          <circle className="node n4" cx="72"  cy="214" r="3.5" />
          <circle className="node n5" cx="170" cy="250" r="3.5" />
          <circle className="node n6" cx="88"  cy="296" r="3.5" />
          <circle className="node n7" cx="194" cy="330" r="4"   />
        </g>
        <g className="circuit-rects">
          <rect x="136" y="182" width="12" height="18" rx="2" />
          <rect x="156" y="182" width="12" height="32" rx="2" />
          <rect x="176" y="182" width="12" height="48" rx="2" />
        </g>
      </svg>
    );
  }

  // default
  return (
    <svg viewBox="0 0 220 360" className="circuit-svg">
      <g className="circuit-fade">
        <path d="M176 0V360" />
        <path d="M150 0V360" />
        <path d="M124 0V360" />
      </g>
      <g className="circuit-traces">
        <path className="trace t1" d="M176 30V88H140V150" />
        <path className="trace t2" d="M150 56V124H110V186H60" />
        <path className="trace t3" d="M124 90V162H166V250" />
        <path className="trace t4" d="M176 172H126V294H78" />
        <path className="trace t5" d="M150 216V332H190" />
      </g>
      <g className="circuit-nodes">
        <circle className="node n1" cx="176" cy="30"  r="4"   />
        <circle className="node n2" cx="140" cy="88"  r="3.5" />
        <circle className="node n3" cx="110" cy="124" r="3.5" />
        <circle className="node n4" cx="60"  cy="186" r="3.5" />
        <circle className="node n5" cx="166" cy="250" r="3.5" />
        <circle className="node n6" cx="78"  cy="294" r="3.5" />
        <circle className="node n7" cx="190" cy="332" r="4"   />
      </g>
      <g className="circuit-rects">
        <rect x="132" y="176" width="16" height="22" rx="2" />
      </g>
    </svg>
  );
}
