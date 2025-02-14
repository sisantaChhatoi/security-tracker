const bcrypt = require('bcryptjs');

const saltRounds = 10; // Recommended: 10-12

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hash);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

// Example usage
hashPassword("abcdef");




async function verifyPassword(enteredPassword, storedHash) {
    try {
        const match = await bcrypt.compare(enteredPassword, storedHash);
        if (match) {
            console.log("✅ Password is correct!");
        } else {
            console.log("❌ Invalid password.");
        }
        return match;
    } catch (error) {
        console.error("Error verifying password:", error);
    }
}

// Example hashed password (from database)
const storedHash = "$2b$10$VkPApVxf06DoOX1m6GIRJu.VrteJPonjjxN8NEKJg.faWwa4z0vk."; // Example

// Checking user input
verifyPassword("abcdefjrejerjkerjkrjekjerkjrekjkref", storedHash);
