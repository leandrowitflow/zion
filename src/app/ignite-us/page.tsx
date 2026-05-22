import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { IgniteContactSection } from "@/components/sections/IgniteContactSection";
import { igniteAssets } from "@/lib/assets/ignite";

export default function IgniteUsPage() {
  return (
    <PageShell>
      {/* Contact Details + form — Figma 2559:47 (y=209) */}
      <SiteSection>
        <SiteContainer>
          <IgniteContactSection />
        </SiteContainer>
      </SiteSection>

      {/* Map — Figma 2559:59, 589px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[300px] h-[clamp(300px,30.67vw,589px)]">
        <iframe
          title="Map showing ZION headquarters in Lisbon"
          src={igniteAssets.mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </PageShell>
  );
}
