import * as Location from 'expo-location';

// Area code to city mapping
const areaCodeToCity: Record<string, string> = {
  '813': 'Tampa',
  '407': 'Orlando',
  '305': 'Miami',
  // ...add more as needed
};

// Detect city by geolocation (preferred)
export async function detectCityByLocation(): Promise<string | null> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  let loc = await Location.getCurrentPositionAsync({});
  let geo = await Location.reverseGeocodeAsync(loc.coords);
  if (geo.length > 0 && geo[0].city) return geo[0].city;
  return null;
}

// Fallback: detect by phone area code (string)
export function detectCityByAreaCode(phone: string): string | null {
  // phone: "+1 813-555-1234" or "8135551234"
  let match = phone.replace(/\D/g, '').match(/^1?(\d{3})/);
  if (!match) return null;
  let code = match[1];
  return areaCodeToCity[code] || null;
}
