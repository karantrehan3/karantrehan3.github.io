import fs from "fs";
import { glob } from "fs/promises";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const optimizeImages = async () => {
  try {
    console.log("🖼️  Starting WebP conversion...");

    const pattern = join(rootDir, "public/assets/**/*.{jpg,jpeg,png}");
    const imageFiles = [];
    for await (const file of glob(pattern)) {
      imageFiles.push(file);
    }

    console.log(`Found ${imageFiles.length} images to check`);

    let convertedCount = 0;
    let skippedCount = 0;

    for (const filePath of imageFiles) {
      const relativePath = relative(rootDir, filePath);
      const webpPath = relativePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      const webpFullPath = join(rootDir, webpPath);

      if (fs.existsSync(webpFullPath)) {
        console.log(`⏭️  Skipped: ${relativePath} (WebP already exists)`);
        skippedCount++;
        continue;
      }

      const webpDir = dirname(webpFullPath);
      if (!fs.existsSync(webpDir)) {
        fs.mkdirSync(webpDir, { recursive: true });
      }

      await sharp(filePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpFullPath);

      console.log(`✅ Converted: ${relativePath} → ${webpPath}`);
      convertedCount++;
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
