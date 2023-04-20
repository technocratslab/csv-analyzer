import nextConnect from "next-connect";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { embedDocument } from "@/utils/embedding";

const upload = multer({
  // Disk Storage option
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `There was an error! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(
  async (
    req: NextApiRequest & {
      file: Express.Multer.File;
    },
    res: NextApiResponse
  ) => {
    const file = req.file;
    const { id, vectorPath } = await embedDocument(file.path);
    await fs.unlink(file.path);
    res.status(200).json({ id: id, vectorPath, data: "Success" });
  }
);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
