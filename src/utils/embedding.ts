import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { v4 as uuidv4 } from 'uuid';
import { AiModel } from './query-data';

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
  // modelName: AiModel.textDavinci3
});

export const embedDocument = async (filename: string) => {

  const loader = new CSVLoader(filename);
  const document = await loader.load();
  // splitting text into chunks 
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });
  console.log('Splitting document into chunks...');

  const chunks = await splitter.splitDocuments(document);
  // create vectors
  console.log('Creating vectors...');
  // console.log('------------------ chunks --------------------');
  // console.log(JSON.stringify(chunks, null, 3));
  // console.log('----------------- chunks END -----------------');
  // return;
  const vectors = await HNSWLib.fromDocuments(chunks, embeddings);
  console.log('Saving vectors...');
  const id: string = uuidv4();
  const vectorPath = `vectors/${id}.vectors`;
  await vectors.save(vectorPath);
  console.log('Vectors saved!');
  return {
    id,
    vectorPath
  };
};