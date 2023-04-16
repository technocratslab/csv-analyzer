import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { answerWithChain } from "@/utils/query-data";

export const config = {
  api: {
    bodyParser: true,
  },
};

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
  const payload = JSON.parse(req.body);
  const answer = await answerWithChain(vectorPath, payload.question);
  res.status(200).json({ id: id, queryResponse: answer });
});

export default apiRoute;

