# CryptoZombies (Boilerplate) 🧟

A modernized NFT game tutorial project for learning Solidity smart contract development. Build, battle, and breed unique crypto zombies on the blockchain!

![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-2.28-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tests](https://img.shields.io/badge/tests-55%20passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎮 Overview

CryptoZombies is an educational Solidity project that teaches smart contract development through building an NFT-based game. This is a **modernized version** updated to industry standards (2025) with:

- ✅ Solidity 0.8.24 (latest stable)
- ✅ OpenZeppelin Contracts (v5.6)
- ✅ Hardhat development environment
- ✅ TypeScript for type safety
- ✅ Comprehensive test suite (55 tests)
- ✅ Production-ready deployment scripts

### What You'll Learn

- ERC721 token standard implementation
- Smart contract inheritance patterns
- State management and mappings
- Events and modifiers
- Testing with Hardhat and Chai
- TypeScript integration with smart contracts
- Contract deployment and verification

---

## ✨ Features

### Core Gameplay

- **Create Zombies**: Generate unique zombies with DNA-based attributes
- **Battle System**: Fight other zombies with 70% win probability
- **Breeding**: Create new zombies by feeding on others
- **Level System**: Level up zombies with experience points
- **Customization**: Change zombie names (level 2+) and DNA (level 20+)
- **CryptoKitties Integration**: Feed your zombie on CryptoKitties

### Smart Contract Features

- **ERC721 Compliant**: Full NFT standard implementation
- **Ownable**: Secure owner-only functions
- **Cooldown System**: Time-based restrictions for actions
- **Payable Functions**: ETH-based level up system
- **Event Logging**: Complete on-chain activity tracking
- **Gas Optimized**: Compiler optimizations enabled

---

## 🛠 Tech Stack

### Smart Contracts
- **Solidity**: 0.8.24
- **OpenZeppelin Contracts**: 5.6.1
- **Hardhat**: 2.28.6

### Development Tools
- **TypeScript**: 5.9.3
- **Hardhat Toolbox**: Complete testing & deployment suite
- **Typechain**: Auto-generated TypeScript types
- **Chai**: Assertion library
- **Ethers.js**: Ethereum interaction library

### Testing & Coverage
- **Mocha**: Test framework
- **Hardhat Network Helpers**: Time manipulation & testing utilities
- **55 comprehensive tests** covering all functionality

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AlucardTeaching/cryptozombies-boilerplate.git
cd cryptozombies
```

2. **Install dependencies**

```bash
npm install
```

3. **Compile contracts**

```bash
npm run compile
```

4. **Run tests**

```bash
npm test
```

### Quick Start Commands

```bash
# Development
npm run compile          # Compile smart contracts
npm test                 # Run test suite
npm run coverage         # Generate coverage report
npm run typecheck        # Check TypeScript types

# Deployment
npm run node             # Start local Hardhat node
npm run deploy           # Deploy to Hardhat network
npm run deploy:local     # Deploy to local node

# Interaction
npm run interact         # Interact with deployed contract (general)
npm run interact:create  # Create a new zombie
npm run interact:get     # View your zombies
npm run interact:levelup # Level up a zombie
npm run interact:changename # Change zombie name
npm run setup            # Configure deployed contract
npm run verify           # Verify on Etherscan
```

---

## 📁 Project Structure

```
cryptozombies/
├── contracts/                 # Solidity smart contracts
│   ├── ZombieFactory.sol     # Base zombie creation
│   ├── ZombieFeeding.sol     # Feeding & breeding mechanics
│   ├── ZombieHelper.sol      # Helper functions (level up, rename)
│   ├── ZombieAttack.sol      # Battle system
│   ├── ZombieOwnership.sol   # ERC721 implementation (main contract)
│   └── mocks/                # Mock contracts for testing
│       └── MockCryptoKitties.sol
├── test/                      # TypeScript test files
│   ├── ZombieFactory.test.ts
│   ├── ZombieFeeding.test.ts
│   ├── ZombieHelper.test.ts
│   ├── ZombieAttack.test.ts
│   └── ZombieOwnership.test.ts
├── scripts/                   # Deployment & interaction scripts
│   ├── deploy.ts             # Main deployment script
│   ├── setup.ts              # Post-deployment configuration
│   ├── verify.ts             # Etherscan verification
│   ├── interact.ts           # Contract interaction examples
│   └── interactions/         # Easy-to-use interaction scripts
│       ├── createZombie.ts   # Create new zombie
│       ├── getZombies.ts     # View all zombies
│       ├── levelUp.ts        # Level up zombie
│       ├── changeName.ts     # Change zombie name
│       └── README.md         # Interaction scripts guide
├── hardhat.config.ts         # Hardhat configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── DEPLOYMENT.md             # Detailed deployment guide
├── MODERNIZATION_PLAN.md     # Modernization roadmap
└── README.md                 # This file
```

---

## 🧬 Smart Contracts

### Contract Architecture

The project uses a **linear inheritance chain** where each contract builds on the previous:

```
ZombieFactory (base)
    ↓
ZombieFeeding
    ↓
ZombieHelper
    ↓
ZombieAttack
    ↓
ZombieOwnership (main deployable contract)
```

### Contract Responsibilities

#### ZombieFactory.sol
- Base contract with core zombie creation logic
- DNA generation (16-digit unique identifier)
- Zombie struct definition
- Owner tracking via mappings
- One zombie per address restriction

#### ZombieFeeding.sol
- Feeding and breeding mechanics
- Cooldown system (1 day between actions)
- CryptoKitties integration
- DNA mixing algorithm

#### ZombieHelper.sol
- Level-up system (payable, 0.001 ETH default)
- Name changes (level 2+)
- DNA changes (level 20+)
- Owner withdrawal function
- Zombie lookup by owner

#### ZombieAttack.sol
- Probability-based battle system (70% win rate)
- Win/loss tracking
- Automatic breeding on victory
- Cooldown enforcement

#### ZombieOwnership.sol (Main Contract)
- ERC721 token standard implementation
- Transfer and approval mechanisms
- Balance tracking
- **This is the contract to deploy**

### Key Design Patterns

- **Inheritance**: Linear chain for progressive functionality
- **Modifiers**: `onlyOwner`, `onlyOwnerOf`, `aboveLevel` for access control
- **Events**: `NewZombie`, `Transfer`, `Approval` for off-chain tracking
- **Structs**: Efficient data packing for zombie attributes

---

## 🧪 Testing

### Test Coverage

The project has **55 comprehensive tests** covering all functionality:

```bash
npm test
```

Output:
```
  ZombieFactory (14 tests)
    ✓ Create zombie with valid DNA
    ✓ DNA generation
    ✓ Ownership assignment
    ✓ Event emissions
    ...

  ZombieFeeding (7 tests)
    ✓ Cooldown mechanism
    ✓ CryptoKitties integration
    ✓ DNA mixing
    ...

  ZombieHelper (15 tests)
    ✓ Level up functionality
    ✓ Name/DNA changes
    ✓ Withdrawal
    ...

  ZombieAttack (7 tests)
    ✓ Battle system
    ✓ Win/loss tracking
    ✓ Breeding on victory
    ...

  ZombieOwnership (12 tests)
    ✓ ERC721 compliance
    ✓ Transfer mechanics
    ✓ Approval system
    ...

  55 passing (1s)
```

### Coverage Report

Generate detailed coverage report:

```bash
npm run coverage
```

**Current Coverage**: >95% on all contracts

### Test Features

- ✅ Unit tests for individual functions
- ✅ Integration tests for contract interactions
- ✅ Time-based testing (cooldowns, timestamps)
- ✅ Event emission verification
- ✅ Error handling & revert cases
- ✅ Gas optimization checks

---

## 🚢 Deployment

### Local Deployment

**Option 1: Hardhat Network (in-memory)**

```bash
npm run deploy
```

**Option 2: Local Node (persistent)**

```bash
# Terminal 1
npm run node

# Terminal 2
npm run deploy:local
```

### Testnet/Mainnet Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide including:

- Environment setup
- Network configuration
- Testnet deployment (Sepolia)
- Mainnet deployment
- Contract verification
- Gas optimization

**Quick Testnet Deploy:**

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with your private key and API keys

# 2. Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# 3. Verify on Etherscan
CONTRACT_ADDRESS=0x... npm run verify -- --network sepolia
```

---

## 💻 Usage

### Quick Interaction Scripts

We provide easy-to-use interaction scripts for common operations. See the **[Interaction Scripts Guide](./scripts/interactions/README.md)** for detailed documentation.

**Quick commands:**

```bash
# Create a zombie
ZOMBIE_NAME="DragonZombie" npm run interact:create

# View your zombies
npm run interact:get

# Level up a zombie (costs 0.001 ETH)
ZOMBIE_ID=0 npm run interact:levelup

# Change zombie name (requires level 2+)
ZOMBIE_ID=0 ZOMBIE_NAME="MegaDragon" npm run interact:changename
```

### Creating Your First Zombie

```javascript
const ZombieOwnership = await ethers.getContractFactory("ZombieOwnership");
const contract = await ZombieOwnership.deploy();

// Create a zombie
await contract.createRandomZombie("SuperZombie");

// Get your zombies
const zombies = await contract.getZombiesByOwner(yourAddress);
console.log("Your zombies:", zombies);
```

### Interactive Examples

```bash
# Use the general interact script
CONTRACT_ADDRESS=0x... npm run interact
```

This will:
1. Connect to your deployed contract
2. Create a zombie (if you don't have one)
3. Show zombie details (ID, name, DNA, level)
4. Display available functions

### Common Operations

```javascript
// Level up (costs 0.001 ETH)
await contract.levelUp(zombieId, { value: ethers.parseEther("0.001") });

// Change name (level 2+)
await contract.changeName(zombieId, "NewName");

// Attack another zombie
await contract.attack(myZombieId, targetZombieId);

// Transfer zombie
await contract.transferFrom(from, to, zombieId);
```

> 📖 **For more examples and detailed usage**, see the [Interaction Scripts Guide](./scripts/interactions/README.md)

---

## 🔧 Development

### Adding New Features

1. **Create contract in `contracts/`**
2. **Add tests in `test/`**
3. **Update deployment script if needed**
4. **Run tests**: `npm test`
5. **Check coverage**: `npm run coverage`

### Code Style

- **Solidity**: Follow OpenZeppelin style guide
- **TypeScript**: ESLint + Prettier (configure as needed)
- **Tests**: Descriptive test names, AAA pattern (Arrange, Act, Assert)

### Debugging

```bash
# Compile with debug info
npm run compile

# Run tests with stack traces
npm test -- --verbose

# Use Hardhat console
npx hardhat console --network localhost
```

### Gas Optimization

The project uses Hardhat's built-in optimizer:

```typescript
solidity: {
  version: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}
```

Enable gas reporting:

```bash
REPORT_GAS=true npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- ✅ Write tests for new features
- ✅ Maintain >90% test coverage
- ✅ Follow existing code style
- ✅ Update documentation
- ✅ Add TypeScript types

---

## 📚 Resources

### Learning

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)

### Original Tutorial

This project is based on the [CryptoZombies](https://cryptozombies.io/) tutorial, modernized to current industry standards.

### Community

- GitHub Issues: [Report bugs or request features](https://github.com/AlucardTeaching/cryptozombies/issues)
- Discussions: Share your zombies and get help

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🎯 Project Status

**Status**: ✅ Complete and production-ready

### Modernization Progress

- ✅ Solidity 0.5.x → 0.8.24
- ✅ Removed SafeMath (native overflow checks)
- ✅ OpenZeppelin integration
- ✅ Hardhat setup
- ✅ TypeScript conversion
- ✅ Comprehensive testing
- ✅ Deployment scripts
- ✅ Documentation

### Version History

- **v2.0.0** (2025) - Modernized to Solidity 0.8.24, TypeScript, Hardhat
- **v1.0.0** (2018-2019) - Original CryptoZombies tutorial

---

## 🙏 Acknowledgments

- Original CryptoZombies tutorial team
- OpenZeppelin for secure contract libraries
- Hardhat development framework
- Ethereum community

---

**Built with ❤️ for the Ethereum community**

Happy coding! 🧟‍♂️🎮
