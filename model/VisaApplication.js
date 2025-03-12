const mongoose = require("mongoose");

const visaApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Personal Information
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  gender: String,
  nationality: String,
  passportNumber: String,
  passportExpiryDate: Date,
  countryOfBirth: String,
  maritalStatus: String,

  // Contact Details
  email: { type: String, required: true },
  phone: String,
  currCountry: String,
  currState: String,
  currCity: String,
  currZipcode: String,
  permCountry: String,
  permState: String,
  permCity: String,
  permZipcode: String,

  // Visa Details
  visaType: {
    type: String,
    enum: ["Tourist", "Business", "Student", "Work"],
    required: false,
  },
  purpose: String,
  countryApplyingFor: String,
  durationOfStay: String,
  dateOfTravel: Date,
  dateOfReturn: Date,

  // Employment & Financial Details
  occupation: String,
  employerName: String,
  employerAddress: String,
  income: String,
  sponsorship: { type: String, enum: ["Self-Funded", "Employer", "Relative"] },
  bankStatementProof: String,

  // Additional Information
  criminalRecord: { type: String, enum: ["Yes", "No"], default: false },
  medicalHistory: String,
  additionalNotes: String,
  dependentsTraveling: [String],

  // Application Status
  appliedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  remarks: String,
});

const VisaApplication = mongoose.model(
  "VisaApplication",
  visaApplicationSchema
);
module.exports = VisaApplication;
