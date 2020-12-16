import convertBufferToB64 from "../../utils/convertBufferToB64";
import { getImageTemplate } from "../../utils/getHtmlTemplates";
import { Image } from "../entities/Image";
import { Website } from "../entities/Website";

export const saveImage = async (url: string, buffer: Buffer) => {
  try {
    const image = new Image();
    image.data = buffer;
    image.createdAt = new Date();

    await Image.save(image);

    const foundSites = await findImageBySite(url);

    if (foundSites![0]) {
      foundSites![0].images.push(image);
      return await Website.save(foundSites![0]);
    }

    const newSite = new Website();
    newSite.url = url;
    newSite.images = [image];
    return await Website.save(newSite);
  } catch (e) {
    console.log(e);
  }
};

export const findImageBySite = async (url: string) => {
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

export const findImageById = async (id: string) => {
  try {
    return await Image.find({ where: { id }, take: 1 });
  } catch (e) {
    console.log(e);
  }
};

export const createImageTemplate = async (id: string) => {
  const found = await findImageById(id);
  if (found![0]) {
    const buffer = found![0].data;
    const base64String = await convertBufferToB64(buffer, {});
    return getImageTemplate(base64String);
  }
  return;
};
