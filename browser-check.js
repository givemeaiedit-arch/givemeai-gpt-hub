(() => {
  function isGoogleChrome() {
    const ua = navigator.userAgent || "";
    const isInAppBrowser = /FBAN|FBAV|FB_IAB|Instagram|Line\/|LINE\/|MicroMessenger|Twitter|TikTok|wv\)/i.test(ua);
    if (isInAppBrowser) return false;

    const brands = navigator.userAgentData?.brands || [];
    if (brands.length > 0) return brands.some((brand) => brand.brand === "Google Chrome");

    const isChromeLike = /Chrome\/|CriOS\//.test(ua);
    const isOtherChromium = /Edg\/|EdgiOS|OPR\/|Opera|SamsungBrowser|DuckDuckGo|HeadlessChrome|FxiOS/.test(ua);
    return isChromeLike && !isOtherChromium;
  }

  function shouldForceNotice() {
    return window.location.search.includes("showChromeNotice=1");
  }

  function copyCurrentLink(button, status) {
    const link = window.location.href;
    const fallback = () => {
      const input = document.createElement("textarea");
      input.value = link;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    };

    Promise.resolve()
      .then(() => {
        if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(link);
        fallback();
        return null;
      })
      .then(() => {
        button.textContent = "คัดลอกแล้ว";
        status.textContent = "คัดลอกลิงก์แล้ว ให้นำไปวางเปิดใน Google Chrome";
      })
      .catch(() => {
        fallback();
        button.textContent = "คัดลอกแล้ว";
        status.textContent = "คัดลอกลิงก์แล้ว ให้นำไปวางเปิดใน Google Chrome";
      });
  }

  function showChromeNotice() {
    if (!shouldForceNotice() && isGoogleChrome()) return;

    const overlay = document.createElement("div");
    overlay.className = "chrome-notice";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;width:100vw;height:100vh;padding:18px;box-sizing:border-box;overflow:hidden;background:rgba(0,0,0,.92);";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "chromeNoticeTitle");
    overlay.innerHTML = `
      <div style="position:relative;width:min(480px,100%);max-height:calc(100vh - 36px);overflow:auto;box-sizing:border-box;border:1px solid rgba(255,122,0,.55);border-radius:18px;padding:22px;background:#11100e;color:#f7f1e7;box-shadow:0 28px 80px rgba(0,0,0,.72);font-family:Inter,system-ui,'Noto Sans Thai',sans-serif;">
        <button type="button" aria-label="ปิด" style="position:absolute;right:14px;top:12px;width:34px;height:34px;border:1px solid rgba(255,255,255,.16);border-radius:50%;color:#fff;background:rgba(255,255,255,.08);font-size:20px;">×</button>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <svg width="52" height="52" viewBox="0 0 48 48" aria-hidden="true" style="flex:0 0 auto;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.25),0 10px 26px rgba(66,133,244,.25);">
            <circle cx="24" cy="24" r="22" fill="#ffffff"></circle>
            <path d="M24 24H5.5A22 22 0 0 1 43 8.5Z" fill="#ea4335"></path>
            <path d="M24 24 33.5 40.5A22 22 0 0 1 5.5 24Z" fill="#34a853"></path>
            <path d="M24 24 43 8.5A22 22 0 0 1 33.5 40.5Z" fill="#fbbc05"></path>
            <circle cx="24" cy="24" r="10" fill="#4285f4" stroke="#ffffff" stroke-width="4"></circle>
          </svg>
          <div>
            <p style="margin:0;color:#ffb457;font-size:.86rem;font-weight:900;">แนะนำให้เปิดด้วย Google Chrome</p>
            <h2 id="chromeNoticeTitle" style="margin:4px 0 0;font-size:1.35rem;line-height:1.25;">เว็บนี้เหมาะกับ Google Chrome</h2>
          </div>
        </div>
        <p style="margin:0 0 16px;color:#d8d0c4;line-height:1.65;">หากเปิดผ่าน LINE, Facebook หรือ browser ในแอป บางระบบ เช่น Login Gmail, Copy Link หรือ Popup อาจทำงานไม่สมบูรณ์</p>
        <div style="display:grid;gap:10px;">
          <button class="chrome-copy" type="button" style="min-height:44px;border:0;border-radius:12px;color:#1d0d00;background:linear-gradient(135deg,#ffcc7a,#ff7a00);font-weight:900;">Copy ลิงก์ไปเปิดใน Chrome</button>
          <button class="chrome-dismiss" type="button" style="min-height:42px;border:1px solid rgba(255,255,255,.16);border-radius:12px;color:#f7f1e7;background:rgba(255,255,255,.06);font-weight:800;">เปิดต่อในหน้านี้</button>
        </div>
        <p class="chrome-status" aria-live="polite" style="min-height:22px;margin:12px 0 0;color:#b9b0a4;line-height:1.5;">กด Copy แล้วนำลิงก์ไปวางใน Google Chrome</p>
      </div>
    `;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;

    const sizeOverlay = () => {
      const viewport = window.visualViewport;
      const width = Math.ceil(Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, viewport?.width || 0));
      const height = Math.ceil(Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0, viewport?.height || 0));
      overlay.style.width = `${width}px`;
      overlay.style.height = `${height}px`;
    };

    const closeNotice = () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      window.removeEventListener("resize", sizeOverlay);
      window.visualViewport?.removeEventListener("resize", sizeOverlay);
      window.visualViewport?.removeEventListener("scroll", sizeOverlay);
      overlay.remove();
    };

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    sizeOverlay();
    window.addEventListener("resize", sizeOverlay);
    window.visualViewport?.addEventListener("resize", sizeOverlay);
    window.visualViewport?.addEventListener("scroll", sizeOverlay);
    const copyButton = overlay.querySelector(".chrome-copy");
    const status = overlay.querySelector(".chrome-status");
    overlay.querySelector("[aria-label='ปิด']")?.addEventListener("click", closeNotice);
    overlay.querySelector(".chrome-dismiss")?.addEventListener("click", closeNotice);
    copyButton?.addEventListener("click", () => copyCurrentLink(copyButton, status));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showChromeNotice, { once: true });
  } else {
    showChromeNotice();
  }
})();
