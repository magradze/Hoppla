import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  fileType: string
) {
  const fileBuffer = file;
  const uniqueFileName = `${uuidv4()}-${fileName}`;
  // TODO: i don't know if uuid is best solution here, i couldnot find any other way to generate unique file name that is builtin in aws s3
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${uniqueFileName}`,
    Body: fileBuffer,
    ContentType: `${fileType}`,
  });
  await s3Client.send(command);
  return uniqueFileName;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
    if (!file.type.includes("image")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, file.type);

    return NextResponse.json({
      fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
