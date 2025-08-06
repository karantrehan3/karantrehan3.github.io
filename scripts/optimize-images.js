import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const optimizeImages = async () => {
  try {
    console.log("🖼️  Starting WebP conversion...");

    // Get all image files recursively
    const imageFiles = await imagemin(["public/assets/**/*.{jpg,jpeg,png}"], {
      plugins: [], // No optimization, just get the file list
    });

    console.log(`Found ${imageFiles.length} images to check`);

    let convertedCount = 0;
    let skippedCount = 0;

    // Convert each image to WebP while maintaining folder structure
    for (const file of imageFiles) {
      const relativePath = file.sourcePath.replace(process.cwd() + "/", "");
      const webpPath = relativePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      const webpFullPath = join(process.cwd(), webpPath);

      // Check if WebP version already exists
      if (fs.existsSync(webpFullPath)) {
        console.log(`⏭️  Skipped: ${relativePath} (WebP already exists)`);
        skippedCount++;
        continue;
      }

      // Create directory if it doesn't exist
      const webpDir = dirname(webpFullPath);
      if (!fs.existsSync(webpDir)) {
        fs.mkdirSync(webpDir, { recursive: true });
      }

      // Convert to WebP
      const webpFiles = await imagemin([file.sourcePath], {
        destination: dirname(webpFullPath),
        plugins: [
          imageminWebp({
            quality: 80,
            method: 6,
          }),
        ],
      });

      // Rename the output file to match the original structure
      if (webpFiles.length > 0) {
        const originalName = webpFiles[0].destinationPath;
        const newName = webpFullPath;

        if (originalName !== newName) {
          fs.renameSync(originalName, newName);
        }

        console.log(`✅ Converted: ${relativePath} → ${webpPath}`);
        convertedCount++;
      }
    }

    console.log("\n📊 WebP conversion complete!");
    console.log(`✅ Converted: ${convertedCount} images`);
    console.log(`⏭️  Skipped: ${skippedCount} images (already exist)`);
    console.log(
      "All WebP images created in the same folder structure as originals"
    );
    console.log(
      "Example: public/assets/dp/profile.jpg → public/assets/dp/profile.webp"
    );
  } catch (error) {
    console.error("❌ Error converting images:", error);
  }
};

optimizeImages();
