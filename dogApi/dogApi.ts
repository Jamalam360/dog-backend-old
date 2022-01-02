export const getRandomImage = async (): Promise<string> => {
  const req = await fetch("https://dog.jamalam.tech/api/v0/breeds/images/random");
  const json = await req.json();
  return json.message;
};