import { ethers } from "hardhat";
import { ZombieOwnership } from "../../typechain-types";

/**
 * Script pentru crearea unui zombie nou
 *
 * Usage:
 *   CONTRACT_ADDRESS=0x... ZOMBIE_NAME="NumeZombie" npx hardhat run scripts/interactions/createZombie.ts --network localhost
 *
 * Sau folosește adresa default:
 *   ZOMBIE_NAME="NumeZombie" npx hardhat run scripts/interactions/createZombie.ts --network localhost
 */

async function main() {
  // Adresa contractului (default sau din environment variable)
  const contractAddress = process.env.CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const zombieName = process.env.ZOMBIE_NAME;

  if (!zombieName) {
    console.error("❌ Error: ZOMBIE_NAME environment variable not set");
    console.log("\nUsage:");
    console.log('  ZOMBIE_NAME="NumeZombie" npx hardhat run scripts/interactions/createZombie.ts --network localhost');
    process.exit(1);
  }

  console.log("🧟 Creating Zombie...\n");
  console.log("Contract address:", contractAddress);
  console.log("Zombie name:", zombieName);

  const [owner] = await ethers.getSigners();
  console.log("Using account:", owner.address);

  // Conectează la contract
  const contract = await ethers.getContractAt(
    "ZombieOwnership",
    contractAddress
  ) as unknown as ZombieOwnership;

  // Verifică dacă user-ul are deja un zombie
  const balance = await contract.balanceOf(owner.address);
  if (balance > 0n) {
    console.log("\n⚠️  You already have", balance.toString(), "zombie(s)!");
    console.log("Each address can only create one zombie initially.");

    // Afișează zombies existenți
    const zombies = await contract.getZombiesByOwner(owner.address);
    console.log("\nYour existing zombies:");
    for (let i = 0; i < zombies.length; i++) {
      const zombieId = zombies[i];
      const zombie = await contract.zombies(zombieId);
      console.log(`  ${i + 1}. ${zombie.name} (ID: ${zombieId}, Level: ${zombie.level}, DNA: ${zombie.dna})`);
    }
    return;
  }

  // Creează zombie-ul
  console.log("\n⏳ Creating zombie...");
  const tx = await contract.createRandomZombie(zombieName);
  console.log("Transaction hash:", tx.hash);

  await tx.wait();
  console.log("✅ Transaction confirmed!");

  // Obține detaliile zombie-ului creat
  const zombies = await contract.getZombiesByOwner(owner.address);
  const zombieId = zombies[0];
  const zombie = await contract.zombies(zombieId);

  console.log("\n🎉 Zombie created successfully!\n");
  console.log("Zombie Details:");
  console.log("  ID:", zombieId.toString());
  console.log("  Name:", zombie.name);
  console.log("  DNA:", zombie.dna.toString());
  console.log("  Level:", zombie.level.toString());
  console.log("  Win Count:", zombie.winCount.toString());
  console.log("  Loss Count:", zombie.lossCount.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
