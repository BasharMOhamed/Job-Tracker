import cloudinary from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    const body = await req.json();
    const files: { filename: string; contentType: string; data: string }[] =
      body.files || [];

    const uploads = await Promise.all(
      files.map(async (f) => {
        const dataUri = `data:${f.contentType};base64,${f.data}`;
        const res = await cloudinary.uploader.upload(dataUri, {
          folder: "job-tracker",
          resource_type: "auto",
          access_mode: "public", 
          use_filename: true,
          unique_filename: false,
        });
        return {
          filename: f.filename,
          url: res.secure_url,
          bytes: res.bytes,
          fileType: f.contentType,
          public_id: res.public_id,
        };
      })
    );

    return NextResponse.json({ files: uploads });
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse("Upload failed", { status: 500 });
  }
}
