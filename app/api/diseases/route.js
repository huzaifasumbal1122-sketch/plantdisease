import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Disease from "@/models/Disease";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const symptom = searchParams.get("symptom");

    let query = {};
    if (type) query.type = type;
    if (symptom) query.symptoms = { $in: [symptom] };

    await dbConnect();
    const diseases = await Disease.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(diseases, { status: 200 });
  } catch (error) {
    console.error("GET Diseases Error:", error);
    return NextResponse.json({ message: "Failed to fetch diseases" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    
    const newDisease = await Disease.create(body);
    
    return NextResponse.json(newDisease, { status: 201 });
  } catch (error) {
    console.error("POST Disease Error:", error);
    return NextResponse.json({ message: "Failed to create disease entry" }, { status: 500 });
  }
}
