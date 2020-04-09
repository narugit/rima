function checkSchedule() {
  if (checkSheet("announce") === true) {
    setReplyFlag(false);
  }
  if (checkSheet("check") === true) {
    setReplyFlag(true);
  };
}

