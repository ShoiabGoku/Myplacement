/** Rotating motivational quotes shown on the dashboard (one per day). */
export const QUOTES: { text: string; author: string }[] = [
  { text: "The rocket worked perfectly, except for landing on the wrong planet.", author: "Wernher von Braun" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "Failure is an option here. If things are not failing, you are not innovating enough.", author: "Elon Musk" },
  { text: "Aim for the sky, but move slowly, enjoying every step along the way.", author: "A.P.J. Abdul Kalam" },
  { text: "Dream is not that which you see while sleeping; it is something that does not let you sleep.", author: "A.P.J. Abdul Kalam" },
  { text: "The engineer has been, and is, a maker of history.", author: "James Kip Finch" },
  { text: "Scientists dream about doing great things. Engineers do them.", author: "James A. Michener" },
  { text: "It's kind of fun to do the impossible.", author: "Walt Disney" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln (attr.)" },
  { text: "That's one small step for man, one giant leap for mankind.", author: "Neil Armstrong" },
  { text: "What one man calls luck is really preparation meeting opportunity.", author: "Seneca (paraphrase)" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Per aspera ad astra — through hardships to the stars.", author: "Latin proverb" },
];

/** Deterministic quote of the day. */
export function quoteOfTheDay(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86400000);
  return QUOTES[dayIndex % QUOTES.length];
}
