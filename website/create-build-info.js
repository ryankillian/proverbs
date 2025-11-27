import { writeFileSync, mkdirSync } from 'fs';

const buildInfo = {
	// Get the current date in UTC and format it as ISO 8601
	buildTime: new Date().toISOString()
};

// Create the directory if it doesn't exist
mkdirSync('./src/lib/utils', { recursive: true });

// Write the data to a file that our app can import
writeFileSync('./src/lib/utils/build-info.json', JSON.stringify(buildInfo));

console.log(`✓ Created build-info.json with timestamp: ${buildInfo.buildTime}`);
