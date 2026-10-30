// Calendar utilities for Monika & Ritesh's Wedding

export function createGoogleCalendarUrl({
  title = "Wedding of Monika & Ritesh",
  description = "Join us to celebrate the wedding ceremony of Monika Pandit & Ritesh Ku. Pandit.",
  location = "Tatanagar, Jharkhand",
  startDate = "20261211T153000Z", // 9:00 PM IST = 15:30 UTC
  endDate = "20261211T213000Z",   // 3:00 AM IST next day
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: location,
    dates: `${startDate}/${endDate}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile({
  title = "Wedding of Monika Pandit & Ritesh Ku. Pandit",
  description = "Wedding ceremony & reception of Monika Pandit and Ritesh Ku. Pandit in Tatanagar, Jharkhand.",
  location = "Tatanagar, Jharkhand",
  startIso = "20261211T153000Z",
  endIso = "20261211T213000Z",
}) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Monika & Ritesh Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-monika-ritesh-${Date.now()}@weddinginvite`,
    `DTSTAMP:${startIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "monika-ritesh-wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
