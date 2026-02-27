import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import donors from "./donors.json";

export const uploadDonors = async () => {
  const donorCollection = collection(db, "donors");

  for (const donor of donors) {
    await addDoc(donorCollection, donor);
  }

  console.log("Upload Complete ✅");
};