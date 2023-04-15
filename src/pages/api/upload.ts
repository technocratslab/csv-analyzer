import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { embedDocument } from '@/utils/embedding';
import { AiModel, answerWithChain, retrieveAnswer, retrieveAnswerByQARefineChain, retrieveAnswerByloadQAStuffChain } from '@/utils/query-data';
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
  // console.log('------------------ { id, vectorPath } --------------------');
  // console.log(JSON.stringify({ id, vectorPath }, null, 3));
  // console.log('----------------- { id, vectorPath } END -----------------');
  const id = 'd0f54a98-c681-4aa7-98db-26abfa9f1228';
  const vectorPath = 'vectors/d0f54a98-c681-4aa7-98db-26abfa9f1228.vectors';
  await fs.unlink(file.path);
  const answer = await answerWithChain(vectorPath, req.body.question);
  res.status(200).json({ id: id, vectorPath, data: 'Success', queryResponse: answer });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};