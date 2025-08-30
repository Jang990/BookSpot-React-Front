import apiClient from "@/utils/api/ApiClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return await apiClient.get(req);
};
