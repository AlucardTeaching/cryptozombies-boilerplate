# CryptoZombies - Interaction Scripts

Simple and easy-to-use scripts for interacting with the ZombieOwnership contract.

## 📋 Prerequisites

1. **Start the local node** (in a separate terminal):
   ```bash
   npm run node
   ```

2. **Deploy the contract**:
   ```bash
   npm run deploy:local
   ```
   Save the contract address (default: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`)

## 🎮 Available Scripts

### 1. Create Zombie

Create a new zombie for your address.

**Command:**
```bash
ZOMBIE_NAME="ZombieName" npm run interact:create
```

**Examples:**
```bash
ZOMBIE_NAME="DragonZombie" npm run interact:create
ZOMBIE_NAME="NinjaZombie" npm run interact:create
```

**Notes:**
- Each address can only create ONE zombie initially
- Name can be changed later (after level 2)
- DNA is randomly generated

---

### 2. Get Zombies

View all zombies owned by an address.

**Command:**
```bash
npm run interact:get
```

**To view zombies for a different address:**
```bash
OWNER_ADDRESS=0x... npm run interact:get
```

**Output:**
- Zombie ID
- Name
- DNA (16 digits)
- Current level
- Win/Loss count
- Ready time (for attacks/feeding)

---

### 3. Level Up

Increase your zombie's level.

**Command:**
```bash
ZOMBIE_ID=0 npm run interact:levelup
```

**Cost:** 0.001 ETH (fee can be changed by contract owner)

**Benefits:**
- Level 2+: Can change name
- Level 20+: Can change DNA
- Higher level: Better stats in battles

**Examples:**
```bash
ZOMBIE_ID=0 npm run interact:levelup
ZOMBIE_ID=1 npm run interact:levelup
```

---

### 4. Change Name

Change your zombie's name.

**Command:**
```bash
ZOMBIE_ID=0 ZOMBIE_NAME="NewName" npm run interact:changename
```

**Requirements:**
- Zombie must be level 2 or higher
- You must be the zombie owner

**Examples:**
```bash
ZOMBIE_ID=0 ZOMBIE_NAME="MegaZombie" npm run interact:changename
ZOMBIE_ID=0 ZOMBIE_NAME="UltraZombie" npm run interact:changename
```

---

## 🔧 Environment Variables

All scripts accept the following environment variables (optional):

| Variable | Default | Description |
|----------|---------|-------------|
| `CONTRACT_ADDRESS` | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` | Deployed contract address |
| `ZOMBIE_ID` | - | Zombie ID (for specific operations) |
| `ZOMBIE_NAME` | - | Zombie name |
| `OWNER_ADDRESS` | Current signer | Owner address (for getZombies) |

### Examples with custom CONTRACT_ADDRESS:

```bash
CONTRACT_ADDRESS=0xYourAddress ZOMBIE_NAME="Test" npm run interact:create
CONTRACT_ADDRESS=0xYourAddress npm run interact:get
CONTRACT_ADDRESS=0xYourAddress ZOMBIE_ID=0 npm run interact:levelup
```

---

## 📝 Typical Workflow

### 1. Initial Setup
```bash
# Terminal 1 - Start node
npm run node

# Terminal 2 - Deploy contract
npm run deploy:local
```

### 2. Create your first zombie
```bash
ZOMBIE_NAME="MyFirstZombie" npm run interact:create
```

### 3. Check your zombies
```bash
npm run interact:get
```

### 4. Level up
```bash
ZOMBIE_ID=0 npm run interact:levelup
```

### 5. Change name (after level 2)
```bash
ZOMBIE_ID=0 ZOMBIE_NAME="AwesomeZombie" npm run interact:changename
```

### 6. Verify results
```bash
npm run interact:get
```

---

## 🎯 Complete Examples

### Scenario 1: Create and upgrade a zombie

```bash
# Create zombie
ZOMBIE_NAME="Warrior" npm run interact:create

# Check
npm run interact:get

# Level up twice
ZOMBIE_ID=0 npm run interact:levelup
ZOMBIE_ID=0 npm run interact:levelup

# Change name
ZOMBIE_ID=0 ZOMBIE_NAME="EliteWarrior" npm run interact:changename

# Verify final result
npm run interact:get
```

### Scenario 2: Check and upgrade existing zombie

```bash
# See what zombies you have
npm run interact:get

# Level up zombie with ID 0
ZOMBIE_ID=0 npm run interact:levelup

# If level 2+, change name
ZOMBIE_ID=0 ZOMBIE_NAME="NewName" npm run interact:changename
```

---

## ❌ Troubleshooting

### Error: "You already have zombie(s)!"
- Each address can only create ONE zombie with `createRandomZombie()`
- For more zombies, use feeding or attack (breeding)

### Error: "Zombie level too low!"
- For `changeName`: Minimum level 2 required
- For `changeDna`: Minimum level 20 required
- Solution: Level up your zombie first

### Error: "You don't own this zombie"
- Verify that ZOMBIE_ID is correct
- Verify you're using the correct owner address

### Error: "Insufficient balance"
- Level up costs 0.001 ETH
- Check your balance with: `ethers.provider.getBalance(yourAddress)`

### Error: "could not decode result data"
- Verify local node is running (`npm run node`)
- Verify CONTRACT_ADDRESS is correct
- Verify you deployed the contract (`npm run deploy:local`)

---

## 🚀 Advanced Usage

### Use a custom contract address

Create a `.env.local` file:
```bash
CONTRACT_ADDRESS=0xYourCustomAddress
```

Then run:
```bash
npm run interact:get
npm run interact:create
# etc.
```

### Interact with multiple accounts

```typescript
// In your own script
const [owner, addr1, addr2] = await ethers.getSigners();

// Create zombie for addr1
const contract1 = contract.connect(addr1);
await contract1.createRandomZombie("Zombie1");

// Create zombie for addr2
const contract2 = contract.connect(addr2);
await contract2.createRandomZombie("Zombie2");
```

---

## 📚 Resurse Adiționale

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [CryptoZombies Tutorial](https://cryptozombies.io/)

---

**Happy Zombie Creating! 🧟‍♂️**
