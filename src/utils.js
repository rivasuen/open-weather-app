import { WEATHER_ICON_URL } from "./api";

export const FormatDescription = (description) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

export const FormatWeatherIcon = (icon) => {
  return `${WEATHER_ICON_URL}/${icon}@2x.png`;
};

export const FormatDateTime = (timestamp, timezone, type) => {
  // Adjust timezone
  const currentLocalDate = new Date();
  timezone = currentLocalDate.getTimezoneOffset() * 60 + timezone;

  const new_date = new Date((timestamp + timezone) * 1000);
  const date = new_date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
  const time = new_date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (type == "date") {
    return date;
  } else if (type == "time") {
    return time;
  } else {
    return date + ", " + time;
  }
};

export const FormatTemp = (temp) => {
  return Math.round(temp) + "°C";
};

export const FormatPressure = (pressure) => {
  return pressure + " hPa";
};

export const FormatPercentage = (percentage) => {
  return percentage + "%";
};

export const FormatSpeed = (speed) => {
  return speed + " m/s W";
};
export const FormatVolume = (volume) => {
  return volume + " mm";
};

export const ConvertM2KM = (distance) => {
  return Math.round((distance / 1000) * 10) / 10 + " km";
};
