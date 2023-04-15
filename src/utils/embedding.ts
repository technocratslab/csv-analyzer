import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { v4 as uuidv4 } from 'uuid';
import { AiModel } from './query-data';

export const embedDocument = async (filename: string) => {

  // const loader = new CSVLoader(filename);
  // const document = await loader.load();
  const csvText = await fs.readFile(filename, "utf8");

  // splitting text into chunks 
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200
  });
  console.log('Splitting document into chunks...');
  const docs = await textSplitter.createDocuments([csvText]);
  // create vectors
  console.log('Creating vectors...');
  console.log('------------------ chunks --------------------');
  console.log(JSON.stringify(docs, null, 3));
  console.log('----------------- chunks END -----------------');
  // return;
  const vectors = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
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