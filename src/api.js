function doPost(e) {
  const json = JSON.parse(e.postData.contents);

  const reply_token = json.events[0].replyToken;
  if (reply_token === undefined) {
    return;
  }

  const user_message = json.events[0].message.text;

  if (user_message === "リマ登録") {
    if (json.events[0].source.type === "room") {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadsheet.getSheetByName("room");
      const last_row = sheet.getRange("A:A").getValues().filter(String).length;
      const room_id = json.events[0].source.roomId;

      // 登録済みでない場合のみ登録する
      if (last_row === 1) {
        sheet.getRange(last_row + 1, 1).setValue(room_id);
        send(room_id, "このトークで活躍するね！");
      } else {
        for (var i = 2; i <= last_row; i++) {
          if (sheet.getRange(i, 1).getValue() === room_id) {
            break;
          }
          if (i == last_row) {
            sheet.getRange(last_row + 1, 1).setValue(room_id);
            send(room_id, "このトークで活躍するね！");
          }
        }
      }
    }
  }

  if (user_message === "リマばいばい") {
    if (json.events[0].source.type === "room") {
      const room_id = json.events[0].source.roomId;
      send(room_id, "ばいばい！")

      const options = {
        "headers": {
          "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        "method": "post",
      };

      UrlFetchApp.fetch(BASE_API_URL + room_id + "/leave", options);

      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadsheet.getSheetByName("room");
      const last_row = sheet.getRange("A:A").getValues().filter(String).length;

      for (let i = 2; i <= last_row; i++) {
        if (sheet.getRange(i, 1).getValue() === room_id) {
          sheet.deleteRows(i, 1);
          break;
        }
      }
    }
  }

  if (user_message === "👌") {
    if (getReplyFlag() === true) {
      if (json.events[0].source.type === "room") {
        const room_id = json.events[0].source.roomId;
        send(room_id, "ナイス換気だよ👏");
      }
    } else if (getReplyFlag() === false) {
      const room_id = json.events[0].source.roomId;
      send(room_id, "時間がくるまで換気してね！");
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ "content": "post ok" })).setMimeType(ContentService.MimeType.JSON);
}

