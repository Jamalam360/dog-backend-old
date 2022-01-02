import { sleep } from "https://deno.land/x/sleep/mod.ts";

export const getRandomImage = async (): Promise<string> => {
  try {
    const req = await fetch(
      "https://dog.jamalam.tech/api/v0/breeds/images/random",
    );
    const json = await req.json();
    return json.message;
  } catch (_e) {
    console.log("Dog API Is Still Booting Up!");
    await sleep(2.5);
    return getRandomImage();
  }
};
