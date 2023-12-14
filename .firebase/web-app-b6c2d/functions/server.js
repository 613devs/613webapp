import { onRequest } from 'firebase-functions/v2/https';
  const server = import('firebase-frameworks');
  export const ssrwebappb6c2d = onRequest({"region":"us-central1","invoker":"public"}, (req, res) => server.then(it => it.handle(req, res)));
  