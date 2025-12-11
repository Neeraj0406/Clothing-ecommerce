import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getRoleNameFromRoleValue } from "./commonApiFunctions";

export const withAuth = (handler, allowedRoles = []) => {
  return async (req, ctx) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Token not found" },
        { status: 401 }
      );
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET); // no await
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Check allowed roles
    if (allowedRoles.length && !allowedRoles.includes(getRoleNameFromRoleValue(user.role))) {
      return NextResponse.json(
        { message: "You are not allowed for this API" },
        { status: 403 }
      );
    }

    // Pass user into real handler
    return handler(req, { ...ctx, user });
  };
};
