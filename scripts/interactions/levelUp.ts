import { ethers } from "hardhat";
import { ZombieOwnership } from "../../typechain-types";

/**
 * Script pentru level up unui zombie
 *
 * Usage:
 *   CONTRACT_ADDRESS=0x... ZOMBIE_ID=0 npx hardhat run scripts/interactions/levelUp.ts --network localhost
 *
 * Note: Level up costă 0.001 ETH (fee-ul poate fi schimbat de owner)
 */

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const zombieIdStr = process.env.ZOMBIE_ID;

  if (!zombieIdStr) {
    console.error("❌ Error: ZOMBIE_ID environment variable not set");
    console.log("\nUsage:");
    console.log("  ZOMBIE_ID=0 npx hardhat run scripts/interactions/levelUp.ts --network localhost");
    console.log("\nTo see your zombies, run:");
    console.log("  npx hardhat run scripts/interactions/getZombies.ts --network localhost");
    process.exit(1);
  }

  const zombieId = BigInt(zombieIdStr);

  console.log("⬆️  Leveling Up Zombie...\n");
  console.log("Contract address:", contractAddress);
  console.log("Zombie ID:", zombieId.toString());

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

  console.log("\n📊 Current Zombie Stats:");
  console.log("  Name:", zombie.name);
  console.log("  Current Level:", zombie.level.toString());
  console.log("  DNA:", zombie.dna.toString());
  console.log("  Wins:", zombie.winCount.toString());
  console.log("  Losses:", zombie.lossCount.toString());

  // Level up fee (default 0.001 ETH)
  const levelUpFee = ethers.parseEther("0.001");
  console.log("\n💰 Level up fee:", ethers.formatEther(levelUpFee), "ETH");

  // Verifică balanceul
  const balance = await ethers.provider.getBalance(owner.address);
  if (balance < levelUpFee) {
    console.error("❌ Error: Insufficient balance!");
    console.log("Required:", ethers.formatEther(levelUpFee), "ETH");
    console.log("Your balance:", ethers.formatEther(balance), "ETH");
    process.exit(1);
  }

  // Level up
  console.log("\n⏳ Processing level up...");
  const tx = await contract.levelUp(zombieId, { value: levelUpFee });
  console.log("Transaction hash:", tx.hash);

  await tx.wait();
  console.log("✅ Transaction confirmed!");

  // Obține noile stats
  const updatedZombie = await contract.zombies(zombieId);

  console.log("\n🎉 Level Up Successful!\n");
  console.log("📊 New Stats:");
  console.log("  Name:", updatedZombie.name);
  console.log("  New Level:", updatedZombie.level.toString(), `(+${Number(updatedZombie.level - zombie.level)})`);
  console.log("  DNA:", updatedZombie.dna.toString());

  // Info despre ce poate face acum
  if (updatedZombie.level >= 2n) {
    console.log("\n💡 You can now change your zombie's name!");
    console.log("  Run: ZOMBIE_ID=" + zombieId + ' ZOMBIE_NAME="NewName" npm run interact:changename');
  }

  if (updatedZombie.level >= 20n) {
    console.log("\n💡 You can now change your zombie's DNA!");
    console.log("  Run: await contract.changeDna(" + zombieId + ', "newDna")');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
