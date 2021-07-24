import {CallableContext} from "firebase-functions/lib/providers/https";

exports.handler = (requestData: any, context: CallableContext) => {
  if (context.auth) { // 認証済みであれば認証情報がcontext内に存在する
    return {echoMessage: requestData.message + "!"};
  } else {
    return {errorMessage: "auth error"};
  }
};
