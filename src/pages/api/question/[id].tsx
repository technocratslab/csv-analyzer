import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { answerWithChain } from "@/utils/query-data";

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `There was an error! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req: NextApiRequest & {}, res: NextApiResponse) => {
  const id = req.query.id;
  const vectorPath = `vectors/${id}.vectors`;
  // const { id, vectorPath } = await embedDocument(file.path);
  // console.log('------------------ { id, vectorPath } --------------------');
  // console.log(JSON.stringify({ id, vectorPath }, null, 3));
  // console.log('----------------- { id, vectorPath } END -----------------');
  // const id = 'd0f54a98-c681-4aa7-98db-26abfa9f1228';
  const answer = await answerWithChain(vectorPath, req.body.question);
  res.status(200).json({ id: id, queryResponse: answer });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
