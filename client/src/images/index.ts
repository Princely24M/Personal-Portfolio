/**
 * Client-facing image catalog entry point.
 *
 * The shared manifest remains at the project root so the server and client use
 * the same storage mapping. Import image paths from this module in UI code.
 */
export { imagePath, imageStorageKeys } from "../../../images/manifest";
export type { ImagePath } from "../../../images/manifest";
