import { watchAuth } from "./auth-shared.js";
import { getLeaderboard } from "./profile-store.js";

const leaderboardBody = document.querySelector("#leaderboardBody");
const leaderboardEmpty = document.querySelector("#leaderboardEmpty");
const leaderboardStatus = document.querySelector("#leaderboardStatus");
const podium = document.querySelector("#leaderboardPodium");

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function renderPodium(items) {
  if (!podium) return;

  if (!items.length) {
    podium.innerHTML = "";
    return;
  }

  podium.innerHTML = items
    .slice(0, 3)
    .map(
      (entry, index) => `
        <article class="podium-card">
          <span class="podium-rank">#${index + 1}</span>
          <img src="${entry.photoURL}" alt="${entry.displayName}" />
          <strong>${entry.displayName}</strong>
          <b>${entry.totalPoints} คะแนน</b>
          <small>${entry.lessonsCompleted} บทเรียน</small>
        </article>
      `,
    )
    .join("");
}

function renderTable(items) {
  if (!leaderboardBody || !leaderboardEmpty) return;

  if (!items.length) {
    leaderboardBody.innerHTML = "";
    leaderboardEmpty.hidden = false;
    return;
  }

  leaderboardEmpty.hidden = true;
  leaderboardBody.innerHTML = items
    .map(
      (entry, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>
            <div class="leaderboard-user">
              <img src="${entry.photoURL}" alt="${entry.displayName}" />
              <div>
                <strong>${entry.displayName}</strong>
                <small>ล่าสุด: ${entry.latestLesson || "-"}</small>
              </div>
            </div>
          </td>
          <td>${entry.lessonsCompleted}</td>
          <td>${entry.totalPoints}</td>
          <td>${formatDate(entry.lastScoredAt)}</td>
        </tr>
      `,
    )
    .join("");
}

async function loadLeaderboard(user) {
  if (!leaderboardStatus) return;

  if (!user) {
    leaderboardStatus.textContent = "เข้าสู่ระบบก่อนเพื่อดูตารางคะแนน";
    renderPodium([]);
    renderTable([]);
    return;
  }

  leaderboardStatus.textContent = "กำลังโหลดตารางคะแนน...";
  const items = await getLeaderboard();
  renderPodium(items);
  renderTable(items);
  leaderboardStatus.textContent = items.length ? `ผู้เรียนทั้งหมด ${items.length} คน` : "ยังไม่มีผู้รับคะแนน";
}

watchAuth(({ user }) => {
  loadLeaderboard(user);
});
