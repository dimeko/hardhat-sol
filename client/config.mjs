
// Contract address and ABI (replace with your own)
const contractABI = [
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
    {
        "internalType": "string",
        "name": "name",
        "type": "string"
    },
    {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
    }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "destination",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "expectedArrivalDate",
        "type": "uint256"
    },
    {
        "internalType": "string",
        "name": "status",
        "type": "string"
    }
    ],
    "name": "addShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "address",
        "name": "user",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "entityType",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "role",
        "type": "uint256"
    }
    ],
    "name": "addUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "admin",
    "outputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
    ],
    "name": "entityTypes",
    "outputs": [
    {
        "internalType": "enum SupplyChain.EntityType",
        "name": "",
        "type": "uint8"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getEntities",
    "outputs": [
    {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
    },
    {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
    }
    ],
    "name": "getProduct",
    "outputs": [
    {
        "components": [
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
        }
        ],
        "internalType": "struct SupplyChain.Product",
        "name": "",
        "type": "tuple"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getProducts",
    "outputs": [
    {
        "components": [
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
        }
        ],
        "internalType": "struct SupplyChain.Product[]",
        "name": "",
        "type": "tuple[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getRoles",
    "outputs": [
    {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
    },
    {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "transferId",
        "type": "uint256"
    }
    ],
    "name": "getShipment",
    "outputs": [
    {
        "components": [
        {
            "internalType": "uint256",
            "name": "transferId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "origin",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "destination",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "dateOfDeparture",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "expectedArrivalDate",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "status",
            "type": "string"
        }
        ],
        "internalType": "struct SupplyChain.Shipment",
        "name": "",
        "type": "tuple"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }
    ],
    "name": "getUser",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getUsers",
    "outputs": [
    {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "productCount",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "name": "product_list",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    },
    {
        "internalType": "string",
        "name": "name",
        "type": "string"
    },
    {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "currentOwner",
        "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "name": "products",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    },
    {
        "internalType": "string",
        "name": "name",
        "type": "string"
    },
    {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "currentOwner",
        "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
    }
    ],
    "name": "removeProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }
    ],
    "name": "removeUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
    ],
    "name": "roles",
    "outputs": [
    {
        "internalType": "enum SupplyChain.Role",
        "name": "",
        "type": "uint8"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "shipmentCount",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "name": "shipments",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "transferId",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "origin",
        "type": "address"
    },
    {
        "internalType": "address",
        "name": "destination",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "dateOfDeparture",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "expectedArrivalDate",
        "type": "uint256"
    },
    {
        "internalType": "string",
        "name": "status",
        "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
    }
    ],
    "name": "trackProduct",
    "outputs": [
    {
        "components": [
        {
            "internalType": "uint256",
            "name": "transferId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "origin",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "destination",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "dateOfDeparture",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "expectedArrivalDate",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "status",
            "type": "string"
        }
        ],
        "internalType": "struct SupplyChain.Shipment[]",
        "name": "",
        "type": "tuple[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "transferId",
        "type": "uint256"
    },
    {
        "internalType": "string",
        "name": "status",
        "type": "string"
    }
    ],
    "name": "updateShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
    ],
    "name": "users",
    "outputs": [
    {
        "internalType": "enum SupplyChain.EntityType",
        "name": "entityType",
        "type": "uint8"
    },
    {
        "internalType": "enum SupplyChain.Role",
        "name": "role",
        "type": "uint8"
    }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "name": "users_list",
    "outputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
}
]

// Replace this with the address that the contract deployment gave you! Do not forget! 
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export {
    contractABI,
    contractAddress
}