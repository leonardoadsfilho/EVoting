//SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        string vice;
        uint8 age;
        uint8 number;
        string party;
        uint votes;
        string state;
        string city;
        bool is_alive;
    }

    struct Voter {
        string cpf;
        uint8 age;
        string state;
        string city;
    }

    enum ElectionLevel {
        Presidencial,
        Estadual,
        Municipal
    }

    // manager of election
    address private _manager;

    // Voters Data
    mapping (string => address) private _cpf_to_address_voter;
    mapping (address => bool) private _address_vote;
    mapping (address => Voter) private _voters;

    // Candidates Data
    uint public candidates_count;
    mapping (uint => uint) public number_to_id_candidate;
    mapping (uint => Candidate) public candidates;
    
    // Election properties
    string public election_name;
    uint public votation_time;
    bool public is_election_open;
    ElectionLevel public election_level;
    uint256 public last_emit_ElectionResult;
    uint256 public cooldown_ElectionResult = 1 hours; 
    
    constructor(string memory _election_name, ElectionLevel _election_level) {
        _manager = msg.sender;
        election_name = _election_name;
        is_election_open = true;
        election_level = _election_level;
        last_emit_ElectionResult = block.timestamp;

        number_to_id_candidate[0] = 0;
        candidates[0] = Candidate(0, 'NULL_AND_BLANK', 'NULL_AND_BLANK', 0, 0, 'NULL_AND_BLANK', 0, '00', 'NULL_AND_BLANK', true);

        candidates_count = 1;
    }

    modifier OnlyManager() {
        require(msg.sender == _manager);
        _;
    }

    modifier IsOnVotingTime {
        require(block.timestamp - votation_time < 1 days && votation_time != 0, unicode'Fora do período de votação');
        _;
    }

    modifier IsElectionStarted {
        require(votation_time == 0, unicode'Eleição em andamento');
        _;
    }

    modifier IsElectionClosed {
        require(is_election_open == true, unicode'Eleição encerrada');
        _;
    }

    modifier ValidateElectionLevel(uint number) {
        bytes32 userStateHash = keccak256(abi.encodePacked(_voters[msg.sender].state));
        bytes32 candidateStateHash = keccak256(abi.encodePacked(candidates[number_to_id_candidate[number]].state));

        bytes32 userCityHash = keccak256(abi.encodePacked(_voters[msg.sender].city));
        bytes32 candidateCityHash = keccak256(abi.encodePacked(candidates[number_to_id_candidate[number]].city));

        if(number_to_id_candidate[number] != 0){
            if (election_level == ElectionLevel.Estadual) {
                require(userStateHash == candidateStateHash, 'Candidato pertence a outro estado.');
            }

            if (election_level == ElectionLevel.Municipal) {            
                require(userCityHash == candidateCityHash, 'Candidato pertence a outra cidade.');
            }
        }

        _;
    }
    
    event Notify(string menssage);

    event ElectionResult(Candidate[] result);

    function SetElectionName(string memory new_election_name) external OnlyManager IsElectionStarted IsElectionClosed {
        election_name = new_election_name;

        emit Notify(unicode'Nome da eleição alterado para {name}.');
    }

    function StartElection() external OnlyManager IsElectionStarted IsElectionClosed {

        votation_time = block.timestamp;

        emit Notify(unicode'Eleição {election_name} iniciada.');
    }

    function EndElection() external OnlyManager IsElectionClosed {
        require(votation_time != 0, 'Eleicao nao iniciada');

        votation_time = 0;
        is_election_open = false;

        emit Notify(unicode'Fim da eleição {election_name}.');
    }

    function RegisterCandidate(string memory name, string memory vice_name, uint8 age, uint8 number, string memory party, string memory state, string memory city) external OnlyManager IsElectionStarted IsElectionClosed {
        require(number_to_id_candidate[number] == 0, 'Esse numero ja foi registrado.');    

        number_to_id_candidate[number] = candidates_count;
        candidates[candidates_count] = Candidate(candidates_count, name, vice_name, age, number, party, 0, state, city, true);

        candidates_count++;
    }

    function GetCandidates() public view returns(Candidate[] memory candidates_array) {
        Candidate[] memory _candidates = new Candidate[](candidates_count);

        for(uint i = 0; i < candidates_count; i++){
            _candidates[i] = candidates[i];
        }

        return(_candidates);
    }

    function RegisterVoter(string memory cpf, uint8 age, string memory state, string memory city) external IsElectionStarted IsElectionClosed {

        require(bytes(cpf).length > 0, 'CPF nao fornecido.');
        require(age > 0, 'Idade invalida.');
        require(bytes(state).length > 0, 'Estado nao fornecido');
        require(bytes(city).length > 0, 'Cidade nao fornecida');
        require(bytes(_voters[msg.sender].cpf).length == 0, 'Este endereco ja esta registrado.');
        require(_cpf_to_address_voter[cpf] == address(0), 'Este CPF ja esta registrado.');

        _cpf_to_address_voter[cpf] = msg.sender;

        _voters[msg.sender] = Voter(cpf, age, state, city);
    }

    function Vote(string memory cpf, uint number) external IsOnVotingTime IsElectionClosed ValidateElectionLevel(number) {

        require(_manager != msg.sender, 'Gerente de eleicao nao pode votar');
        require(_address_vote[msg.sender] == false, 'Este endereco ja votou');
        require(_cpf_to_address_voter[cpf] == msg.sender, 'Este CPF nao esta cadastrado na mesma conta');
        require(keccak256(bytes(_voters[msg.sender].cpf)) == keccak256(bytes(cpf)), 'Este CPF nao pertence ao eleitor registrado');

        if(number < 0 || number > candidates_count ){
            candidates[number_to_id_candidate[0]].votes += 1;
        }else{
            candidates[number_to_id_candidate[number]].votes += 1;
        }

        _address_vote[msg.sender] = true;

        if(block.timestamp - last_emit_ElectionResult > cooldown_ElectionResult){
            last_emit_ElectionResult = block.timestamp;
            emit ElectionResult(GetCandidates());
        }
    }

    function SelfDestruct() external OnlyManager {
        selfdestruct(payable(msg.sender));
    }
}