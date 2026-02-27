import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const areaPincodeMap: Record<string, string> = {
  Kompally: "500014",
  Suchitra: "500067",
  Alwal: "500010",
  Bowenpally: "500011",
  Quthbullapur: "500055",
  Petbasheerabad: "500067",
  Bolarum: "500010",
  Kandlakoya: "501401",
  Medchal: "501401",
  Gundlapochampally: "501401"
};

export const updatePincodes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "donors"));

    for (const docItem of snapshot.docs) {
      const donorData = docItem.data();
      const area = donorData.area;

      const correctPincode = areaPincodeMap[area];

      if (correctPincode) {
        await updateDoc(docItem.ref, {
          pincode: correctPincode
        });
      }
    }

    console.log("All donors updated with PIN codes ✅");
  } catch (error) {
    console.error("Error updating donors:", error);
  }
};