export const API_BASE_URL = process.env.SERVER_URL || "http://localhost:4000";
export const GRAPHQL_SERVER_URL = `${API_BASE_URL}/graphql`;
export const GRAPHQL_SERVER_OPTIONS = {
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
};
