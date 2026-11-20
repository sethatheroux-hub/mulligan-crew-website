(() => {
  const params = new URLSearchParams(window.location.search);
  const normalizeJoinCode = (value) => (value || "").replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
  const normalizeClaimCode = (value) => (value || "").replace(/[^a-f0-9]/gi, "").slice(0, 12).toUpperCase();
  const memberCode = normalizeClaimCode(params.get("memberCode"));
  const scorerCode = normalizeClaimCode(params.get("scorerCode"));
  const joinCode = normalizeJoinCode(params.get("joinCode"));

  const title = document.querySelector("#invite-title");
  const description = document.querySelector("#invite-description");
  const codeWrap = document.querySelector("#invite-code-wrap");
  const codeLabel = document.querySelector("#invite-code-label");
  const code = document.querySelector("#invite-code");
  const openApp = document.querySelector("#open-app");
  const note = document.querySelector("#invite-note");

  let route = "mulligan-crew://trips";
  let visibleCode = "";

  if (memberCode.length === 12) {
    title.textContent = "Your golfer spot is waiting.";
    description.textContent = "The organizer already added your name, Trip HCP, tee times, and golfer history. Open Mulligan Crew to claim that exact spot.";
    codeLabel.textContent = "Golfer invitation code";
    visibleCode = memberCode;
    route += `?memberCode=${encodeURIComponent(memberCode)}`;
  } else if (scorerCode.length === 12) {
    title.textContent = "Your scorekeeper spot is waiting.";
    description.textContent = "Open Mulligan Crew with this invitation to connect the golfer identity and tee times the organizer assigned to you.";
    codeLabel.textContent = "Scorekeeper invitation code";
    visibleCode = scorerCode;
    route += `?scorerCode=${encodeURIComponent(scorerCode)}`;
  } else if (joinCode.length === 6) {
    title.textContent = "You’re invited to a golf Trip.";
    description.textContent = "Open Mulligan Crew to join the Trip clubhouse, follow the plan, and keep the group’s rounds and stories together.";
    codeLabel.textContent = "Trip code";
    visibleCode = joinCode;
    route += `?joinCode=${encodeURIComponent(joinCode)}`;
  } else {
    title.textContent = "This invitation needs a fresh link.";
    description.textContent = "Ask the Trip organizer to share the invitation again. If you already have a six-character Trip code, you can enter it from the Trips tab in Mulligan Crew.";
    openApp.textContent = "Open Mulligan Crew";
    note.textContent = "No Trip data was changed. A fresh invitation from the organizer will take you to the right place.";
  }

  if (visibleCode) {
    code.textContent = visibleCode;
    codeWrap.hidden = false;
  }
  openApp.href = route;
})();
