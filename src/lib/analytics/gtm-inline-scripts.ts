import { CONSENT_STORAGE_KEY } from "@/lib/legal/consent";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TVGLWGDJ";

/**
 * Consent Mode defaults + synchronous restore (before gtm.js).
 * GTM debug/preview/Tag Assistant auto-grants so verification does not time out.
 */
export function buildConsentBootstrapScript(): string {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
function zionGtmDebugMode(){
  try{
    if(/gtm_debug|gtm_preview|tagassistant/i.test(location.search||''))return true;
    var c=document.cookie||'';
    return c.indexOf('gtm_preview=')!==-1||c.indexOf('__TAG_ASSISTANT=')!==-1||c.indexOf('google_tagmanager_debug=')!==-1;
  }catch(e){return false;}
}
var zionGtmDebug=zionGtmDebugMode();
gtag('consent','default',{
  analytics_storage:zionGtmDebug?'granted':'denied',
  ad_storage:zionGtmDebug?'granted':'denied',
  ad_user_data:zionGtmDebug?'granted':'denied',
  ad_personalization:zionGtmDebug?'granted':'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:zionGtmDebug?0:2000
});
if(!zionGtmDebug){
  try{
    var zionConsent=localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if(zionConsent==='all'){
      gtag('consent','update',{
        analytics_storage:'granted',
        ad_storage:'granted',
        ad_user_data:'granted',
        ad_personalization:'granted'
      });
    }
  }catch(e){}
}
`.trim();
}

/** Standard GTM container snippet — must run immediately after consent bootstrap. */
export function buildGtmHeadScript(): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
}
