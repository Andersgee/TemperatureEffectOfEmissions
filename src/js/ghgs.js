// contants from "Equivalence of greenhouse-gas emissions for peak temperature limits" (M.Smith et al., 2012)
// in particular; table 1 and 3 of supplementary information

function E(v, x) {
  return v * Math.pow(10, x);
}

export const ghgs = {
  //table 1
  CO2: { longlived: true, k: E(4.32, -16) },
  N2O: { longlived: true, k: E(1330, -16) },
  "HFC-23": { longlived: true, k: E(74300, -16) },
  "HFC-236fa": { longlived: true, k: E(48300, -16) },
  SF6: { longlived: true, k: E(173000, -16) },
  NF3: { longlived: true, k: E(111000, -16) },
  CF4: { longlived: true, k: E(60100, -16) },
  C2F6: { longlived: true, k: E(97300, -16) },
  C3F8: { longlived: true, k: E(63900, -16) },
  "c-C4F8": { longlived: true, k: E(75800, -16) },
  C4F10: { longlived: true, k: E(64000, -16) },
  C5F12: { longlived: true, k: E(68600, -16) },
  C6F14: { longlived: true, k: E(67100, -16) },
  C10F18: { longlived: true, k: E(48300, -16) },
  SF5CF3: { longlived: true, k: E(111000, -16) },
  "HFE-125": { longlived: true, k: E(66800, -16) },
  PFPMIE: { longlived: true, k: E(64200, -16) },
  // table3
  CH4: { longlived: false, k: E(1.74, -12) },
  "HFC-32": { longlived: false, k: E(46.6, -12) },
  "HFC-125": { longlived: false, k: E(250, -12) },
  "HFC-134a": { longlived: false, k: E(98.8, -12) },
  "HFC-143a": { longlived: false, k: E(362, -12) },
  "HFC-152a": { longlived: false, k: E(8.58, -12) },
  "HFC-227ea": { longlived: false, k: E(235, -12) },
  "HFC-245fa": { longlived: false, k: E(71.4, -12) },
  "HFC-365mfc": { longlived: false, k: E(54.9, -12) },
  "HFC-43-10mee": { longlived: false, k: E(114, -12) },
  "HFE-134": { longlived: false, k: E(446, -12) },
  "HFE-143a": { longlived: false, k: E(52.2, -12) },
  "HCFE-235da2": { longlived: false, k: E(24.1, -12) },
  "HFE-245cb2": { longlived: false, k: E(48.9, -12) },
  "HFE-245fa2": { longlived: false, k: E(45.4, -12) },
  "HFE-254cb2": { longlived: false, k: E(24.8, -12) },
  "HFE-347mcc3": { longlived: false, k: E(39.8, -12) },
  "HFE-347pcf2": { longlived: false, k: E(39.9, -12) },
  "HFE-356pcc3": { longlived: false, k: E(7.58, -12) },
  "HFE-449sl": { longlived: false, k: E(21.2, -12) },
  "HFE-569sf2": { longlived: false, k: E(3.93, -12) },
  "HFE-43-10pccc124": { longlived: false, k: E(129, -12) },
  "HFE-236ca12": { longlived: false, k: E(195, -12) },
  "HFE-338pcc13": { longlived: false, k: E(104, -12) },
  Dimethylether: { longlived: false, k: E(0.0293, -12) },
  "Methylene chloride": { longlived: false, k: E(0.604, -12) },
};
