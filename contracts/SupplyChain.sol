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
        uint shipmentId;
        uint productId;
        address origin;
        address destination;
        uint dateOfDeparture;
        uint expectedArrivalDate;
        uint quantity;
        string status;
    }

    struct User {
        EntityType entityType;
        Role role;
    }

    address[] public users_list;
    uint[] public product_list;

    address public admin;
    uint public productCount;
    uint public shipmentCount;
    
    mapping(uint => Product) public products;
    mapping(uint => Shipment) public shipments;
    mapping(address => User) public users;

    event ProductAdded(uint product);
    event UserAdded(address user);
    event ProductDeleted(uint product);
    event UserDeleted(address user);
    event ShipmentAdded(uint shipment, address toDestination);
    event ShipmentUpdated(uint shipment, string status);

    error UserNotAdded(string errorMessage, address user);
    error ProductNotDeleted(string errorMessage, uint product);
    error UserNotDeleted(string errorMessage, address user);
    error ShipmentNotAdded(string errorMessage, uint shipment, address toDestination);
    error ShipmentNotUpdated(string errorMessage, uint shipment);
    error CannotTrackShipment(string errorMessage, uint productId);
    error NotFoundShipment(string errorMessage, uint productId);
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

    constructor() {
        admin = msg.sender;
        User memory adminUser = User(EntityType.None, Role.Administrator);
        users[admin] = adminUser;
        users_list.push(admin);
        productCount = 0;
        shipmentCount = 0;
    }

    // Users methods --------------------------------------------------------------------------------------------------------------------------------------------------------------

    function _userExists(address _adr) private view returns (bool) {
        for (uint256 i = 0; i < users_list.length; i++) {
            if (users_list[i] == _adr) {
                return true;
            }
        }
        return false;
    } 

    // Function to add a user
    function addUser(address user, uint entityType, uint role) public onlyAdmin {
        User memory newUser = User(EntityType(entityType), Role(role));
        if(_userExists(user) == true) {
            revert UserNotAdded("User already exists", user);
        }

        if(newUser.role == Role.Administrator) {
            revert UserNotAdded("Addin admin user is permitted", user);
        }

        if( (newUser.role == Role.Supplier && (newUser.entityType != EntityType.Supplier && newUser.entityType != EntityType.Transfer)) ||
            (newUser.role == Role.LogisticEmployee && (newUser.entityType != EntityType.LogisticEmployee && newUser.entityType != EntityType.Distributor)) ||
            (newUser.role == Role.Controller && newUser.entityType != EntityType.Storage)) 
        {
            revert UserNotAdded("Cannot create user with such combination of entity type and role. ", user);
        }
        users[user] = newUser;
        users_list.push(user);
        emit UserAdded(user);
    }

    // Function to remove a user
    function removeUser(address user) public onlyAdmin {
        if(user == admin) {
            revert UserNotDeleted("Cannot remove admin!", user);
        }
        uint length = users_list.length;
        for (uint i = 0; i < length; i++) {
            if (keccak256(abi.encodePacked(users_list[i])) == keccak256(abi.encodePacked(user))) {
                users_list[i] = users_list[length - 1];
                users_list.pop();
                delete users[user];
                emit UserDeleted(user);
                return;
            }
        }
        revert UserNotDeleted("Cannot remove user!", user);
    }

    function getUser(address user) public view returns (uint , uint ) {
        return (uint(users[user].role), uint(users[user].entityType));
    }

    function getUsers() public view returns (address[] memory) {
        return users_list;
    }

    // Products methods --------------------------------------------------------------------------------------------------------------------------------------------------------------

    function addProduct(string memory name, uint quantity) public onlySupplier {
        productCount++;
        Product memory newProduct = Product(productCount, name, quantity, msg.sender);
        products[productCount] = newProduct;
        product_list.push(productCount);
        emit ProductAdded(newProduct.id);
    }

    function removeProduct(uint productId) public onlyAdmin {
        for (uint i = 0; i < productCount; i++) {
            if (product_list[i] == productId) {
                product_list[i] = product_list[productCount - 1];
                delete products[productId];
                product_list.pop();
                emit ProductDeleted(productId);
                return;
            }
        }
        revert ProductNotDeleted("Could not remove product", productId);
    }

   function getProduct(uint productId) public view returns (Product memory) {
        return products[productId];
    }

    function getProducts() public view returns (uint[] memory) {
        return product_list;
    }

    // Shipment methods --------------------------------------------------------------------------------------------------------------------------------------------------------------

    function addShipment(uint productId, address destination, uint expectedArrivalDate, string memory status, uint quantity) public {
        if(uint(users[destination].entityType) == uint(users[msg.sender].entityType) + 1
           || uint(users[destination].entityType) == uint(users[msg.sender].entityType) - 1) {
            if(products[productId].quantity >= quantity) {
                shipmentCount++;
                shipments[shipmentCount] = Shipment(
                    shipmentCount,
                    productId,
                    msg.sender,
                    destination,
                    block.timestamp,
                    expectedArrivalDate,
                    quantity,
                    status);
                products[productId].currentOwner = destination;
                emit ShipmentAdded(productId, destination);
            } else {
                revert ShipmentNotAdded("Not enough products", productId, destination);
            }
        } else {
            revert ShipmentNotAdded("Can not send shipment to this user", productId, destination);
        }
    }

    function updateShipment(uint shipmentId, string memory status) public  {
        if(msg.sender != shipments[shipmentId].origin) {
            revert ShipmentNotUpdated("You must be the sender of the shipment.", shipmentId);
        }
        shipments[shipmentId].status = status;
        emit ShipmentUpdated(shipmentId, status);
    }

    function getShipment(uint shipmentId) public view returns (Shipment memory) {
        require(users[msg.sender].role == Role.Controller || shipments[shipmentId].origin == msg.sender || shipments[shipmentId].destination == msg.sender, "Not authorized");
        return shipments[shipmentId];
    }
    
    // Track shipment methods --------------------------------------------------------------------------------------------------------------------------------------------------------------

    function trackProduct(uint productId) public view returns (Shipment[] memory) {
        if(users[msg.sender].role == Role.Supplier) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.Transfer);
            return productShipments;
        } else if(users[msg.sender].role == Role.LogisticEmployee) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.LogisticEmployee);
            return productShipments;
        } else if(users[msg.sender].role == Role.Controller) {
            Shipment[] memory productShipments = _productShipments(productId, EntityType.Storage);
            return productShipments;
        } else {
            revert("Something bad happened");
        }
    }


    function _isSenderShipmentParticipant(Shipment memory shipment, EntityType entityType ) private view returns (bool) {
        return users[shipment.destination].entityType <= entityType || msg.sender == shipment.origin || msg.sender == shipment.destination;
    } 

    function _productShipments(uint productId, EntityType entityType) private view returns (Shipment[] memory) {
        uint count = 0;
        for (uint i = 1; i <= shipmentCount; i++) {
            if (shipments[i].productId == productId ){
                if(_isSenderShipmentParticipant(shipments[i], entityType)) {
                    count++;
                } else {
                    revert CannotTrackShipment("No permission to view the current shipment history", productId);
                }
            }
        }

        if (count == 0 ) {
            revert NotFoundShipment("No shipment found for this product id", productId);
        }
        
        Shipment[] memory productShipments = new Shipment[](count);
        uint index = 0;
        for (uint i = 1; i <= shipmentCount; i++) {
            if (shipments[i].productId == productId ){
                if(_isSenderShipmentParticipant(shipments[i], entityType)) {
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