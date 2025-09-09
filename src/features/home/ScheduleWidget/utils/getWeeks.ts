const getWeeks = (): Date[] => {
  const result: Date[] = [];

  const today = new Date();
  const dayNumber = today.getDay();

  today.setDate(today.getDate() - dayNumber - 1);

  for (let i = 0; i < 7; i++) {
    result.push(new Date(today.setDate(today.getDate() + 1)));
  }

  return result;
};

export default getWeeks;
