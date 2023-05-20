const API_URL = "https://6467ba1760c8cb9a2c9bb3ba.mockapi.io/api/w12/events";

$.get(API_URL).then((data) => {
  data.map((event) => {
    $("tbody").append(
      $(`
      <tr>
        <td>${event.id}</td>
        <td>${event.eventDate}</td>
        <td>${event.eventName}</td>
        <td>${event.eventLocation}</td>
        <td><a href="${event.eventAlbumLink}">Album</a></td>
        <td>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            onclick="deleteEvent(${event.id})">
            🗑
          </button>
        </td>
      </tr>
      `)
    );
  });
});

$("#eventAdd").on("click", function () {
  $.post(API_URL, {
    eventDate: $("#eventDate").val(),
    eventName: $("#eventName").val(),
    eventLocation: $("#eventLocation").val(),
    eventAlbumLink: $("#eventAlbumLink").val(),
  });
});

function deleteEvent(id) {
  $.ajax(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

function updateEvent() {
  let id = $("#updateId").val();
  $.ajax(`${API_URL}/${id}`, {
    method: "PUT",
    data: {
      eventDate: $("#updateDate").val(),
      eventName: $("#updateName").val(),
      eventLocation: $("#updateLocation").val(),
      eventAlbumLink: $("#updateAlbumLink").val(),
    },
  });
}

$("#eventUpdate").on("click", updateEvent);