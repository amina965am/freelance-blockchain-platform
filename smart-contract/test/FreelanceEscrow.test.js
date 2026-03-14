import { expect } from "chai";
import hre from "hardhat";

describe("FreelanceEscrow", function () {
  let contrat;
  let client;
  let freelance;
  let autrePerson;

  beforeEach(async function () {
    [client, freelance, autrePerson] = await hre.ethers.getSigners();
    const FreelanceEscrow = await hre.ethers.getContractFactory("FreelanceEscrow");
    contrat = await FreelanceEscrow.deploy();
    await contrat.waitForDeployment();
  });

  it("✅ Devrait créer une mission avec paiement", async function () {
    const montant = hre.ethers.parseEther("1.0");
    await contrat.connect(client).creerMission("Créer un site web", { value: montant });
    const mission = await contrat.getMission(0);
    expect(mission.client).to.equal(client.address);
    expect(mission.montant).to.equal(montant);
    expect(mission.titre).to.equal("Créer un site web");
    expect(mission.estPayee).to.equal(false);
    console.log("✅ Mission créée avec succès !");
  });

  it("✅ Devrait assigner un freelance", async function () {
    const montant = hre.ethers.parseEther("1.0");
    await contrat.connect(client).creerMission("Créer un site web", { value: montant });
    await contrat.connect(client).assignerFreelance(0, freelance.address);
    const mission = await contrat.getMission(0);
    expect(mission.freelance).to.equal(freelance.address);
    console.log("✅ Freelance assigné avec succès !");
  });

  it("✅ Devrait libérer le paiement au freelance", async function () {
    const montant = hre.ethers.parseEther("1.0");
    await contrat.connect(client).creerMission("Créer un site web", { value: montant });
    await contrat.connect(client).assignerFreelance(0, freelance.address);
    const soldeAvant = await hre.ethers.provider.getBalance(freelance.address);
    await contrat.connect(client).libererPaiement(0);
    const soldeApres = await hre.ethers.provider.getBalance(freelance.address);
    expect(soldeApres).to.be.gt(soldeAvant);
    console.log("✅ Paiement libéré avec succès !");
  });

  it("✅ Devrait rembourser le client", async function () {
    const montant = hre.ethers.parseEther("1.0");
    await contrat.connect(client).creerMission("Créer un site web", { value: montant });
    const soldeAvant = await hre.ethers.provider.getBalance(client.address);
    await contrat.connect(client).rembourserClient(0);
    const soldeApres = await hre.ethers.provider.getBalance(client.address);
    expect(soldeApres).to.be.gt(soldeAvant);
    console.log("✅ Client remboursé avec succès !");
  });

  it("❌ Devrait refuser si non-client essaie de libérer", async function () {
    const montant = hre.ethers.parseEther("1.0");
    await contrat.connect(client).creerMission("Créer un site web", { value: montant });
    await contrat.connect(client).assignerFreelance(0, freelance.address);
    await expect(
      contrat.connect(autrePerson).libererPaiement(0)
    ).to.be.revertedWith("Seul le client peut faire ca");
    console.log("✅ Sécurité vérifiée !");
  });

  it("❌ Devrait refuser mission sans paiement", async function () {
    await expect(
      contrat.connect(client).creerMission("Créer un site web", { value: 0 })
    ).to.be.revertedWith("Le paiement doit etre superieur a 0");
    console.log("✅ Validation du montant vérifiée !");
  });
});