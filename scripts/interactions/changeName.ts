import { ethers } from "hardhat";
import { ZombieOwnership } from "../../typechain-types";

/**
 * Script pentru schimbarea numelui unui zombie
 *
 * Usage:
 *   CONTRACT_ADDRESS=0x... ZOMBIE_ID=0 ZOMBIE_NAME="NumeNou" npx hardhat run scripts/interactions/changeName.ts --network localhost
 *
 * Requirements: Zombie-ul trebuie să fie nivel 2 sau mai mare
 */

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const zombieIdStr = process.env.ZOMBIE_ID;
  const newName = process.env.ZOMBIE_NAME;

  if (!zombieIdStr || !newName) {
    console.error("❌ Error: ZOMBIE_ID and ZOMBIE_NAME environment variables required");
    console.log("\nUsage:");
    console.log('  ZOMBIE_ID=0 ZOMBIE_NAME="NewName" npx hardhat run scripts/interactions/changeName.ts --network localhost');
    console.log("\nTo see your zombies, run:");
    console.log("  npx hardhat run scripts/interactions/getZombies.ts --network localhost");
    process.exit(1);
  }

  const zombieId = BigInt(zombieIdStr);

  console.log("✏️  Changing Zombie Name...\n");
  console.log("Contract address:", contractAddress);
  console.log("Zombie ID:", zombieId.toString());
  console.log("New name:", newName);

  const [owner] = await ethers.getSigners();
  console.log("Using account:", owner.address);

  // Conectează la contract
  const contract = await ethers.getContractAt(
    "ZombieOwnership",
    contractAddress
  ) as unknown as ZombieOwnership;

  // Verifică că zombie-ul există și aparține user-ului
  let zombie;
  try {
    zombie = await contract.zombies(zombieId);
    const zombieOwner = await contract.ownerOf(zombieId);

    if (zombieOwner.toLowerCase() !== owner.address.toLowerCase()) {
      console.error("❌ Error: You don't own this zombie!");
      console.log("Zombie owner:", zombieOwner);
      console.log("Your address:", owner.address);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error: Zombie not found or invalid ID");
    process.exit(1);
  }

  console.log("\n📊 Current Zombie Info:");
  console.log("  Current Name:", zombie.name);
  console.log("  Level:", zombie.level.toString());
  console.log("  DNA:", zombie.dna.toString());

  // Verifică nivelul (trebuie să fie >= 2)
  if (zombie.level < 2n) {
    console.error("\n❌ Error: Zombie level too low!");
    console.log("Required level: 2");
    console.log("Current level:", zombie.level.toString());
    console.log("\nLevel up your zombie first:");
    console.log("  ZOMBIE_ID=" + zombieId + " npx hardhat run scripts/interactions/levelUp.ts --network localhost");
    process.exit(1);
  }

  // Schimbă numele
  console.log("\n⏳ Changing name...");
  try {
    const tx = await contract.changeName(zombieId, newName);
    console.log("Transaction hash:", tx.hash);

    await tx.wait();
    console.log("✅ Transaction confirmed!");

    // Verifică noul nume
    const updatedZombie = await contract.zombies(zombieId);

    console.log("\n🎉 Name Changed Successfully!\n");
    console.log("📊 Updated Info:");
    console.log("  Old Name:", zombie.name);
    console.log("  New Name:", updatedZombie.name);
    console.log("  Level:", updatedZombie.level.toString());
    console.log("  DNA:", updatedZombie.dna.toString());

  } catch (error: any) {
    if (error.message.includes("aboveLevel")) {
      console.error("\n❌ Error: Zombie level requirement not met");
      console.log("You need level 2 or higher to change the name");
    } else if (error.message.includes("onlyOwnerOf")) {
      console.error("\n❌ Error: You don't own this zombie");
    } else {
      throw error;
    }
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
