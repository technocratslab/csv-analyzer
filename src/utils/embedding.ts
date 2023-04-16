import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { v4 as uuidv4 } from 'uuid';
import { EmbeddingAIModel } from './types';

export const embedDocument = async (filename: string, aiModel: EmbeddingAIModel = EmbeddingAIModel.adaEmbedding) => {
  const csvText = await fs.readFile(filename, "utf8");

  // splitting text into chunks 
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200
  });
  console.log('Splitting document into chunks...');
  // create document
  const docs = await textSplitter.createDocuments([csvText]);
  console.log('Creating vectors...');

  // create vectors
  const embeddingInstance = new OpenAIEmbeddings({ modelName: aiModel });
  const vectors = await HNSWLib.fromDocuments(docs, embeddingInstance);
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