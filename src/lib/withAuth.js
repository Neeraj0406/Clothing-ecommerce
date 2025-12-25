import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getRoleNameFromRoleValue } from "./commonApiFunctions";

export const withAuth = (handler, allowedRoles = []) => {
  return async (req, ctx) => {
    const authHeader =
      req.headers.get("authorization") ||
      req.headers.get("Authorization");

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return NextResponse.json(
        { message: "Token not found" },
        { status: 401 }
      );
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    if (
      allowedRoles.length &&
      !allowedRoles.includes(getRoleNameFromRoleValue(user.role))
    ) {
      return NextResponse.json(
        { message: "You are not allowed for this API" },
        { status: 403 }
      );
    }

    return handler(req, { ...ctx, user });
  };
};
