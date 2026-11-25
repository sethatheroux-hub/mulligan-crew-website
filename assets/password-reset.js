(() => {
  const openApp = document.querySelector("#open-app");
  const title = document.querySelector("#reset-title");
  const description = document.querySelector("#reset-description");
  const note = document.querySelector("#reset-note");
  const params = new URLSearchParams(window.location.hash.slice(1));
  const isRecovery = params.get("type") === "recovery" &&
    Boolean(params.get("access_token")) &&
    Boolean(params.get("refresh_token"));

  if (isRecovery) {
    openApp.href = `mulligan-crew:///reset-password${window.location.hash}`;
    return;
  }

  title.textContent = "This password-reset link is invalid or expired.";
  description.textContent = "Return to Mulligan Crew, choose “I already have an account,” and request a new reset email.";
  note.textContent = "No account information was changed.";
  openApp.href = "mulligan-crew:///reset-password";
  openApp.textContent = "Return to Mulligan Crew";
})();
