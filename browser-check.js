(() => {
  function isGoogleChrome() {
    const ua = navigator.userAgent || "";
    const isInAppBrowser =
      /FBAN|FBAV|FB_IAB|Instagram|Line\/|LINE\/|MicroMessenger|Twitter|TikTok|wv\)/i.test(ua);
    if (isInAppBrowser) return false;

    const brands = navigator.userAgentData?.brands || [];
    if (brands.length > 0) {
      return brands.some((brand) => brand.brand === "Google Chrome");
    }

    const isChromeLike = /Chrome\/|CriOS\//.test(ua);
    const isOtherChromium =
      /Edg\/|EdgiOS|OPR\/|Opera|SamsungBrowser|DuckDuckGo|HeadlessChrome|FBAN|FBAV|Instagram|Line\/|Twitter|FxiOS/.test(
        ua,
      );
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
        status.textContent = "คัดลอกลิงก์แล้ว นำไปวางใน Google Chrome ได้เลย";
      })
      .catch(() => {
        fallback();
        button.textContent = "คัดลอกแล้ว";
        status.textContent = "คัดลอกลิงก์แล้ว นำไปวางใน Google Chrome ได้เลย";
      });
  }

  function showChromeNotice() {
    if (!shouldForceNotice() && isGoogleChrome()) return;

    const overlay = document.createElement("div");
    overlay.className = "chrome-notice";
    overlay.style.cssText =
      "position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;width:100vw;height:100vh;min-height:100vh;padding:18px;box-sizing:border-box;overflow:hidden;background:rgba(0,0,0,.82);";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "chromeNoticeTitle");
    overlay.innerHTML = `
      <div class="chrome-notice__card" style="position:relative;z-index:2147483647;width:min(480px, calc(100% - 20px));max-height:calc(100vh - 54px);overflow:auto;box-sizing:border-box;border:1px solid rgba(231,194,126,.5);border-radius:12px;padding:22px;background:#11100e;color:#f7f1e7;box-shadow:0 28px 80px rgba(0,0,0,.68);">
        <button class="chrome-notice__close" type="button" aria-label="ปิด">x</button>
        <div class="chrome-notice__header">
          <svg class="chrome-logo-svg" width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" style="flex:0 0 auto;width:44px;height:44px;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.25),0 10px 26px rgba(66,133,244,.25);">
            <circle cx="24" cy="24" r="22" fill="#ffffff"></circle>
            <path d="M24 24 5.5 24A22 22 0 0 1 43 8.5Z" fill="#ea4335"></path>
            <path d="M24 24 33.5 40.5A22 22 0 0 1 5.5 24Z" fill="#34a853"></path>
            <path d="M24 24 43 8.5A22 22 0 0 1 33.5 40.5Z" fill="#fbbc05"></path>
            <circle cx="24" cy="24" r="10" fill="#4285f4" stroke="#ffffff" stroke-width="4"></circle>
          </svg>
          <p class="chrome-notice__eyebrow">แนะนำให้เปิดด้วย Google Chrome</p>
        </div>
        <h2 id="chromeNoticeTitle">เว็บนี้เหมาะกับ Google Chrome</h2>
        <p class="chrome-notice__text">หากเปิดผ่านแอปอื่นหรือ browser ในแอป บางระบบ เช่น Login, Copy Link หรือ Popup อาจทำงานไม่สมบูรณ์</p>
        <div class="chrome-notice__actions">
          <button class="primary-button chrome-notice__copy" type="button">Copy ลิงก์</button>
          <button class="ghost-button chrome-notice__dismiss" type="button">เปิดต่อในหน้านี้</button>
        </div>
        <p class="chrome-notice__status" aria-live="polite">คัดลอกแล้วนำลิงก์ไปวางใน Google Chrome</p>
      </div>
    `;

    const closeNotice = () => {
      overlay.remove();
    };

    document.body.appendChild(overlay);
    const copyButton = overlay.querySelector(".chrome-notice__copy");
    const status = overlay.querySelector(".chrome-notice__status");
    overlay.querySelector(".chrome-notice__close")?.addEventListener("click", closeNotice);
    overlay.querySelector(".chrome-notice__dismiss")?.addEventListener("click", closeNotice);
    copyButton?.addEventListener("click", () => copyCurrentLink(copyButton, status));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showChromeNotice, { once: true });
  } else {
    showChromeNotice();
  }
})();
