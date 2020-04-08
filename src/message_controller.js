function send(to_id, message) {
  const options = {
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    "method": "post",
    "payload": JSON.stringify({
      "to": to_id,
      "messages": [{
        "type": "text",
        "text": message,
      }],
    })
  };

  UrlFetchApp.fetch(PUSH_API_URL, options);

  return true;
}

function sendMessageInAllRooms(message) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("room");
  const last_row = sheet.getRange("A:A").getValues().filter(String).length;
  const room_id_list = sheet.getRange(2, 1, last_row - 1).getValues();

  room_id_list.filter(function (room_id) {
    send(room_id[0], message);
  });
}
