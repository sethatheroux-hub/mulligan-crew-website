(() => {
  const params = new URLSearchParams(window.location.search);
  const normalizeJoinCode = (value) => (value || "").replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase();
  const normalizeClaimCode = (value) => (value || "").replace(/[^a-f0-9]/gi, "").slice(0, 12).toUpperCase();
  const golferCode = normalizeClaimCode(params.get("golferCode"));
  const joinCode = normalizeJoinCode(params.get("joinCode"));

  const title = document.querySelector("#invite-title");
  const description = document.querySelector("#invite-description");
  const codeWrap = document.querySelector("#invite-code-wrap");
  const codeLabel = document.querySelector("#invite-code-label");
  const code = document.querySelector("#invite-code");
  const openApp = document.querySelector("#open-app");
  const note = document.querySelector("#invite-note");

  let route = "mulligan-crew://crews";
  let visibleCode = "";

  if (golferCode.length === 12) {
    title.textContent = "Your Crew golfer spot is waiting.";
    description.textContent = "Your Captain already added your name, Crew HCP, rounds, and history. Open Mulligan Crew to claim that exact golfer spot.";
    codeLabel.textContent = "Golfer invitation code";
    visibleCode = golferCode;
    route += `?golferCode=${encodeURIComponent(golferCode)}`;
  } else if (joinCode.length === 8) {
    title.textContent = "You’re invited to a golf Crew.";
    description.textContent = "Open Mulligan Crew to join the clubhouse and keep rounds, Seasons, standings, and stories together.";
    codeLabel.textContent = "Crew code";
    visibleCode = joinCode;
    route += `?joinCode=${encodeURIComponent(joinCode)}`;
  } else {
    title.textContent = "This invitation needs a fresh link.";
    description.textContent = "Ask the Crew Captain to share the invitation again. If you already have an eight-character Crew code, enter it from the Crews tab in Mulligan Crew.";
    openApp.textContent = "Open Mulligan Crew";
    note.textContent = "No Crew data was changed. A fresh invitation from the Captain will take you to the right place.";
  }

  if (visibleCode) {
    code.textContent = visibleCode;
    codeWrap.hidden = false;
  }
  openApp.href = route;
})();
