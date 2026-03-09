import axios from "axios";
import config from "@/lib/config";

export async function translateText(text: string, target: string) {
  if (!text || text.trim().length === 0) return "";

  const options = {
    method: "POST",
    url: config.REACT_APP_TRANSLATE,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": config.REACT_APP_KEY,
      "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
    },
    data: {
      q: text,
      target: target,
    },
  };

  try {
    const response = await axios.request(options);

    return response?.data?.data?.translations?.translatedText || "";
  } catch (error: any) {
    if (error.response?.status === 429) {
      return "Se alcanzó el límite de peticiones. ";
    }

    console.error(error);
    return "Error translating text.";
  }
}
