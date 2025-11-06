import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      userRole: string;
      [key: string]: any;
    }
    interface Request {
      user?: User;
    }
  }
}

export {};
