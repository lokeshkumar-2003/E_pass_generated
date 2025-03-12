const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const VisaApplication = require("../model/VisaApplication");

exports.generatePass = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);
    if (!application) {
      console.error("❌ Application not found");
      return res.status(404).send("Application not found");
    }

    const templatePath = path.join(__dirname, "../views/e-pass.ejs");
    const html = await ejs.renderFile(templatePath, { application });

    console.log("✅ HTML generated successfully");

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", // Add this line
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle2", timeout: 60000 });

    console.log("✅ HTML loaded into Puppeteer");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log("✅ PDF generated");

    await browser.close();
    console.log("✅ Puppeteer closed");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=e-pass.pdf");
    res.end(pdfBuffer);
  } catch (error) {
    console.error("❌ Error Generating E-Pass:", error);
    res.status(500).send("Error generating E-Pass");
  }
};
