import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import multer from "multer";

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only image files
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG and PNG are allowed."));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // API endpoint for uploading images
  app.post("/api/upload", upload.single("background"), (req: Request, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Convert the file to base64
      const base64Data = file.buffer.toString("base64");
      const mimeType = file.mimetype;
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return res.status(200).json({
        message: "File uploaded successfully",
        fileUrl: dataUrl,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        message: "Error uploading file",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}