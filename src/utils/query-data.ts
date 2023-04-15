import { OpenAI } from "langchain/llms/openai";
import { LLMChain, RetrievalQAChain, VectorDBQAChain, loadQAMapReduceChain, loadQARefineChain } from "langchain/chains";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export enum AiModel {
  ada = "ada",
  gpt35Turbo = "gpt-3.5-turbo",
  babbage = "babbage",
  curie = "curie",
  textCurie = "text-curie-001",
  textAda = "text-ada-001",
  textBabbage = "text-babbage-001",
  davinci = "davinci",
  textDavinci3 = "text-davinci-003",
}

const getStore = async (dirPath: string): Promise<HNSWLib> => {
  const embeddings = new OpenAIEmbeddings();

  // Load the documents and create the vector store
  const store = await HNSWLib.load(
    dirPath,
    embeddings
  );
  return store;
};
// RetrievalQAChain
export const retrieveAnswerRetrievalQAChain = async (dirPath: string, prompt: string, aiModel: AiModel = AiModel.ada) => {

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    // modelName: aiModel
  });

  console.log('created model');
  const loadedVectorStore = await HNSWLib.load(
    dirPath,
    new OpenAIEmbeddings({
      // modelName: aiModel,
    })
  );
  console.log('loaded vector store');

  const vectorRetriever = await loadedVectorStore.asRetriever();
  const chain = RetrievalQAChain.fromLLM(
    model,
    vectorRetriever
  );
  console.log('created chain');
  const res = await chain.call({
    query: prompt,
  });
  console.log('res--->', res);
  console.log({ res });
  return res;
};

// loadQARefineChain
export const retrieveAnswerByQARefineChain = async (dirPath: string, prompt: string, aiModel: AiModel = AiModel.ada) => {
  const embeddings = new OpenAIEmbeddings();
  const model = new OpenAI({});
  const chain = loadQARefineChain(model);

  // Load the documents and create the vector store
  const store = await HNSWLib.load(
    dirPath,
    embeddings
  );

  // Select the relevant documents
  const question = prompt;
  const relevantDocs = await store.similaritySearch(question);

  // Call the chain
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  console.log(res);
  return res;
};


// loadQAMapReduceChain
export const retrieveAnswerByloadQAStuffChain = async (dirPath: string, prompt: string, aiModel: AiModel = AiModel.ada) => {
  const model = new OpenAI({
    modelName: aiModel,
    maxConcurrency: 10
  });
  const embeddings = new OpenAIEmbeddings();

  // Load the documents and create the vector store
  const store = await HNSWLib.load(
    dirPath,
    embeddings
  );
  const relevantDocs = await store.similaritySearch(prompt);
  const chain = loadQAMapReduceChain(model);

  // Call the chain
  const res = await chain.call({
    question: prompt,
    input_documents: relevantDocs
  });

  return res;
};


export const answerWithChain = async (dirPath: string, prompt: string) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: AiModel.textAda
  });
  const vectorStore = await getStore(dirPath);
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: prompt,
  });
  console.log({ res });
  return res;
};
