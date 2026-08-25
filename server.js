import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();
const app = express();

// Configure CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://api.trustedform.com"],
      imgSrc: ["'self'", "https://api.trustedform.com"],
      connectSrc: ["'self'", "https://api.trustedform.com"],
      styleSrc: ["'self'", "'unsafe-inline'"], // allow inline styles if needed
    },
  })
);


// ✅ Configure CORS properly
app.use(cors({
  origin: [
    "https://360holdingquotes.com",
    "https://360-quotes-frontend.vercel.app",
    "https://360-quotes-frontend-3hcw.vercel.app",
    "www.360holdingquotes.com",
    "http://localhost:3000",
    'http://localhost:5173',
    'https://360flightbooking.com',
    'https://360-flight-booking-frontend.vercel.app',
    'https://360-flight-booking-frontend-3hcw.vercel.app',
    "www.360flightbooking.com",
    "https://www.360holdingquotes.com",
    "https://www.conversionmatrix360.org",
    "https://conversionmatrix360.org",
    "https://www.ucpmquotes.com/",
    "https://ucpmquotes.com/",
    "https://www.ucpmquotes.com",
  ],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));



app.use(express.json());

// ✅ Connect to Neon Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

// ------------------- ROUTES -------------------

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// Pest Control form submission
app.post("/pestControl/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Destructured from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO pest_control_leads 
        (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // Since React sends a boolean, this converts it to a proper SQL boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Added to the parameter array
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

// Water Damage form submission
app.post("/Homeinsurance/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Extracted from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Homeinsurance_leads 
       (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // React sends a boolean; this ensures it's stored correctly as a boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Saved to the new smid column
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

// HVAC form submission
app.post("/HVAC/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, last_name, Address, City,
    email, phone, reason, zipcode, subscribe,
    xxTrustedFormCertUrl
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO HVAC_leads 
       (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        subscribe === "yes",
        xxTrustedFormCertUrl || null
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

// Windows & Doors form submission
app.post("/windowsDoors/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, last_name, Address, City,
    email, phone, reason, zipcode, subscribe,
    xxTrustedFormCertUrl
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Window_repair_leads 
       (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        subscribe === "yes",
        xxTrustedFormCertUrl || null
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});
app.post("/planes/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, last_name, Address, City,
    email, phone, reason, zipcode, subscribe,
    xxTrustedFormCertUrl
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO flight_booking_leads 
       (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        subscribe === "yes",
        xxTrustedFormCertUrl || null
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});
app.post("/autoinsurance/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Extracted from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO auto_insurance_leads 
        (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // React sends a boolean; this ensures it is stored as a proper SQL boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Added to the parameter array
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});
app.post("/medicare/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Extracted from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO medicare_leads 
        (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // React sends a boolean; this ensures it is stored as a proper SQL boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Added to the parameter array
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});
app.post("/FinalExpence/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Destructured from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO final_expense_leads 
        (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // Since React sends a boolean, this converts it to a proper SQL boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Added to the parameter array
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});
app.post("/Services/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Company, 
    Website,
    email, 
    phone, 
    Service, 
    description
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Services_leads 
        (first_name, last_name, company, website, email, phone, service, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
       first_name, 
       last_name, 
       Company, 
       Website,
       email, 
       phone, 
       Service, 
       description
      ]
    );
    res.status(200).send("Form data saved");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

app.post("/Contact/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name,
    email, 
    phone, 
    Service, 
    description
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Contact_leads 
        (first_name, last_name, email, phone, service, description)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [
       first_name, 
       last_name, 
       email, 
       phone, 
       Service, 
       description
      ]
    );
    res.status(200).send("Form data saved");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

app.post("/ACA/submit", async (req, res) => {
  console.log("Incoming body:", req.body);
  const {
    first_name, 
    last_name, 
    Address, 
    City,
    email, 
    phone, 
    reason, 
    zipcode, 
    subscribe,
    xxTrustedFormCertUrl,
    smid // Destructured from the request body
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO ACA_leads 
        (first_name, last_name, address, city, email, phone, reason, zipcode, subscribe, trusted_cert_url, smid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        first_name,
        last_name,
        Address,
        City,
        email,
        phone,
        reason,
        zipcode,
        // Since React sends a boolean, this converts it to a proper SQL boolean
        !!subscribe, 
        xxTrustedFormCertUrl || null,
        smid || null // Added to the parameter array
      ]
    );
    res.status(200).send("Form data saved with TrustedForm certificate and SMID!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Error saving form data");
  }
});

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});