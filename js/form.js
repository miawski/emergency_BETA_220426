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
  summary.innerHTML += `<p><strong>Status:</strong> Report ready to be sent.</p>`;
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
    <h3>Summary</h3>
    <p><strong>Name:</strong> ${fullname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Incident type:</strong> ${incidentType}</p>
    <p><strong>Severity:</strong> ${severity}</p>
    <p><strong>Requested help:</strong> ${help}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Description:</strong> ${comment}</p>
  `;
}

function getErrorMessage(field) {
  if (field.name === "severity") {
    return "Choose how serious the incident was.";
  }

  const labelText =
    field.labels?.[0]?.textContent.replace("*", "").trim() || "This field";

  if (field.validity.valueMissing) {
    return `${labelText} is required.`;
  }

  if (field.validity.typeMismatch && field.type === "email") {
    return "Enter a valid email address.";
  }

  return `${labelText} is not filled out correctly.`;
}
