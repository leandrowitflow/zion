"use client";

import Image from "next/image";

import { igniteAssets } from "@/lib/assets/ignite";

type FormFieldIcon = "user" | "email" | "phone" | "company" | "message";

function FieldIcon({ icon }: { icon: FormFieldIcon }) {
  const className = "size-5 shrink-0 text-[#696866]";

  switch (icon) {
    case "user":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2.5" y="4.5" width="15" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 5.5 10 11l7-5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6.5 3.5h2l1 3.5-1.5 1c.8 1.6 2.1 2.9 3.7 3.7l1-1.5 3.5 1v2c0 .6-.4 1-1 1C9.2 14.2 5.8 10.8 4.5 6.5c0-.6.4-1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "company":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "message":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 14.5 5.5 11H15a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 15 2H5A1.5 1.5 0 0 0 3.5 3.5v6A1.5 1.5 0 0 0 5 11l-1 3.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M7 6.5h6M7 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
}

function FormField({
  id,
  label,
  type = "text",
  icon,
}: {
  id: string;
  label: string;
  type?: string;
  icon: FormFieldIcon;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-2 text-[15px] leading-none text-black">
        <span className="min-[1400px]:hidden">
          <FieldIcon icon={icon} />
        </span>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="mt-0.5 block h-[15px] w-full border-0 border-b border-[#696866] bg-transparent px-0 py-0 text-[15px] leading-none text-black outline-none focus:border-[#2b2e2b]"
      />
    </div>
  );
}

/**
 * Figma Ignite Us contact block (2559:47 desktop, 2552:29 mobile)
 */
export function IgniteContactSection() {
  return (
    <div className="grid grid-cols-1 gap-12 min-[1400px]:grid-cols-[267px_1fr] min-[1400px]:gap-x-[162px] min-[1400px]:gap-y-0">
      {/* Contact Details — Figma x=316, w=267 */}
      <div className="text-center min-[1400px]:text-left">
        <h1 className="font-serif text-[28px] leading-[58px] text-black">Contact Details</h1>

        <div className="mt-6 space-y-6 text-[16px] leading-[28px] text-[#696866]">
          <div>
            <p className="font-bold">Headquarters :</p>
            <p className="font-normal leading-[27px]">
              Av. Defensores de Chaves, 15
              <br />
              4ª D, 1000-109, Lisbon, Portugal
            </p>
          </div>

          <div>
            <p>
              <span className="font-bold">Branch :</span>
              <br />
              <span className="font-normal">
                Porto | Algarve | Madeira | Azores
              </span>
            </p>
            <p className="mt-4 font-normal leading-[46px]">
              <a
                href="mailto:ignite@zion-creativeartisans.com"
                className="hover:text-[#2b2e2b]"
              >
                ignite@zion-creativeartisans.com
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 font-serif text-[21.7px] leading-[44px] text-black">
          <a href="tel:+351210188406" className="hover:opacity-70">
            (+351) 210 188 406
          </a>
        </p>

        <div className="mt-8 flex justify-center gap-[7px] min-[1400px]:justify-start">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src={igniteAssets.social.facebook} alt="" width={45} height={45} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image src={igniteAssets.social.linkedin} alt="" width={45} height={45} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src={igniteAssets.social.instagram} alt="" width={45} height={45} />
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
            <Image src={igniteAssets.social.spotify} alt="" width={45} height={45} />
          </a>
        </div>
      </div>

      {/* Contact form — Figma x=745 */}
      <form
        className="min-[1400px]:pt-[15px]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 gap-5 min-[1400px]:grid-cols-2 min-[1400px]:gap-x-[30px] min-[1400px]:gap-y-12">
          <FormField id="name" label="Name" icon="user" />
          <FormField id="email" label="Email Address" type="email" icon="email" />
          <FormField id="phone" label="Phone" type="tel" icon="phone" />
          <FormField id="company" label="Company" icon="company" />
        </div>

        <div className="mt-5 min-[1400px]:mt-8">
          <label htmlFor="message" className="flex items-center gap-2 text-[15px] leading-none text-black">
            <span className="min-[1400px]:hidden">
              <FieldIcon icon="message" />
            </span>
            How can we help you? feel free to get in touch!
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-0.5 w-full resize-none border-0 border-b border-[#696866] bg-transparent px-0 py-0 text-[15px] leading-[22px] text-black outline-none focus:border-[#2b2e2b]"
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-6 min-[1400px]:mt-10 min-[1400px]:flex-row min-[1400px]:items-center">
          <button
            type="submit"
            className="inline-flex h-[55px] w-[188px] shrink-0 items-center justify-center bg-[#383e28] font-serif text-[19px] leading-[39px] text-white transition hover:bg-[#383e28]/90"
          >
            Get in Touch
          </button>
          <label className="flex items-start gap-3 text-[14px] leading-[27px] text-[#696866]">
            <input
              type="checkbox"
              required
              className="mt-1 size-4 shrink-0 rounded-[3px] border border-[#696866] accent-[#383e28]"
            />
            <span>
              I agree that my data is{" "}
              <strong className="font-bold">collected and stored</strong>.
            </span>
          </label>
        </div>
      </form>
    </div>
  );
}
