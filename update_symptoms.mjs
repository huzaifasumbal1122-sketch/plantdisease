import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://huzaifa:amir@ac-80vfqnw-shard-00-00.3juvm8x.mongodb.net:27017,ac-80vfqnw-shard-00-01.3juvm8x.mongodb.net:27017,ac-80vfqnw-shard-00-02.3juvm8x.mongodb.net:27017/plant-disease-detector?ssl=true&replicaSet=atlas-52uo39-shard-0&authSource=admin&retryWrites=true&w=majority&appName=devops";

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['plant', 'tree'], required: true },
  symptoms: [{ type: String }],
  homemadeRemedies: { type: String },
  scientificRemedies: { type: String },
  pictures: [{ type: String }],
}, { timestamps: true });

const Disease = mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);

const SYMPTOMS_LIST = [
  "yellow leaves", "brown spots", "white powder", "wilting", 
  "stunted growth", "curling leaves", "black spots", "holes in leaves"
];

async function updateSymptoms() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB.');
    
    const diseases = await Disease.find({});
    console.log(`Found ${diseases.length} diseases to update.`);

    let updatedCount = 0;

    for (let disease of diseases) {
      const oldSymptomsText = disease.symptoms.join(" ").toLowerCase() + " " + disease.description.toLowerCase();
      let newSymptoms = new Set();

      if (oldSymptomsText.includes("yellow") || oldSymptomsText.includes("pale")) newSymptoms.add("yellow leaves");
      if (oldSymptomsText.includes("brown")) newSymptoms.add("brown spots");
      if (oldSymptomsText.includes("white") || oldSymptomsText.includes("powder") || oldSymptomsText.includes("mold") || oldSymptomsText.includes("fluff")) newSymptoms.add("white powder");
      if (oldSymptomsText.includes("wilt") || oldSymptomsText.includes("droop") || oldSymptomsText.includes("collapse")) newSymptoms.add("wilting");
      if (oldSymptomsText.includes("stunt") || oldSymptomsText.includes("dwarf") || oldSymptomsText.includes("small")) newSymptoms.add("stunted growth");
      if (oldSymptomsText.includes("curl") || oldSymptomsText.includes("pucker") || oldSymptomsText.includes("distort") || oldSymptomsText.includes("roll")) newSymptoms.add("curling leaves");
      if (oldSymptomsText.includes("black") || oldSymptomsText.includes("dark") || oldSymptomsText.includes("sooty")) newSymptoms.add("black spots");
      if (oldSymptomsText.includes("hole") || oldSymptomsText.includes("chew") || oldSymptomsText.includes("shot-hole")) newSymptoms.add("holes in leaves");

      // If no match, add 1-2 random symptoms
      if (newSymptoms.size === 0) {
        const random1 = SYMPTOMS_LIST[Math.floor(Math.random() * SYMPTOMS_LIST.length)];
        newSymptoms.add(random1);
        if (Math.random() > 0.5) {
          const random2 = SYMPTOMS_LIST[Math.floor(Math.random() * SYMPTOMS_LIST.length)];
          newSymptoms.add(random2);
        }
      }

      disease.symptoms = Array.from(newSymptoms);
      await disease.save();
      updatedCount++;
    }

    console.log(`Successfully updated ${updatedCount} diseases with standard symptoms!`);
    
  } catch (error) {
    console.error('Error updating database:');
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

updateSymptoms();
