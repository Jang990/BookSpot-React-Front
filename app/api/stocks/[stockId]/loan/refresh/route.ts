import apiClient from "@/utils/api/common/ApiClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  return await apiClient.post(req);
};
