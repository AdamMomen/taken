import { Image } from "../entities/Image";
import { Website } from "../entities/Website";

export const saveImage = async (url: string, buffer: Buffer) => {
  try {
    const image = new Image();
    image.data = buffer;
    image.createdAt = new Date();
    await Image.save(image);

    const foundSites = findImage(url);

    if (foundSites[0]) {
      foundSites[0].images.push(image);
      return await Website.save(foundSites[0]);
    }

    const newSite = new Website();
    newSite.url = url;
    newSite.images = [image];
    return await Website.save(newSite);
  } catch (e) {
    console.log(e);
  }
};

export const findImage = async (url: string) => {
  try {
    const found = await Website.find({
      relations: ["images"],
      take: 1,
      where: { url },
    });
    return found;
  } catch (e) {
    console.log(e);
  }
};
