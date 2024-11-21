function logInfo(message) {
    console.log(`ℹ️ INFO: ${message}`);
  }
  
  function logError(error) {
    console.error(`❌ ERROR: ${error.message || error}`);
    if (error.stack) console.error(error.stack);
  }
  
  function logSuccess(message) {
    console.log(`✅ SUCCESS: ${message}`);
  }
  
  module.exports = { logInfo, logError, logSuccess };
  