(() => {
  const prompts = window.GIVEME_PROMPTS || [];
  const categories = window.GIVEME_PROMPT_CATEGORIES || [];
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const params = new URLSearchParams(window.location.search);
  const currentPage = window.location.pathname.split("/").pop() || "prompts.html";

  let activeCategory = params.get("category") || "all";
  let searchText = "";

  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  function getCategoryName(id) {
    return categoryMap.get(id)?.name || id;
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    return Promise.resolve();
  }

  function showToast(message) {
    const toast = document.querySelector("#promptToast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.hidden = true;
    }, 1800);
  }

  function promptMatches(prompt) {
    const keyword = searchText.trim().toLowerCase();
    const categoryOk = activeCategory === "all" || prompt.category === activeCategory;
    if (!categoryOk) return false;
    if (!keyword) return true;

    return [
      prompt.title,
      prompt.category,
      getCategoryName(prompt.category),
      prompt.businessType,
      prompt.summary,
      prompt.prompt,
      ...(prompt.tags || []),
    ]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  }

  function renderChips() {
    const chipRow = document.querySelector("#promptFilterChips");
    if (!chipRow) return;

    const allCount = prompts.length;
    const chipHtml = [
      `<button class="prompt-chip" type="button" data-category="all" aria-pressed="${activeCategory === "all"}">ทั้งหมด <span>${allCount}</span></button>`,
      ...categories.map((category) => {
        const isActive = activeCategory === category.id;
        return `<button class="prompt-chip" type="button" data-category="${escapeHtml(category.id)}" aria-pressed="${isActive}">${escapeHtml(category.name)} <span>${category.count}</span></button>`;
      }),
    ].join("");

    chipRow.innerHTML = chipHtml;
    chipRow.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category || "all";
        const nextUrl = new URL(window.location.href);
        if (activeCategory === "all") {
          nextUrl.searchParams.delete("category");
        } else {
          nextUrl.searchParams.set("category", activeCategory);
        }
        window.history.replaceState({}, "", nextUrl);
        renderPrompts();
      });
    });
  }

  function promptCard(prompt) {
    const category = categoryMap.get(prompt.category);
    return `
      <article class="prompt-card" data-prompt-id="${escapeHtml(prompt.id)}">
        <div class="prompt-card-cover">
          <img src="${escapeHtml(prompt.cover)}" alt="" loading="lazy" />
          <span>${escapeHtml(category?.name || prompt.businessType)}</span>
          ${prompt.featured ? "<b>แนะนำ</b>" : ""}
        </div>
        <div class="prompt-card-body">
          <small>${escapeHtml(prompt.businessType)}</small>
          <h3>${escapeHtml(prompt.title)}</h3>
          <p>${escapeHtml(prompt.summary)}</p>
          <div class="prompt-meta">
            <span>★ ${escapeHtml(prompt.rating)}</span>
            <span>${Number(prompt.uses || 0).toLocaleString("th-TH")} ใช้งาน</span>
          </div>
          <div class="prompt-tags">
            ${(prompt.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="prompt-card-actions">
            <button class="orange-button prompt-copy-button" type="button" data-copy-id="${escapeHtml(prompt.id)}">คัดลอก Prompt</button>
            <button class="soft-button prompt-detail-button" type="button" data-detail-id="${escapeHtml(prompt.id)}">ดูรายละเอียด</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderPrompts() {
    const grid = document.querySelector("#promptGrid");
    const empty = document.querySelector("#promptEmpty");
    const title = document.querySelector("#promptResultsTitle");
    const meta = document.querySelector("#promptResultsMeta");
    const total = document.querySelector("#promptTotal");
    if (!grid) return;

    const filtered = prompts.filter(promptMatches);
    if (total) total.textContent = String(prompts.length);
    if (title) title.textContent = activeCategory === "all" ? "ทั้งหมด" : getCategoryName(activeCategory);
    if (meta) meta.textContent = `พบ ${filtered.length.toLocaleString("th-TH")} Prompt จากทั้งหมด ${prompts.length.toLocaleString("th-TH")} รายการ`;

    grid.innerHTML = filtered.map(promptCard).join("");
    if (empty) empty.hidden = filtered.length > 0;

    grid.querySelectorAll("[data-copy-id]").forEach((button) => {
      button.addEventListener("click", async () => {
        const prompt = prompts.find((item) => item.id === button.dataset.copyId);
        if (!prompt) return;
        await copyText(prompt.prompt);
        showToast("คัดลอก Prompt แล้ว");
      });
    });

    grid.querySelectorAll("[data-detail-id]").forEach((button) => {
      button.addEventListener("click", () => openPromptDialog(button.dataset.detailId));
    });

    renderChips();
  }

  function openPromptDialog(id) {
    const prompt = prompts.find((item) => item.id === id);
    const dialog = document.querySelector("#promptDialog");
    const content = document.querySelector("#promptDialogContent");
    if (!prompt || !dialog || !content) return;

    content.innerHTML = `
      <div class="prompt-dialog-head">
        <span>${escapeHtml(getCategoryName(prompt.category))}</span>
        <h2>${escapeHtml(prompt.title)}</h2>
        <p>${escapeHtml(prompt.summary)}</p>
      </div>
      <div class="prompt-dialog-copy">
        <strong>Prompt พร้อมใช้</strong>
        <pre>${escapeHtml(prompt.prompt)}</pre>
      </div>
      <div class="prompt-dialog-actions">
        <button class="orange-button" id="promptDialogCopy" type="button">คัดลอก Prompt นี้</button>
        <a class="soft-button" href="prompts.html?category=${encodeURIComponent(prompt.category)}">ดูหมวดนี้</a>
      </div>
    `;

    content.querySelector("#promptDialogCopy")?.addEventListener("click", async () => {
      await copyText(prompt.prompt);
      showToast("คัดลอก Prompt แล้ว");
    });

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function renderCategories() {
    const grid = document.querySelector("#promptCategoryGrid");
    const total = document.querySelector("#categoryTotal");
    if (!grid) return;
    if (total) total.textContent = String(categories.length);

    grid.innerHTML = categories
      .map(
        (category) => `
          <a class="prompt-category-card" href="prompts.html?category=${encodeURIComponent(category.id)}">
            <span class="prompt-category-icon">${escapeHtml(category.icon)}</span>
            <small>${category.count} Prompt</small>
            <h2>${escapeHtml(category.name)}</h2>
            <p>${escapeHtml(category.useCase)}</p>
            <strong>เปิดหมวดนี้ →</strong>
          </a>
        `,
      )
      .join("");
  }

  function initSearch() {
    const inputs = [...document.querySelectorAll("#promptSearchInput, #promptShellSearch")];
    if (!inputs.length) return;
    inputs.forEach((search) => search.addEventListener("input", () => {
      searchText = search.value || "";
      inputs.forEach((input) => {
        if (input !== search) input.value = searchText;
      });
      renderPrompts();
    }));
  }

  document.querySelector("#promptDialogClose")?.addEventListener("click", () => {
    document.querySelector("#promptDialog")?.close?.();
  });

  document.querySelector("#promptDialog")?.addEventListener("click", (event) => {
    if (event.target.id === "promptDialog") {
      event.target.close?.();
    }
  });

  if (currentPage === "prompt-categories.html") {
    renderCategories();
  } else {
    initSearch();
    renderChips();
    renderPrompts();
  }
})();
