const form = document.querySelector("#webform");
const summary = document.querySelector("#form-summary article");
const errorBox = document.querySelector("#form-errors");

if (form && summary && errorBox) {
  form.addEventListener("input", handleLiveUpdate);
  form.addEventListener("change", handleLiveUpdate);
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("invalid", handleInvalid, true);
}

function handleLiveUpdate(event) {
  errorBox.textContent = "";

  if (event.target.willValidate) {
    event.target.setAttribute(
      "aria-invalid",
      String(!event.target.validity.valid),
    );
  }

  updateSummary();
}

function handleInvalid(event) {
  event.preventDefault();

  const field = event.target;
  field.setAttribute("aria-invalid", "true");
  errorBox.textContent = getErrorMessage(field);
}

function handleSubmit(event) {
  event.preventDefault();
  errorBox.textContent = "";

  if (!form.checkValidity()) {
    return;
  }

  updateSummary();
  summary.innerHTML += `<p><strong>Status:</strong> Indberetning klar til at blive sendt.</p>`;
}

function updateSummary() {
  const formData = new FormData(form);

  const fullname = formData.get("fullname") || "—";
  const email = formData.get("email") || "—";
  const phone = formData.get("phone") || "—";
  const incidentType = formData.get("incident-type") || "—";
  const severity = formData.get("severity") || "—";
  const help = formData.getAll("help").join(", ") || "—";
  const date = formData.get("date") || "—";
  const location = formData.get("location") || "—";
  const comment = formData.get("comment") || "—";

  summary.innerHTML = `
    <h3>Opsummering</h3>
    <p><strong>Navn:</strong> ${fullname}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Type:</strong> ${incidentType}</p>
    <p><strong>Alvorlighed:</strong> ${severity}</p>
    <p><strong>Ønskes hjælp til:</strong> ${help}</p>
    <p><strong>Dato:</strong> ${date}</p>
    <p><strong>Sted:</strong> ${location}</p>
    <p><strong>Beskrivelse:</strong> ${comment}</p>
  `;
}

function getErrorMessage(field) {
  if (field.name === "severity") {
    return "Vælg hvor alvorlig hændelsen var.";
  }

  const labelText =
    field.labels?.[0]?.textContent.replace("*", "").trim() || "Feltet";

  if (field.validity.valueMissing) {
    return `${labelText} skal udfyldes.`;
  }

  if (field.validity.typeMismatch && field.type === "email") {
    return "Indtast en gyldig e-mailadresse.";
  }

  return `${labelText} er ikke udfyldt korrekt.`;
}
