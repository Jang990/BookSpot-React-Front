import apiClient from "@/utils/api/common/ApiClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return await apiClient.get(req);
};
