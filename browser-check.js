(() => {
  const dismissedKey = "givemeaiChromeNoticeDismissed";

  function hasDismissedNotice() {
    try {
      return sessionStorage.getItem(dismissedKey) === "1";
    } catch {
      return false;
    }
  }

  function rememberDismissedNotice() {
    try {
      sessionStorage.setItem(dismissedKey, "1");
    } catch {
      return;
    }
  }

  function isGoogleChrome() {
    const brands = navigator.userAgentData?.brands || [];
    if (brands.length > 0) {
      return brands.some((brand) => brand.brand === "Google Chrome");
    }

    const ua = navigator.userAgent || "";
    const isChromeLike = /Chrome\/|CriOS\//.test(ua);
    const isOtherChromium =
      /Edg\/|EdgiOS|OPR\/|Opera|SamsungBrowser|DuckDuckGo|HeadlessChrome|FBAN|FBAV|Instagram|Line\/|Twitter|FxiOS/.test(
        ua,
      );
    return isChromeLike && !isOtherChromium;
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
    if (isGoogleChrome() || hasDismissedNotice()) return;

    const overlay = document.createElement("div");
    overlay.className = "chrome-notice";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "chromeNoticeTitle");
    overlay.innerHTML = `
      <div class="chrome-notice__card">
        <button class="chrome-notice__close" type="button" aria-label="ปิด">x</button>
        <p class="chrome-notice__eyebrow">แนะนำให้เปิดด้วย Google Chrome</p>
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
      rememberDismissedNotice();
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
