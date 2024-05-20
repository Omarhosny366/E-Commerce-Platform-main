import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

// Set your Paymob API token
const API_TOKEN = process.env.PAY_API as string;
const PAYMOB_URL = "https://accept.paymob.com/api";
const PASSWORD = process.env.PASSWORD as string;
const USERNAME = process.env.USERNAME as string;

interface AuthResponse {
  token: string;
}

// Authenticate with Paymob to get an access token
export async function authenticate(): Promise<string | undefined> {
  try {
    const url = `${PAYMOB_URL}/auth/tokens`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key: API_TOKEN,
      username: USERNAME,
      password: PASSWORD,
    };

    const response: AxiosResponse<AuthResponse> = await axios.post(url, data, { headers });
    const accessToken = response.data.token;
    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error authenticating:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
