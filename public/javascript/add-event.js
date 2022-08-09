async function newFormHandler(event) {
  event.preventDefaul();

  const title = document.querySelector('input[name="event-title"]').value;
  const park = document.querySelector('input[name="park-name"]').value;
  const activities = document.querySelector('input[name="activities"]').value;
  const description = document.querySelector(
    'input[name="event-description"]'
  ).value;
  const response = await fetch(`/api/events`, {
    method: "POST",
    body: JSON.stringify({
      title,
      park,
      activities,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/events");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-event-form")
  .addEventListener("submit", newFormHandler);
