async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="event-name"]').value;
  const park_id = document.querySelector('input[name="event-location"]').value;
  const user_id = document.querySelector('input[name-"user-id"]').value;
  const description = document.querySelector(
    'input[name="event-description"]'
  ).value;

  const response = await fetch(`/api/event`, {
    method: "POST",
    body: JSON.stringify({
      title,
      park_id,
      user_id,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/event");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".add-event").addEventListener("submit", "/new-event");
document
  .querySelector(".new-event-form")
  .addEventListener("submit", newFormHandler);
