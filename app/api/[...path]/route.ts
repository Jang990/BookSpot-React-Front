import apiClient from "@/utils/api/common/ApiClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return await apiClient.get(req);
};

export const POST = async (req: NextRequest) => {
  return await apiClient.post(req);
};

export const PUT = async (req: NextRequest) => {
  return await apiClient.put(req);
};

export const DELETE = async (req: NextRequest) => {
  return await apiClient.delete(req);
};

export const PATCH = async (req: NextRequest) => {
  return await apiClient.patch(req);
};
