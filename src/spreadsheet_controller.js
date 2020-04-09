function checkSheet(sheet_name) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheet_name);
  const last_row = sheet.getLastRow();
  const now = new Date();

  for (let i = 2; i <= last_row; i++) {
    if (sheet.getRange(i, 2).getValue() === now.getHours() && sheet.getRange(i, 3).getValue() === now.getMinutes()) {
      sendMessageInAllRooms(sheet.getRange(i, 1).getValue());
      return true;
    }
  }

  return false;
}

function setReplyFlag(value) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("check");
  const last_column = sheet.getLastColumn();

  for (let i = 1; i <= last_column; i++) {
    if (sheet.getRange(1, i).getValue() === "flag") {
      sheet.getRange(2, i).setValue(value);
      return true;
    }
  }

  return false;
}

function getReplyFlag() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("check");
  const last_column = sheet.getLastColumn();

  for (let i = 1; i <= last_column; i++) {
    if (sheet.getRange(1, i).getValue() === "flag") {
      return sheet.getRange(2, i).getValue();
    }
  }

  return undefined;
}

