import { CONSENT_STORAGE_KEY } from "@/lib/legal/consent";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TVGLWGDJ";

const GTM_JS_URL = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

/** Consent Mode defaults — small, runs before paint; no wait_for_update. */
export function buildConsentBootstrapScript(): string {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
function zionGtmDebugMode(){
  try{
    var q=location.search||'';
    if(/gtm_debug|gtm_preview|gtm_auth|tagassistant/i.test(q))return true;
    if(/gtm_debug|gtm_preview/i.test(location.hash||''))return true;
    var r=document.referrer||'';
    if(/googletagmanager\\.com|tagassistant\\.google\\.com|analytics\\.google\\.com/i.test(r))return true;
    var c=document.cookie||'';
    if(/gtm_preview=|__TAG_ASSISTANT=|google_tagmanager_debug=/.test(c))return true;
    if(window.self!==window.top){
      try{
        if(/gtm_debug|gtm_preview/i.test((window.top.location.search||'')+(window.top.location.hash||'')))return true;
      }catch(e){
        if(/google|googletagmanager|tagassistant|g\\.doubleclick/i.test(r))return true;
      }
    }
  }catch(e){}
  return false;
}
function zionApplyConsentGrant(){
  gtag('consent','update',{
    analytics_storage:'granted',
    ad_storage:'granted',
    ad_user_data:'granted',
    ad_personalization:'granted'
  });
}
var zionGtmDebug=zionGtmDebugMode();
gtag('consent','default',{
  analytics_storage:zionGtmDebug?'granted':'denied',
  ad_storage:zionGtmDebug?'granted':'denied',
  ad_user_data:zionGtmDebug?'granted':'denied',
  ad_personalization:zionGtmDebug?'granted':'denied',
  functionality_storage:'granted',
  security_storage:'granted'
});
if(zionGtmDebug){zionApplyConsentGrant();}
else{
  try{
    if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='all'){zionApplyConsentGrant();}
  }catch(e){}
}
`.trim();
}

/** Load gtm.js after load + idle so it does not compete with LCP on mobile. */
export function buildGtmDeferredScript(): string {
  return `
function zionLoadGtm(){
  if(window.zionGtmLoaded)return;
  window.zionGtmLoaded=true;
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var j=document.createElement('script');
  j.async=true;
  j.src='${GTM_JS_URL}';
  document.head.appendChild(j);
}
function zionShouldLoadGtm(){
  if(zionGtmDebugMode())return true;
  try{return localStorage.getItem('${CONSENT_STORAGE_KEY}')==='all';}catch(e){return false;}
}
function zionScheduleGtm(){
  if(!zionShouldLoadGtm())return;
  if(typeof requestIdleCallback==='function'){requestIdleCallback(zionLoadGtm,{timeout:5000});}
  else{setTimeout(zionLoadGtm,2000);}
}
if(document.readyState==='complete'){zionScheduleGtm();}
else{window.addEventListener('load',zionScheduleGtm,{once:true});}
window.addEventListener('storage',function(e){
  if(e.key==='${CONSENT_STORAGE_KEY}'&&e.newValue==='all'){zionScheduleGtm();}
});
window.addEventListener('zion:analytics-consent',zionScheduleGtm);
`.trim();
}
