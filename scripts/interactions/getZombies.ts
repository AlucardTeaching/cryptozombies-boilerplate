import { ethers } from "hardhat";
import { ZombieOwnership } from "../../typechain-types";

/**
 * Script pentru obținerea tuturor zombies-ilor unui user
 *
 * Usage:
 *   CONTRACT_ADDRESS=0x... npx hardhat run scripts/interactions/getZombies.ts --network localhost
 *
 * Sau pentru o altă adresă:
 *   CONTRACT_ADDRESS=0x... OWNER_ADDRESS=0x... npx hardhat run scripts/interactions/getZombies.ts --network localhost
 */

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  console.log("🔍 Getting Zombies...\n");
  console.log("Contract address:", contractAddress);

  const [defaultOwner] = await ethers.getSigners();
  const ownerAddress = process.env.OWNER_ADDRESS || defaultOwner.address;

  console.log("Owner address:", ownerAddress);

  // Conectează la contract
  const contract = await ethers.getContractAt(
    "ZombieOwnership",
    contractAddress
  ) as unknown as ZombieOwnership;

  // Obține balanceul
  const balance = await contract.balanceOf(ownerAddress);
  console.log("\n📊 Total zombies:", balance.toString());

  if (balance === 0n) {
    console.log("\n⚠️  No zombies found for this address.");
    console.log("Create one with:");
    console.log('  ZOMBIE_NAME="YourZombie" npx hardhat run scripts/interactions/createZombie.ts --network localhost');
    return;
  }

  // Obține lista de zombie IDs
  const zombieIds = await contract.getZombiesByOwner(ownerAddress);

  console.log("\n🧟 Your Zombies:\n");
  console.log("=".repeat(80));

  // Afișează detalii pentru fiecare zombie
  for (let i = 0; i < zombieIds.length; i++) {
    const zombieId = zombieIds[i];
    const zombie = await contract.zombies(zombieId);

    // Calculează ready time
    const now = Math.floor(Date.now() / 1000);
    const readyTime = Number(zombie.readyTime);
    const isReady = now >= readyTime;
    const timeUntilReady = isReady ? 0 : readyTime - now;

    console.log(`Zombie #${i + 1}`);
    console.log(`  ID: ${zombieId}`);
    console.log(`  Name: ${zombie.name}`);
    console.log(`  DNA: ${zombie.dna}`);
    console.log(`  Level: ${zombie.level}`);
    console.log(`  Wins: ${zombie.winCount} | Losses: ${zombie.lossCount}`);
    console.log(`  Ready Time: ${isReady ? '✅ Ready' : `⏳ ${Math.floor(timeUntilReady / 60)} min ${timeUntilReady % 60} sec`}`);
    console.log("=".repeat(80));
  }

  // Informații despre ce poate face user-ul
  console.log("\n💡 Available Actions:");
  console.log("  • Level up: npm run interact:levelup");
  console.log("  • Change name: npm run interact:changename");
  console.log("  • Attack: await contract.attack(myZombieId, targetZombieId)");
  console.log("  • Feed: await contract.feedOnKitty(zombieId, kittyId)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
