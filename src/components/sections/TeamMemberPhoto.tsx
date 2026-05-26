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
    <div className={`group relative overflow-hidden ${aspectClassName} ${className}`.trim()}>
      <Image
        src={primary}
        alt={alt}
        fill
        className="team-photo-fade object-cover group-hover:opacity-0"
        sizes={sizes}
        priority={priority}
      />
      <Image
        src={secondary}
        alt=""
        aria-hidden
        fill
        className="team-photo-fade object-cover opacity-0 group-hover:opacity-100"
        sizes={sizes}
      />
    </div>
  );
}
