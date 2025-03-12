const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const VisaApplication = require("../model/VisaApplication");

exports.generatePass = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);
    if (!application) {
      console.error("❌ Application not found");
      return res.status(404).json({ error: "Application not found" });
    }

    // Generate HTML from EJS template
    const templatePath = path.join(__dirname, "../views/e-pass.ejs");
    let html;
    try {
      html = await ejs.renderFile(templatePath, { application });
      console.log("✅ HTML generated successfully");
    } catch (err) {
      console.error("❌ Error rendering EJS:", err);
      return res.status(500).json({ error: "Error rendering E-Pass template" });
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
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

    // Ensure browser is closed properly
    await browser.close();
    console.log("✅ Puppeteer closed");

    // Send the PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="e-pass.pdf"');
    res.end(pdfBuffer);
  } catch (error) {
    console.error("❌ Error Generating E-Pass:", error);
    res.status(500).json({ error: "Error generating E-Pass" });
  }
};
