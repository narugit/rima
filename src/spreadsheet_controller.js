function checkSheet(sheet_name){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheet_name);
  const lastRow = sheet.getLastRow();
  const now = new Date();
  
  for(let i = 2; i <= lastRow; i++) {
    if(sheet.getRange(i, 2).getValue() === now.getHours() && sheet.getRange(i, 3).getValue() === now.getMinutes()){
      sendMessageInAllRooms(sheet.getRange(i, 1).getValue());
      break;
    }
  }
}