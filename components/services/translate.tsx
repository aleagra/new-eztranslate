import config from "@/lib/config";

export async function translateText(text: string, target: string) {
  if (!text || text.trim().length === 0) return "";

  const url = config.REACT_APP_TRANSLATE;
  const body = {
    q: text,
    target: target,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": config.REACT_APP_KEY,
        "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return "Se alcanzó el límite de peticiones.";
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.translations?.translatedText || "";
  } catch (error: any) {
    console.error(error);
    return "Error translating text.";
  }
}
