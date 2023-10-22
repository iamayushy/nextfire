import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
       
        const { content, password } = reqBody;
        const user = await User.findOne({$or:[ {username: content}, {email: content}]});
        if(user) {
            return NextResponse.json({
                success: true,
                message: "User already exists",
                data: user,
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "User does not exist",
            })
        }
        
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: error.message || "Error creating user",
        });
    }    
}