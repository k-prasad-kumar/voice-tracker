export const parseDueDate = (input: string) => {
  if (!input) return undefined;

  // Handle ISO format
  const iso = new Date(input);
  if (!isNaN(iso.getTime())) return iso;

  // Handle relative dates ("tomorrow", "in 3 days", "next monday")
  const today = new Date();

  input = input.toLowerCase();

  if (input === "tomorrow") {
    const d = new Date();
    d.setDate(today.getDate() + 1);
    return d;
  }

  if (input.startsWith("in ")) {
    const num = parseInt(input.split(" ")[1]);
    if (!isNaN(num)) {
      const d = new Date();
      d.setDate(today.getDate() + num);
      return d;
    }
  }

  if (input.startsWith("next ")) {
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const targetDay = weekdays.indexOf(input.replace("next ", ""));
    if (targetDay !== -1) {
      const d = new Date();
      const diff = (targetDay + 7 - today.getDay()) % 7 || 7;
      d.setDate(today.getDate() + diff);
      return d;
    }
  }

  return undefined;
};
