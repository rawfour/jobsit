export const countPostedTime = (postedDate) => {
  const currentDate = new Date().getTime();
  const countedTime = currentDate - postedDate;
  let postedAt;

  let convertedTime = (countedTime / (1000 * 60)).toFixed(0) * 1;

  if (convertedTime < 1) {
    postedAt = 'less than 1min';
  } else if (convertedTime >= 1 && convertedTime < 60) {
    postedAt = `${convertedTime}min`;
  } else if (convertedTime >= 60 && convertedTime < 1440) {
    convertedTime = (convertedTime / 60).toFixed(0) * 1;
    postedAt = `${convertedTime}h`;
  } else if (convertedTime >= 1440 && convertedTime < 10080) {
    convertedTime = (convertedTime / 1440).toFixed(0) * 1;
    postedAt = `${convertedTime}d`;
  } else if (convertedTime >= 10090 && convertedTime < 40320) {
    convertedTime = (convertedTime / 10090).toFixed(0) * 1;
    postedAt = `${convertedTime}w`;
  } else if (convertedTime >= 40320 && convertedTime < 483840) {
    convertedTime = (convertedTime / 40320).toFixed(0) * 1;
    postedAt = `${convertedTime}m`;
  } else {
    convertedTime = (convertedTime / 483840).toFixed(0) * 1;
    postedAt = `${convertedTime}y`;
  }

  return `${postedAt} ago`;
};

export const firstLetterToUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
