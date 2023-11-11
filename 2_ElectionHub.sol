//SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import './1_Election.sol';

contract ElectionHub {

    struct ElectionContract {
        address _address;
        string _abi;
    }

    address private _manager;
    uint private _funds;

    mapping (uint => ElectionContract) public elections;
    uint public elections_count;

    constructor(){
        _manager = msg.sender;
    }
    
    modifier OnlyManager() {
        require(msg.sender == _manager);
        _;
    }

    // Função para registrar um contrato com seu ABI e endereço
    function registerContract(address contract_address, string memory contract_abi) external OnlyManager {
        require(contract_address != address(0), unicode'Endereço do contrato inválido');
        require(bytes(contract_abi).length > 0, unicode'ABI do contrato inválida');

        elections[elections_count] = ElectionContract({
            _address: contract_address,
            _abi: contract_abi
        });

        elections_count++;
    }

    function GetElection(uint id_contract) external view returns (ElectionContract memory election) {
        return elections[id_contract];
    }
    
    function SelfDestruct() external OnlyManager {
        selfdestruct(payable(msg.sender));
    }

    
    function ReceiveFunds() external payable {
        _funds = msg.value;
    }

    function SendFunds(address payable _address, uint value) external {
        require(msg.sender == _manager, unicode'Somente o Gerente pode transferir o saldo');
        require(_funds - value > 0, unicode'O saldo do contrato é zero');

        _address.transfer(value);
        _funds -= value;
    }
}