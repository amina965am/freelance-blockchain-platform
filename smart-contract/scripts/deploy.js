import hre from "hardhat";

async function main() {
  console.log("🚀 Déploiement du contrat FreelanceEscrow...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Déployé par :", deployer.address);

  const solde = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Solde :", hre.ethers.formatEther(solde), "ETH");

  const FreelanceEscrow = await hre.ethers.getContractFactory("FreelanceEscrow");
  const contrat = await FreelanceEscrow.deploy();
  await contrat.waitForDeployment();

  const adresse = await contrat.getAddress();
  console.log("✅ Contrat déployé à :", adresse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erreur :", error);
    process.exit(1);
  });