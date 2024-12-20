import Reviewer from '@/pages/reviewer.vue';
import {OpenAI} from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import {constructConfigJson} from "@/utils/configParser";
import type {ReviewArg, ReviewReply} from "@/utils/types";
import {sleep} from "openai/core";
import {PH_reply} from "@/utils/placeholders";


const OPENAI_API = "NOT_A_REAL_API_KEY"
const LOCAL_URL = "http://localhost:8000/v1"
const GROQ_API = "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"
const GROQ_URL = "https://api.groq.com/openai/v1/"
const model_llama = "llama-3.3-70b-versatile"
const model_qwen = "Qwen/Qwen2.5-3B-Instruct"
const openai = new OpenAI({
  baseURL: GROQ_URL,
  dangerouslyAllowBrowser: true,
  apiKey: GROQ_API
})

const schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
    "properties": {
      "id": {
        "type": "integer"
      },
      "problemIcon": {
         "type": "string",
         "description": "material design icon name like 'mdi-repeat-off'"
        },
      "problemTitle": { "type": "string" },
      "problemDesc": { "type": "string" },
      "lineBegin": { "type": "integer" },
      "lineEnd": { "type": "integer" },
      "language": { "type": "string" },
      "fixedCode": {
        "type": "string",
        "description": "The fixed code snippet **between lineBegin and lineEnd**, please include line breaks in the code."
      }
    },
    "required": [
      "id",
      "problemIcon",
      "problemTitle",
      "problemDesc",
      "lineBegin",
      "lineEnd",
      "language",
      "fixedCode"
    ]
}


const messages: Array<ChatCompletionMessageParam> = [
  {
    role: "system",
    content: `You are a highly skilled code reviewer with expertise in multiple programming languages and software engineering best practices.
    Your task is to review code based on the strictness level I provide, considering the following evaluation criteria:
    1. Code readability and clarity
    2. Code efficiency
    3. Maintainability
    4. Correctness
    5. Security
    Only consider the metrics I specify, the default metrics are readability, efficiency, and maintainability.

    Your feedback should contain follow schema in a json array which enclosed by '[]' and **make sure** there is not extra message in the response.
    ${JSON.stringify(schema, null, 2)}
    Your suggestions should be based on the code functionality description I will provide, and the feedback should adjust according to the strictness level I specify and the default strictness level is medium.

    **Make sure the lines of code should not intersect with each other. This is very important**
    `
  },
];

const constructRequest = (arg: ReviewArg): string => {
  const args = JSON.stringify(arg);
  return "Please review the following code with given strictness and metrics: " + args;
}

async function callOpenAI(): Promise<ReviewReply[]> {
  Reviewer
  let errorResponse: ReviewReply = {
    id: 0,
    problemIcon: "",
    problemTitle: "Error",
    problemDesc: "An error occurred while processing the request.",
    lineBegin: 0,
    lineEnd: 0,
    fixedCode: "",
    valid: false,
  }
  let errorReplies: ReviewReply[] = [];
  errorReplies.push(errorResponse);
  try {
    const response = await openai.chat.completions.create({
      model: model_llama,
      messages: messages,
      // response_format: {
      //   type: 'json_object'
      // },
    });
    const responseMessage = response.choices[0].message.content
    if (responseMessage == null) {
      return errorReplies;
    }
    console.log(responseMessage)
    messages.push({
      role: "assistant",
      content: responseMessage
    })
    const parsedObjs = JSON.parse(responseMessage);
    let replies: ReviewReply[] = [];
    for (let i = 0; i < parsedObjs.length; i++) {
      const parsedObj = parsedObjs[i];
      const reviewReply: ReviewReply = parsedObj;
      reviewReply.valid = true;
      replies.push(reviewReply);
    }
    return replies;
  } catch (err) {
    console.error(err);
    return errorReplies;
  }
}

export async function reviewCode(): Promise<ReviewReply[]> {
  let arg: ReviewArg = constructConfigJson();
  // let arg: ReviewArg = {
  //   code: "int fib(int n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}",
  // }
  console.log(arg);
  const request = constructRequest(arg);
  messages.push({
    role: "user",
    content: request
  })
  console.log("Sending request: " + request);
  const result: ReviewReply[] = await callOpenAI();
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
  return result;
}

export async function mockReviewCode(): Promise<ReviewReply[]> {
  await sleep(2000);
  return PH_reply;
}
