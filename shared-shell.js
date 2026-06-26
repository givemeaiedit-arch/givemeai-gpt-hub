(() => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pageConfig = {
    "index.html": {
      searchId: "globalSearch",
      searchPlaceholder: "ค้นหาคอร์สเรียน, Prompt, เครื่องมือ AI...",
      searchLabel: "ค้นหา",
      active: "home",
    },
    "courses.html": {
      searchId: "courseSearch",
      searchPlaceholder: "ค้นหาคอร์สเรียน, บทเรียน, วิดีโอ...",
      searchLabel: "ค้นหาคอร์ส",
      active: "courses",
    },
    "articles.html": {
      searchId: "articleSearch",
      searchPlaceholder: "ค้นหาบทความ, เทคนิค, ชื่อ AI...",
      searchLabel: "ค้นหาบทความ",
      active: "articles",
    },
    "community.html": {
      searchId: "communitySearch",
      searchPlaceholder: "ค้นหากลุ่มเรียนรู้, คอร์ส, Facebook Community...",
      searchLabel: "ค้นหากลุ่มเรียนรู้",
      active: "community",
    },
    "changelog.html": {
      searchId: "changelogSearch",
      searchPlaceholder: "ค้นหาอัปเดตล่าสุด...",
      searchLabel: "ค้นหาอัปเดต",
      active: "home",
    },
    "prompts.html": {
      searchId: "promptShellSearch",
      searchPlaceholder: "ค้นหา Prompt เช่น ร้านอาหาร บ้าน รถ เสื้อผ้า...",
      searchLabel: "ค้นหา Prompt",
      active: "prompts",
    },
    "prompt-categories.html": {
      searchId: "promptCategoryShellSearch",
      searchPlaceholder: "ค้นหาหมวด Prompt...",
      searchLabel: "ค้นหาหมวด Prompt",
      active: "prompt-categories",
    },
    "tools.html": {
      searchId: "toolSearch",
      searchPlaceholder: "ค้นหาเครื่องมือ เช่น สร้างภาพโปรโมท, AI Check Ads...",
      searchLabel: "ค้นหาเครื่องมือ",
      active: "tools",
    },
    "topup.html": {
      searchId: "topupSearch",
      searchPlaceholder: "ค้นหาแพ็กเติมเงิน, Credit, Pro...",
      searchLabel: "ค้นหาแพ็กเติมเงิน",
      active: "topup",
    },
    "ai-check-ads.html": {
      searchId: "toolSearch",
      searchPlaceholder: "ค้นหาหน้าอื่นใน AI Hub...",
      searchLabel: "ค้นหา",
      active: "tools",
    },
    "promo-image.html": {
      searchId: "toolSearch",
      searchPlaceholder: "ค้นหาหน้าอื่นใน AI Hub...",
      searchLabel: "ค้นหา",
      active: "tools",
    },
    "profile.html": {
      searchId: "profileSearch",
      searchPlaceholder: "ค้นหาเมนูในโปรไฟล์...",
      searchLabel: "ค้นหาโปรไฟล์",
      active: "profile",
    },
    "leaderboard.html": {
      searchId: "leaderboardSearch",
      searchPlaceholder: "ดูอันดับผู้เรียน...",
      searchLabel: "ดูอันดับผู้เรียน",
      active: "leaderboard",
    },
    "admin.html": {
      searchId: "adminSearchInput",
      searchPlaceholder: "ค้นหาอีเมล ชื่อไฟล์ หรือชื่อสินค้า...",
      searchLabel: "ค้นหาใน Admin Panel",
      active: "admin",
    },
    "lesson-1.html": {
      searchId: "lessonSearch",
      searchPlaceholder: "ค้นหาบทเรียนหรือเนื้อหา...",
      searchLabel: "ค้นหาบทเรียน",
      active: "courses",
    },
    "lesson-2.html": {
      searchId: "lessonSearch",
      searchPlaceholder: "ค้นหาบทเรียนหรือเนื้อหา...",
      searchLabel: "ค้นหาบทเรียน",
      active: "courses",
    },
    "lesson-3.html": {
      searchId: "lessonSearch",
      searchPlaceholder: "ค้นหาบทเรียนหรือเนื้อหา...",
      searchLabel: "ค้นหาบทเรียน",
      active: "courses",
    },
  };

  const cfg = pageConfig[currentPage] || pageConfig["index.html"];

  function isActive(key) {
    return cfg.active === key ? " active" : "";
  }

  function sidebarHtml(sidebarClassName) {
    return `
      <aside class="${sidebarClassName}" aria-label="เมนูหลัก">
        <a class="brand" href="index.html" aria-label="GivemeAI">
          <strong>Giveme<span>AI</span></strong>
          <small>Learn • Prompt • Create</small>
        </a>

        <nav class="side-nav">
          <a class="nav-item${isActive("home")}" href="index.html"><span class="nav-icon">⌂</span>หน้าหลัก</a>

          <p class="nav-group">เรียนรู้ AI</p>
          <a class="nav-item${isActive("courses")}" href="courses.html"><span class="nav-icon">▱</span>คอร์สเรียนทั้งหมด</a>
          <a class="nav-item${isActive("articles")}" href="articles.html"><span class="nav-icon">▤</span>บทความ & เทคนิค</a>
          <a class="nav-item${isActive("community")}" href="community.html"><span class="nav-icon">◉</span>กลุ่มเรียนรู้</a>

          <p class="nav-group">คลัง Prompt</p>
          <a class="nav-item${isActive("prompts")}" href="prompts.html"><span class="nav-icon">▣</span>Prompt ยอดนิยม</a>
          <a class="nav-item${isActive("prompt-categories")}" href="prompt-categories.html"><span class="nav-icon">⌘</span>หมวดหมู่ Prompt</a>

          <p class="nav-group">เครื่องมือ AI</p>
          <a class="nav-item${isActive("tools")}" href="tools.html"><span class="nav-icon">◌</span>เครื่องมือทั้งหมด</a>

          <p class="nav-group">บัญชี</p>
          <a class="nav-item${isActive("profile")}" href="profile.html"><span class="nav-icon">♙</span>โปรไฟล์ของฉัน</a>
          <a class="nav-item${isActive("leaderboard")}" href="leaderboard.html"><span class="nav-icon">★</span>Leaderboard</a>
          <a class="nav-item admin-only${isActive("admin")}" href="admin.html?page=overview" hidden><span class="nav-icon">A</span>Admin Panel</a>
        </nav>

        <section class="upgrade-card" aria-label="อัปเกรดเป็น Pro">
          <div class="upgrade-title">♛ อัปเกรดเป็น Pro</div>
          <p>ปลดล็อกคอร์สพิเศษ ใช้งานเครื่องมือ AI ได้ลึกขึ้น และติดตามโปรไฟล์การเรียนของคุณในที่เดียว</p>
          <a class="orange-button" href="profile.html">ไปที่โปรไฟล์ <span>→</span></a>
        </section>
      </aside>
    `;
  }

  function mobileHeaderHtml() {
    return `
      <header class="mobile-header">
        <div class="brand mobile-brand">
          <strong>Giveme<span>AI</span></strong>
          <small>Learn • Prompt • Create</small>
        </div>
        <div class="mobile-actions">
          <button class="icon-button notification" type="button" aria-label="แจ้งเตือน">
            <img src="assets/Icon/asset_1x1_cropfix/asset_6-02-bell-silver.png" alt="" />
            <span>3</span>
          </button>
          <a class="mini-avatar" href="profile.html" aria-label="ไปที่โปรไฟล์">
            <img src="assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png" alt="" />
          </a>
          <button class="logout-chip mobile-logout" id="mobileLogoutButton" type="button" hidden>ออก</button>
        </div>
      </header>
    `;
  }

  function topbarHtml(topbarClassName) {
    return `
      <header class="${topbarClassName}">
        <label class="search-box">
          <span aria-hidden="true">⌕</span>
          <input id="${cfg.searchId}" type="search" placeholder="${cfg.searchPlaceholder}" aria-label="${cfg.searchLabel}" />
          <kbd>⌘ K</kbd>
        </label>

        <div class="top-actions">
          <button class="icon-button desktop-only" type="button" aria-label="โหมดกลางคืน">◐</button>
          <button class="icon-button notification desktop-only" type="button" aria-label="แจ้งเตือน">
            <img src="assets/Icon/asset_1x1_cropfix/asset_6-02-bell-silver.png" alt="" />
            <span>3</span>
          </button>

          <a class="soft-button admin-only top-admin-link" href="admin.html?page=overview" hidden>Admin Panel</a>

          <button class="login-chip" id="loginButton" type="button">
            <span>Login Gmail</span>
          </button>

          <div class="user-badge" id="userBadge" hidden>
            <img id="userAvatar" alt="" />
            <span>
              <strong id="userName">ผู้ใช้ Gmail</strong>
              <a id="userStatus" class="user-status-link" href="profile.html">เข้าสู่ระบบแล้ว</a>
            </span>
          </div>

          <button class="logout-chip" id="logoutButton" type="button" hidden>ออก</button>
        </div>
      </header>
    `;
  }

  function bottomNavHtml() {
    const item = (key, href, icon, label) =>
      `<a class="${cfg.active === key ? "active" : ""}" href="${href}"><span>${icon}</span>${label}</a>`;

    return `
      <nav class="bottom-nav" aria-label="เมนูมือถือ">
        ${item("home", "index.html", "⌂", "หน้าแรก")}
        ${item("courses", "courses.html", "▱", "คอร์ส")}
        ${item("articles", "articles.html", "▤", "บทความ")}
        ${item("community", "community.html", "◉", "กลุ่ม")}
        ${item("tools", "tools.html", "◇", "เครื่องมือ")}
        ${item("profile", "profile.html", "♙", "โปรไฟล์")}
      </nav>
    `;
  }

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.outerHTML = sidebarHtml(sidebar.className);
  }

  const main = document.querySelector(".main-content");
  if (!main) return;

  document.querySelectorAll(".side-nav").forEach((nav) => {
    if (nav.querySelector('a[href="topup.html"]')) return;
    const adminLink = nav.querySelector(".admin-only");
    const link = document.createElement("a");
    link.className = `nav-item${isActive("topup")}`;
    link.href = "topup.html";
    link.innerHTML = '<span class="nav-icon">฿</span>เติมเงิน';
    nav.insertBefore(link, adminLink || null);
  });

  const existingMobileHeader = main.querySelector(".mobile-header");
  if (existingMobileHeader) {
    existingMobileHeader.outerHTML = mobileHeaderHtml();
  } else {
    main.insertAdjacentHTML("afterbegin", mobileHeaderHtml());
  }

  const topbar = main.querySelector(".topbar");
  if (topbar) {
    topbar.outerHTML = topbarHtml(topbar.className);
  } else {
    const mobileHeader = main.querySelector(".mobile-header");
    if (mobileHeader) {
      mobileHeader.insertAdjacentHTML("afterend", topbarHtml("topbar"));
    } else {
      main.insertAdjacentHTML("afterbegin", topbarHtml("topbar"));
    }
  }

  if (!reducedMotion) {
    document.body.classList.add("page-motion");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("page-motion-ready");
      });
    });
  }

  const existingBottomNav = document.querySelector(".bottom-nav");
  if (existingBottomNav) {
    existingBottomNav.outerHTML = bottomNavHtml();
  } else {
    document.body.insertAdjacentHTML("beforeend", bottomNavHtml());
  }
})();
