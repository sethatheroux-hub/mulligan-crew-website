(() => {
  const supabaseUrl = "https://rxmxprqxyfemmwdppgyj.supabase.co";
  const supabasePublicKey = "sb_publishable_hKRNqafx1BM5YxkyPjZ3xQ_xPaXdH43";
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get("access_token") || "";
  const refreshToken = params.get("refresh_token") || "";
  const isRecovery = params.get("type") === "recovery" &&
    Boolean(accessToken) &&
    Boolean(refreshToken);
  const form = document.querySelector("#password-reset-form");
  const password = document.querySelector("#new-password");
  const confirmation = document.querySelector("#confirm-password");
  const submit = document.querySelector("#reset-submit");
  const status = document.querySelector("#reset-status");
  const success = document.querySelector("#reset-success");
  const invalid = document.querySelector("#reset-invalid");
  const steps = document.querySelector(".invite-steps");

  if (!isRecovery) {
    form.hidden = true;
    invalid.hidden = false;
    steps.hidden = true;
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.classList.remove("is-error", "is-success");

    if (password.value.length < 6) {
      status.textContent = "Use at least 6 characters.";
      status.classList.add("is-error");
      password.focus();
      return;
    }
    if (password.value !== confirmation.value) {
      status.textContent = "Those passwords do not match yet.";
      status.classList.add("is-error");
      confirmation.focus();
      return;
    }

    submit.disabled = true;
    submit.textContent = "Saving…";
    status.textContent = "Securely updating your password…";

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: "PUT",
        headers: {
          apikey: supabasePublicKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password.value }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const expired = response.status === 401 || response.status === 403;
        throw new Error(expired ? "This reset link has expired. Request a new email from Mulligan Crew." : (body.msg || body.error_description || "We could not update the password. Please try again."));
      }

      password.value = "";
      confirmation.value = "";
      form.hidden = true;
      success.hidden = false;
      steps.hidden = true;
      window.history.replaceState(null, "", window.location.pathname);
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "We could not update the password. Please try again.";
      status.classList.add("is-error");
      submit.disabled = false;
      submit.textContent = "Save new password";
    }
  });
})();
