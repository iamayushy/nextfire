import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      console.log(user);
      return NextResponse.json({
        success: false,
        message: "User already exists",
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User created successfully",
      data: {
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: error.message || "Error creating user",
    });
  }
}
