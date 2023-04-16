import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

interface CustomNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

export default async function uploadCSV(req: CustomNextApiRequest, res: NextApiResponse) {
  try {
    await upload.single('file')(req, res, async () => {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Please upload a CSV file' });
      }

      const fileContent = file.buffer.toString('utf-8');

      return res.status(200).json({
        fileId: '123456',
        data: fileContent,
      });
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}