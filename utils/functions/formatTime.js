const formatTime = (time) => {
  const currentDate = new Date();
  const targetDate = new Date(time);
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerWeek = 7 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
  const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
  const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);

  if (yearsAgo > 0) {
    return yearsAgo + (yearsAgo === 1 ? ' year ago' : ' years ago');
  } else if (weeksAgo > 0) {
    return weeksAgo + (weeksAgo === 1 ? ' week ago' : ' weeks ago');
  } else if (daysAgo > 0) {
    return daysAgo + (daysAgo === 1 ? ' day ago' : ' days ago');
  } else {
    return 'a day ago';
  }
}

export default formatTime;
