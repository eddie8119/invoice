import { Response } from "express";
import { AppwriteException } from "node-appwrite";

export const handleAppwriteError = (
  error: any,
  res: Response,
  defaultMessage: string
) => {
  if (error instanceof AppwriteException) {
    return res.status(400).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({
    success: false,
    message: defaultMessage,
  });
};
