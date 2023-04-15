import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { embedDocument } from '@/utils/embedding';
import { AiModel, retrieveAnswer, retrieveAnswerByQARefineChain, retrieveAnswerByloadQAStuffChain } from '@/utils/query-data';
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

apiRoute.post(async (req: NextApiRequest & {
  file: Express.Multer.File;
}, res: NextApiResponse) => {
  const file = req.file;
  // const { id, vectorPath } = await embedDocument(file.path);
  const id = '7d85a79d-57d3-44af-9d9e-9f343efe1f62';
  const vectorPath = 'vectors/7d85a79d-57d3-44af-9d9e-9f343efe1f62.vectors';
  await fs.unlink(file.path);
  console.log('------------------ req.body.question --------------------');
  console.log(JSON.stringify(req.body.question, null, 3));
  console.log('----------------- req.body.question END -----------------');
  const answer = await retrieveAnswerByloadQAStuffChain(vectorPath, req.body.question, AiModel.textDavinci3);
  res.status(200).json({ id: id, vectorPath, data: 'Success', queryResponse: answer });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};