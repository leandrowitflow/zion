import Image from "next/image";

type TeamMemberPhotoProps = {
  primary: string;
  secondary: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function TeamMemberPhoto({
  primary,
  secondary,
  alt,
  className = "",
  aspectClassName = "aspect-[411/502]",
  sizes = "411px",
  priority = false,
}: TeamMemberPhotoProps) {
  return (
    <div
      className={`group relative overflow-hidden bg-[#2b2e2b] ${aspectClassName} ${className}`.trim()}
    >
      <Image
        src={primary}
        alt={alt}
        fill
        className="team-photo-base object-cover"
        sizes={sizes}
        priority={priority}
      />
      <Image
        src={secondary}
        alt="" aria-hidden
        fill
        className="team-photo-hover object-cover opacity-0 group-hover:opacity-100"
        sizes={sizes}
        loading="eager"
      />
    </div>
  );
}
