// Server Environment Check Diagnostic Utility

function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check critical Database and Key variables
  if (!process.env.DB_URL && !process.env.MONGODB_URI) {
    missing.push("DB_URL or MONGODB_URI (MongoDB Connection string)");
  }

  if (!process.env.JWT_SECRET) {
    missing.push("JWT_SECRET (Security signature key)");
  }

  if (!process.env.PORT) {
    warnings.push("PORT is not explicitly defined. Using default fallback: 5002");
  }

  if (missing.length > 0) {
    console.error("\n❌ [CodeVibe Startup Error]: Missing required environment configurations!");
    console.error("Please configure the following in your server/.env file:\n");
    missing.forEach((item, index) => {
      console.error(`  ${index + 1}. ${item}`);
    });
    console.error("\nFor instructions, refer to server/.env.example\n");
    // Terminate gracefully to prevent unhandled db connection exceptions
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log("\n⚠️ [CodeVibe Warning]: Diagnostic checks completed with minor warnings:");
    warnings.forEach((warn) => {
      console.log(`  - ${warn}`);
    });
    console.log("");
  } else {
    console.log("\n✅ [CodeVibe]: All server environment diagnostic checks passed.\n");
  }
}

module.exports = {
  validateEnv,
};
