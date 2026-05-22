"use client";

import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { sharedAssets } from "@/lib/assets/shared";

const heroImage =
  "https://www.figma.com/api/mcp/asset/840ec345-a0bf-4f64-858b-9cae2c36b7b0";

export default function IgniteUsPage() {
  return (
    <PageShell>
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,63.6vw,1400px)]">
        <Image src={heroImage} alt="" fill className="object-cover object-top" sizes="100vw" priority />
      </section>

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-16 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div>
              <h1 className="font-serif text-4xl text-foreground md:text-5xl">Contact Details</h1>

              <div className="mt-10 space-y-8 text-base leading-7 text-muted">
                <div>
                  <p className="font-semibold text-foreground">Headquarters :</p>
                  <p>
                    Av. Defensores de Chaves, 15
                    <br />
                    4ª D, 1000-109, Lisbon, Portugal
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Branch :</p>
                  <p>Porto | Algarve | Madeira | Azores</p>
                </div>
                <div>
                  <a
                    href="mailto:ignite@zion-creativeartisans.com"
                    className="text-foreground hover:underline"
                  >
                    ignite@zion-creativeartisans.com
                  </a>
                  <br />
                  <a href="tel:+351210188406" className="text-foreground hover:underline">
                    (+351) 210 188 406
                  </a>
                </div>
              </div>

              <div className="mt-10 flex gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Image src={sharedAssets.facebook} alt="Facebook" width={47} height={47} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Image src={sharedAssets.linkedin} alt="LinkedIn" width={47} height={47} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Image src={sharedAssets.instagram} alt="Instagram" width={47} height={47} />
                </a>
                <div className="relative h-[47px] w-[47px]">
                  <Image src={sharedAssets.spotifyBg} alt="" fill className="object-cover" />
                  <Image
                    src={sharedAssets.spotifyIcon}
                    alt="Spotify"
                    width={17}
                    height={15}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Email Address", type: "email", name: "email" },
                { label: "Phone", type: "tel", name: "phone" },
                { label: "Company", type: "text", name: "company" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm text-muted">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="mt-2 w-full border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none focus:border-accent"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help you? Feel free to get in touch!"
                  className="mt-2 w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none placeholder:text-muted/60 focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex h-[57px] items-center justify-center bg-button px-10 font-serif text-[17px] font-semibold text-white transition hover:bg-button/90"
                >
                  Get In Touch
                </button>
                <label className="flex items-start gap-3 text-sm text-muted">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    I agree that my data is{" "}
                    <span className="underline">collected and stored</span>.
                  </span>
                </label>
              </div>
            </form>
          </div>
        </SiteContainer>
      </SiteSection>

      <section className="site-full-bleed w-full">
        <iframe
          title="ZION headquarters location"
          src="https://maps.google.com/maps?q=Av.+Defensores+de+Chaves+15+Lisbon&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-[400px] w-full border-0 lg:h-[500px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </PageShell>
  );
}
