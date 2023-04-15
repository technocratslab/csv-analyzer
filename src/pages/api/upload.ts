import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const upload = multer({ // Disk Storage option
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

//const storage = multer.memoryStorage() // Memory Storage option pass along as stream
//const upload = multer({ storage: storage })

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `There was an error! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req: NextApiRequest & {
  file: Express.Multer.File;
}, res: NextApiResponse) => {
  res.status(200).json({ id: '12345', data: 'Success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};