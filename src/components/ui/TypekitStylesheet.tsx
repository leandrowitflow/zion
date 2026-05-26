"use client";

/** Non-blocking Adobe Typekit load — avoids render-blocking CSS in initial paint. */
export function TypekitStylesheet() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.typekit.net/uyr3aws.css"
        media="print"
        onLoad={(event) => {
          (event.currentTarget as HTMLLinkElement).media = "all";
        }}
      />
      <noscript>
        <link rel="stylesheet" href="https://use.typekit.net/uyr3aws.css" />
      </noscript>
    </>
  );
}
