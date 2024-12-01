import { resolve } from "path";

import { generateApi } from "swagger-typescript-api";

const BACKEND_URL = "http://127.0.0.1:8000";

generateApi({
    name: "Api.ts",
    output: resolve(process.cwd(), "./src/api"),
    input: resolve(process.cwd(), "./swagger/petstore.yml"),
    url: BACKEND_URL + "/swagger/?format=openapi",
    httpClientType: "axios",
});
