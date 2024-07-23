// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum Role { Administrator, Supplier, LogisticEmployee, Controller }
    enum EntityType { None, Supplier, Transfer, LogisticEmployee, Distributor, Storage }

    struct Product {
        uint id;
        string name;
        uint quantity;
        address currentOwner;
    }

    struct Shipment {
        uint transferId;
        uint productId;
        address origin;
        address destination;
        uint dateOfDeparture;
        uint expectedArrivalDate;
        string status;
    }

    struct User {
        EntityType entityType;
        Role role;
    }

    address[] public users_list;
    Product[] public product_list;

    address public admin;
    uint public productCount;
    uint public shipmentCount;
    
    mapping(uint => Product) public products;
    mapping(uint => Shipment) public shipments;
    mapping(address => User) public users;
    mapping(address => bool) private userExists;

    mapping(string => EntityType) public entityTypes;
    mapping(string => Role) public roles;

    // Modifiers
    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Administrator, "Not authorized");
        _;
    }

    modifier onlySupplier() {
        require(users[msg.sender].role == Role.Supplier, "Not authorized");
        _;
    }

    modifier onlyLogisticEmployee() {
        require(users[msg.sender].role == Role.LogisticEmployee, "Not authorized");
        _;
    }

    modifier onlyController() {
        require(users[msg.sender].role == Role.Controller, "Not authorized");
        _;
    }

    modifier onlyAuthorized(Role role) {
        require(users[msg.sender].role == role, "Not authorized");
        _;
    }

    // Constructor
    constructor() {
        admin = msg.sender;
        User memory adminUser = User(EntityType.None, Role.Administrator);
        users[admin] = adminUser;
        users_list.push(admin);
        userExists[admin] = true;
        productCount = 0;
        shipmentCount = 0;

        for (uint i = 0; i < uint(EntityType.Storage) + 1; i++) {
            entityTypes[getEntityTypeString(EntityType(i))] = EntityType(i);
        }
        for (uint j = 0; j < uint(Role.Controller) + 1; j++) {
            roles[getRoleString(Role(j))] = Role(j);
        }
    }

    // Function to add a user
    function addUser(address user, uint entityType, uint role) public onlyAdmin {
        User memory newUser = User(EntityType(entityType), Role(role));
        if(userExists[user] == true) {
            revert("User already exists");
        }
        if( (newUser.role == Role.Supplier && (newUser.entityType != EntityType.Supplier && newUser.entityType != EntityType.Transfer)) ||
            (newUser.role == Role.LogisticEmployee && (newUser.entityType != EntityType.LogisticEmployee && newUser.entityType != EntityType.Distributor)) ||
            (newUser.role == Role.Controller && newUser.entityType != EntityType.Storage)) 
        {
            revert("Cannot create user with such combination of entity type and role. ");
        }
        users[user] = newUser;
        users_list.push(user);
        userExists[user] = true;
    }

    // Function to remove a user
    function removeUser(address user) public onlyAdmin {
        delete users[user];
        userExists[user] = false;
        uint length = users_list.length;
        for (uint i = 0; i < length; i++) {
            if (keccak256(abi.encodePacked(users_list[i])) == keccak256(abi.encodePacked(user))) {
                users_list[i] = users_list[length - 1];
                users_list.pop();
                return;
            }
        }
    }

    function getUser(address user) public view returns (uint , uint ) {
        return (uint(users[user].role), uint(users[user].entityType));
    }

    function getRoles() public onlyAdmin view returns (string[] memory, uint[] memory)  {
        string[] memory _rolesNames = new string[](uint(Role.Controller));
        for (uint i = 0; i < uint(Role.Controller); i++) {
            _rolesNames[i] = getRoleString(Role(i));
        }

        uint[] memory _rolesNumbers = new uint[](uint(Role.Controller));
        for (uint i = 0; i < uint(Role.Controller); i++) {
            _rolesNumbers[i] = uint(Role(i));
        }
    
        return (_rolesNames, _rolesNumbers);
    }

    function getEntities() public onlyAdmin view returns (string[] memory, uint[] memory)  {
        string[] memory _entityNames = new string[](uint(Role.Controller));
        for (uint i = 0; i < uint(Role.Controller); i++) {
            _entityNames[i] = getRoleString(Role(i));
        }

        uint[] memory _entityNumbers = new uint[](uint(Role.Controller));
        for (uint i = 0; i < uint(Role.Controller); i++) {
            _entityNumbers[i] = uint(Role(i));
        }
    
        return (_entityNames, _entityNumbers);
    }

    function getUsers() public view returns (address[] memory) {
        return users_list;
    }

    function getEntityTypeString(EntityType _entityType) internal pure returns (string memory) {
        if (_entityType == EntityType.None) return "None";
        if (_entityType == EntityType.Supplier) return "Supplier";
        if (_entityType == EntityType.Transfer) return "Transfer";
        if (_entityType == EntityType.LogisticEmployee) return "LogisticEmployee";
        if (_entityType == EntityType.Distributor) return "Distributor";
        if (_entityType == EntityType.Storage) return "Storage";
        return "";
    }

    function getRoleString(Role _role) internal pure returns (string memory) {
        if (_role == Role.Administrator) return "Administrator";
        if (_role == Role.Supplier) return "Supplier";
        if (_role == Role.LogisticEmployee) return "LogisticEmployee";
        if (_role == Role.Controller) return "Controller";
        return "";
    }

    function addProduct(string memory name, uint quantity) public onlySupplier {
        productCount++;
        Product memory newProduct = Product(productCount, name, quantity, msg.sender);
        products[productCount] = newProduct;
        product_list.push(newProduct);
    }

    function removeProduct(uint productId) public onlyAdmin {
        delete products[productId];
        for (uint i = 0; i < productCount; i++) {
            if (product_list[i].id == productId) {
                product_list[i] = product_list[productCount - 1];
                product_list.pop();
                return;
            }
        }
    }

    function getProducts() public view returns (Product[] memory) {
        return product_list;
    }

    function addShipment(uint productId, address destination, uint expectedArrivalDate, string memory status) public {
        // uint tmp = users[msg.sender].entityType;
        if(uint(users[destination].entityType) == uint(users[msg.sender].entityType) + 1
           || uint(users[destination].entityType) == uint(users[msg.sender].entityType) - 1) {
            shipmentCount++;
            shipments[shipmentCount] = Shipment(shipmentCount, productId, msg.sender, destination, block.timestamp, expectedArrivalDate, status);
            products[productId].currentOwner = destination;
        } else {
            revert("You cannot send the shipment on this destination.");
        }
    }

    // Function to update shipment status
    function updateShipment(uint transferId, string memory status) public onlyLogisticEmployee {
        shipments[transferId].status = status;
    }

    // Function to get product details
    function getProduct(uint productId) public view returns (Product memory) {
        require(users[msg.sender].role == Role.Controller || products[productId].currentOwner == msg.sender, "Not authorized");
        return products[productId];
    }

    // Function to get shipment details
    function getShipment(uint transferId) public view returns (Shipment memory) {
        require(users[msg.sender].role == Role.Controller || shipments[transferId].origin == msg.sender || shipments[transferId].destination == msg.sender, "Not authorized");
        return shipments[transferId];
    }
    
    function trackProduct(uint productId) public view returns (Shipment[] memory) {
        if(users[msg.sender].role == Role.Supplier) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.Transfer);
            return productShipments;
        } else if(users[msg.sender].role == Role.LogisticEmployee) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.Distributor);
            return productShipments;
        } else if(users[msg.sender].role == Role.Controller) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.Storage);
            return productShipments;
        } else {
            revert("Something bad happened");
        }
    }

    function _productShipments(uint productId, EntityType entityType) private view returns (Shipment[] memory) {
        uint count = 0;
        for (uint i = 1; i <= shipmentCount; i++) {
            if (shipments[i].productId == productId ){
                if(users[shipments[i].destination].entityType <= entityType) {
                    count++;
                } else {
                    revert("No permission to view the current shipment history");
                }
            }
        }

        if (count == 0 ) {
            revert("No shipment found for this product id");
        }
        
        Shipment[] memory productShipments = new Shipment[](count);
        uint index = 0;
        for (uint i = 1; i <= shipmentCount; i++) {
            if (shipments[i].productId == productId ){
                if(users[shipments[i].destination].entityType <= entityType) {
                    productShipments[index] = shipments[i];
                    index++;
                } else {
                    break;
                }
            }
        }
        
        return productShipments;
    }
}