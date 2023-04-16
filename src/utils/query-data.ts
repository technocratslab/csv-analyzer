import { OpenAI } from "langchain/llms/openai";
import {
  RetrievalQAChain,
  loadQAMapReduceChain,
  loadQARefineChain,
} from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { CompletionAIModel } from "./types";

const getStore = async (dirPath: string): Promise<HNSWLib> => {
  const embeddings = new OpenAIEmbeddings();

  // Load the documents and create the vector store
  const store = await HNSWLib.load(dirPath, embeddings);
  return store;
};
// RetrievalQAChain
export const retrieveAnswerRetrievalQAChain = async (
  dirPath: string,
  prompt: string,
  aiModel: CompletionAIModel = CompletionAIModel.gptTurbo
) => {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: aiModel,
  });

  console.log("created model");
  const loadedVectorStore = await getStore(dirPath);
  console.log("loaded vector store");

  const vectorRetriever = await loadedVectorStore.asRetriever();
  const chain = RetrievalQAChain.fromLLM(model, vectorRetriever);
  const res = await chain.call({
    query: prompt,
  });
  return res;
};

// loadQARefineChain
export const retrieveAnswerByQARefineChain = async (
  dirPath: string,
  prompt: string,
  aiModel: CompletionAIModel = CompletionAIModel.gptTurbo
) => {
  const embeddings = new OpenAIEmbeddings();
  const model = new OpenAI({});
  const chain = loadQARefineChain(model);

  // Load the documents and create the vector store
  const store = await HNSWLib.load(dirPath, embeddings);

  // Select the relevant documents
  const question = prompt;
  const relevantDocs = await store.similaritySearch(question);

  // Call the chain
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res;
};

// loadQAMapReduceChain
export const retrieveAnswerByloadQAStuffChain = async (
  dirPath: string,
  prompt: string,
  aiModel: CompletionAIModel = CompletionAIModel.gptTurbo
) => {
  const model = new OpenAI({
    modelName: aiModel,
    maxConcurrency: 10,
  });
  const embeddings = new OpenAIEmbeddings();

  // Load the documents and create the vector store
  const store = await HNSWLib.load(dirPath, embeddings);
  const relevantDocs = await store.similaritySearch(prompt);
  const chain = loadQAMapReduceChain(model);

  // Call the chain
  const res = await chain.call({
    question: prompt,
    input_documents: relevantDocs,
  });

  return res;
};

// @docs: https://js.langchain.com/docs/modules/chains/index_related_chains/retrieval_qa
export const answerWithChain = async (
  dirPath: string,
  prompt: string,
  aiModel: CompletionAIModel = CompletionAIModel.gptTurbo
) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: aiModel,
  });
  const vectorStore = await getStore(dirPath);
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: prompt,
  });
  return res;
};
