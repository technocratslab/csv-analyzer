import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { AiModel, answerWithChain, retrieveAnswer, retrieveAnswerByQARefineChain, retrieveAnswerByloadQAStuffChain } from '@/utils/query-data';


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


apiRoute.post(async (req: NextApiRequest & {
}, res: NextApiResponse) => {
  const id = req.body.id;
  // const { id, vectorPath } = await embedDocument(file.path);
  // console.log('------------------ { id, vectorPath } --------------------');
  // console.log(JSON.stringify({ id, vectorPath }, null, 3));
  // console.log('----------------- { id, vectorPath } END -----------------');
  // const id = 'd0f54a98-c681-4aa7-98db-26abfa9f1228';
  const vectorPath = `vectors/${id}.vectors`;
  const answer = await answerWithChain(vectorPath, req.body.question);
  res.status(200).json({ id: id, vectorPath, data: 'Success', queryResponse: answer });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};