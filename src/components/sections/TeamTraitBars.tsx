import type { TeamTrait } from "@/lib/team";

type TeamTraitBarsProps = {
  traits: TeamTrait[];
  className?: string;
};

export function TeamTraitBars({ traits, className = "" }: TeamTraitBarsProps) {
  return (
    <ul className={`space-y-6 ${className}`.trim()}>
      {traits.map((trait) => (
        <li key={trait.label}>
          <span className="font-display block text-[19px] leading-[1.208em] text-foreground">
            {trait.label}
          </span>
          <div
            className="team-trait-bar mt-3"
            role="progressbar"
            aria-valuenow={trait.value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={trait.label}
          >
            <span className="team-trait-bar-fill" style={{ width: `${trait.value}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
