// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceEscrow {
    
    //  Structure d'une mission
    struct Mission {
        address client;
        address freelance;
        uint256 montant;
        bool estPayee;
        bool estTerminee;
        bool estRemboursee;
        string titre;
    }

    //  Stockage des missions
    mapping(uint256 => Mission) public missions;
    uint256 public nombreMissions;

    //  Événements
    event MissionCreee(uint256 indexed id, address client, string titre, uint256 montant);
    event FreelanceAssigne(uint256 indexed id, address freelance);
    event PaiementLibere(uint256 indexed id, address freelance, uint256 montant);
    event PaiementRembourse(uint256 indexed id, address client, uint256 montant);

    //  Modificateurs
    modifier seulementClient(uint256 _id) {
        require(msg.sender == missions[_id].client, "Seul le client peut faire ca");
        _;
    }

    modifier missionExiste(uint256 _id) {
        require(_id < nombreMissions, "Mission inexistante");
        _;
    }

    //  1. Créer une mission avec paiement
    function creerMission(string memory _titre) external payable {
        require(msg.value > 0, "Le paiement doit etre superieur a 0");

        missions[nombreMissions] = Mission({
            client: msg.sender,
            freelance: address(0),
            montant: msg.value,
            estPayee: false,
            estTerminee: false,
            estRemboursee: false,
            titre: _titre
        });

        emit MissionCreee(nombreMissions, msg.sender, _titre, msg.value);
        nombreMissions++;
    }

    //  2. Assigner un freelance
    function assignerFreelance(uint256 _id, address _freelance) 
        external 
        missionExiste(_id) 
        seulementClient(_id) 
    {
        require(missions[_id].freelance == address(0), "Freelance deja assigne");
        require(_freelance != address(0), "Adresse invalide");
        require(_freelance != msg.sender, "Client ne peut pas etre freelance");

        missions[_id].freelance = _freelance;
        emit FreelanceAssigne(_id, _freelance);
    }

    //  3. Libérer le paiement au freelance
    function libererPaiement(uint256 _id) 
        external 
        missionExiste(_id) 
        seulementClient(_id) 
    {
        Mission storage mission = missions[_id];
        
        require(mission.freelance != address(0), "Aucun freelance assigne");
        require(!mission.estPayee, "Deja paye");
        require(!mission.estRemboursee, "Deja rembourse");

        mission.estPayee = true;
        mission.estTerminee = true;

        // Envoyer l'argent au freelance
        (bool succes, ) = payable(mission.freelance).call{value: mission.montant}("");
        require(succes, "Echec du paiement");

        emit PaiementLibere(_id, mission.freelance, mission.montant);
    }

    //  4. Rembourser le client (si problème)
    function rembourserClient(uint256 _id) 
        external 
        missionExiste(_id) 
        seulementClient(_id) 
    {
        Mission storage mission = missions[_id];
        
        require(!mission.estPayee, "Deja paye au freelance");
        require(!mission.estRemboursee, "Deja rembourse");

        mission.estRemboursee = true;

        // Rembourser le client
        (bool succes, ) = payable(mission.client).call{value: mission.montant}("");
        require(succes, "Echec du remboursement");

        emit PaiementRembourse(_id, mission.client, mission.montant);
    }

    //  5. Voir une mission
    function getMission(uint256 _id) 
        external 
        view 
        missionExiste(_id) 
        returns (
            address client,
            address freelance,
            uint256 montant,
            bool estPayee,
            bool estTerminee,
            string memory titre
        ) 
    {
        Mission storage mission = missions[_id];
        return (
            mission.client,
            mission.freelance,
            mission.montant,
            mission.estPayee,
            mission.estTerminee,
            mission.titre
        );
    }

    //  Voir le solde du contrat
    function getSolde() external view returns (uint256) {
        return address(this).balance;
    }
}