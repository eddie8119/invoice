import { Response } from "express";

export const handleAppwriteError = (
  error: any,
  res: Response,
  defaultMessage: string
) => {
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
      code: error.code,
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({
    success: false,
    message: defaultMessage,
  });
};
