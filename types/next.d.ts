import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    nextUrl?: any;
  }
}
