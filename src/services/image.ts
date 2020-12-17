import convertBufferToB64 from "../utils/convertBufferToB64";
import { getImageTemplate } from "../utils/getHtmlTemplates";
import { Image } from "../entities/Image";
import { Website } from "../entities/Website";

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
    console.log(e);
  }
};

/**
 * @function findWebisteByUrl
 * @param url
 * Finds websites by their url
 * @returs Webstie[]
 */
export const findWebisteByUrl = async (url: string) => {
  try {
    return await Website.find({
      relations: ["images"],
      take: 1,
      where: { url },
    });
  } catch (e) {
    //TODO: handle this error better
    // idea, look for the error code and interpert the possible scinario
    throw new Error(e);
  }
};

/**
 * @function findImageById
 * @param id
 * finds Image by it's id
 */
export const findImageById = async (id: string) => {
  try {
    return await Image.find({ relations: ["website"], where: { id }, take: 1 });
  } catch (e) {
    console.log(e);
  }
};

/**
 * @function createImageTemplate
 * @param id
 * creates html template for the image
 */
export const createImageTemplate = async (id: string) => {
  console.log("it has been called");
  const found = await findImageById(id);
  if (found![0]) {
    const buffer = found![0].data;
    const websiteUrl = found![0].website.url;
    const base64String = await convertBufferToB64(buffer);
    return getImageTemplate(base64String, websiteUrl);
  }
  return;
};
