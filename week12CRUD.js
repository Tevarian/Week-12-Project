const API_URL = "https://6467ba1760c8cb9a2c9bb3ba.mockapi.io/api/w12/events"

function getDataAndRenderTable () {
  $.get(API_URL).then((data) => {
    $("tbody").empty()
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
              class="btn btn-primary btn-sm"
              onclick="deleteEvent(${event.id})">
              🗑
            </button>
          </td>
        </tr>
        `)
      )
    })
  })
}

getDataAndRenderTable()

$("#eventAdd").on("click", (event) => {
  event.preventDefault()
  $.post(API_URL, {
    eventDate: $("#eventDate").val(),
    eventName: $("#eventName").val(),
    eventLocation: $("#eventLocation").val(),
    eventAlbumLink: $("#eventAlbumLink").val(),
  }).then(getDataAndRenderTable)
  $('#eventForm')[0].reset();
})

$("#eventUpdate").on("click", (event) => {
  event.preventDefault()
  let id = $("#updateId").val()
  $.ajax(`${API_URL}/${id}`, {
    method: "PUT",
    data: {
      eventDate: $("#updateDate").val(),
      eventName: $("#updateName").val(),
      eventLocation: $("#updateLocation").val(),
      eventAlbumLink: $("#updateAlbumLink").val(),
    },
  }).then(getDataAndRenderTable)
  $('#eventUpdateForm')[0].reset();
})

function deleteEvent(id) {
  $.ajax(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(getDataAndRenderTable)
}