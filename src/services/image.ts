import convertBufferToB64 from "../utils/convertBufferToB64";
import { getImageTemplate } from "../utils/getHtmlTemplates";
import { Image } from "../entities/Image";
import { Website } from "../entities/Website";
import Logger from "../loaders/logger";
/**
 * @function saveImage
 * @param url
 * @param buffer
 * saves image in the database
 */
export const saveImage = async (url: string, buffer: Buffer) => {
  try {
    const image = new Image();
    image.data = buffer;
    image.createdAt = new Date();

    await Image.save(image);

    const foundSites = await findWebisteByUrl(url);

    if (foundSites![0]) {
      foundSites![0].images.push(image);
      return await Website.save(foundSites![0]);
    }

    const newSite = new Website();
    newSite.url = url;
    newSite.images = [image];
    return await Website.save(newSite);
  } catch (e) {
    Logger.error(e.message);
    throw new Error(e);
  }
};

/**
 * @function findWebisteByUrl
 * @param url
 * Finds websites by their url
 * @returs Webstie[]
 */
export const findWebisteByUrl = async (url: string) => {
  return await Website.find({
    relations: ["images"],
    take: 1,
    where: { url },
    order: { id: "DESC" },
  });
};

/**
 * @function findImageById
 * @param id
 * finds Image by it's id
 */
export const findImageById = async (id: string) => {
  return await Image.find({ relations: ["website"], where: { id }, take: 1 });
};

/**
 * @function createImageTemplate
 * @param id
 * creates html template for the image
 */
export const createImageTemplate = async (id: string) => {
  try {
    const found = await findImageById(id);
    if (found![0]) {
      const buffer = found![0].data;
      const websiteUrl = found![0].website.url;
      const base64String = convertBufferToB64(buffer);
      return getImageTemplate(base64String, websiteUrl);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
