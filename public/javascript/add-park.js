async function newParkHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="park-name"]').value;
  const location = document.querySelector('input[name="park-location"]').value;
  const activities = document.querySelector("#park-activities").value;

  const response = await fetch(`/api/park`, {
    method: "POST",
    body: JSON.stringify({
      name,
      location,
      activities,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-park-form")
  .addEventListener("submit", newParkHandler);
