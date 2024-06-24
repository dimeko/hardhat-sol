const { createApp, ref } = Vue

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
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const PharmaSupplyChain = {
    template: `

    <h1>Pharma Supply Chain</h1>
        <div class="toast" v-if="showToast" :class="toastType">
            {{ toastMessage }}
        </div>
        <div class="section">
            <h2>Add User</h2>
            <div class="form-group">
                <label for="newUser">User Address:</label>
                <select v-model="newUser" id="newUser" class="form-control">
                    <option v-for="(value, key) in accounts" :value="value">{{ value }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="entityType">Entity Type:</label>
                <select v-model="newUserEntityType" id="entityType" class="form-control">
                    <option v-for="(value, key) in entityTypes" :value="key">{{ value }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="role">Role:</label>
                <select v-model="newUserRole" id="role" class="form-control">
                    <option v-for="(value, key) in roles" :value="key">{{ value }}</option>
                </select>
            </div>
            <button @click="addUser" class="btn">Add User</button>
        </div>

        <div class="section">
            <h2>Users</h2>
            <ul class="user-list">
                <li v-for="user in users">
                    <p>Account: {{ user['account'] }}, Entity type: {{entityTypes[user['entityType']]}}, Role: {{roles[user['role']]}}</p>
                </li>
            </ul>
            <button @click="listUsers" class="btn">List Users</button>
        </div>

        <div class="section">
            <h2>Add Product</h2>
            <div class="form-group">
                <label for="productName">Product Name:</label>
                <input v-model="productName" id="productName" class="form-control">
            </div>
            <div class="form-group">
                <label for="productQuantity">Quantity:</label>
                <input v-model="productQuantity" id="productQuantity" type="number" class="form-control">
            </div>
            <button @click="addProduct" class="btn">Add Product</button>
        </div>

        <div class="section">
            <h2>Add Shipment</h2>
            <div class="form-group">
                <label for="shipmentProductId">Product ID:</label>
                <input v-model="shipmentProductId" id="shipmentProductId" type="number" class="form-control">
            </div>
            <div class="form-group">
                <label for="shipmentDestination">Destination Address:</label>
                <input v-model="shipmentDestination" id="shipmentDestination" class="form-control">
            </div>
            <div class="form-group">
                <label for="shipmentArrivalDate">Expected Arrival Date:</label>
                <input v-model="shipmentArrivalDate" id="shipmentArrivalDate" type="date" class="form-control">
            </div>
            <div class="form-group">
                <label for="shipmentStatus">Status:</label>
                <input v-model="shipmentStatus" id="shipmentStatus" class="form-control">
            </div>
            <button @click="addShipment" class="btn">Add Shipment</button>
        </div>

        <div class="section">
            <h2>Track Product</h2>
            <div class="form-group">
                <label for="trackProductId">Product ID:</label>
                <input v-model="trackProductId" id="trackProductId" type="number" class="form-control">
            </div>
            <button @click="trackProduct" class="btn">Track Product</button>
        </div>

        <div class="section">
            <h2>Shipment History</h2>
            <ul class="shipment-history">
                <li v-for="shipment in shipmentHistory">
                    <p>from {{shipment['origin']}} -> to {{shipment['ordestinationigin']}}, departure on: {{shipment['dateOfDeparture']}}, expected on: {{shipment['expectedArrivalDate']}}, , status: {{shipment['status']}}   </p>
                </li>
            </ul>
        </div>

        <div class="section">
            <h2>Select user to impersonate</h2>
            <div class="form-group">
                <label for="currentAccount">Accounts list:</label>
                <select v-model="currentAccount" id="currentAccount" @change="getCurrentUserDetails($event)" class="form-control">
                    <option v-for="(value, key) in accounts" :value="value">{{ value }}</option>
                </select>
            </div>
            <div class="current-user-details">
                <p>Current user: {{currentAccount}}</p>
                <p>Role: {{roles[currentAccountRole]}}</p>
                <p>Entity type: {{entityTypes[currentAccountEntityType]}}</p>
            </div>
        </div>
        `,
    data() {
        return {
            web3: null,
            contract: null,
            newUser: '',
            newUserEntityType: '',
            newUserRole: '',
            entityTypes: {
                0: 'None',
                1: 'Supplier',
                2: 'Transfer',
                3: 'LogisticEmployee',
                4: 'Distributor',
                5: 'Storage'
            },
            roles: {
                0: 'Administrator',
                1: 'Supplier',
                2: 'LogisticEmployee',
                3: 'Controller'
            },
            accounts: [],
            users: [],
            productName: '',
            productQuantity: 0,
            shipmentProductId: 0,
            shipmentDestination: '',
            shipmentArrivalDate: '',
            shipmentStatus: '',
            trackProductId: 0,
            shipmentHistory: [],
            currentAccount: "",
            currentAccountRole: "",
            currentAccountEntityType: "",
            showToast: false,
            toastMessage: '',
            toastType: ''
        }
    },
    methods: {
        showToastMessage(message, type) {
            this.toastMessage = message;
            this.toastType = type;
            this.showToast = true;
            
            setTimeout(() => {
              this.showToast = false;
            }, 7000); // Toast will disappear after 3 seconds
        },
        async loadWeb3() {
            this.web3 = new Web3('http://localhost:8545');
        },
        async loadContract() {
            this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
        },
        // async isContractUser() {
        //     try {
        //         return this.users.includes(currentAccount);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        async getCurrentUserDetails(select_item) {
            const containsTargetValue = this.users.some(o => o.account === select_item.target.value);
            this.currentAccount = select_item.target.value
            if(!containsTargetValue) {
                this.currentAccountEntityType = ""
                this.currentAccountRole = ""
                this.showToastMessage("Cannot select this account. Not in local users list, try fetching the user list first", "error")
                return;
            }
            try {
                const _r = await this.contract.methods.getUser(select_item.target.value).call();
                this.currentAccountEntityType = _r[1]
                this.currentAccountRole = _r[0]
            } catch (error) {
                console.error(error);
            }
        },
        async addUser() {
            try {
                console.log(this.currentAccount)
                await this.contract.methods.addUser(this.newUser, this.newUserEntityType, this.newUserRole).send({ from: this.currentAccount });
                this.showToastMessage("User added successfully", "success")
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async listUsers() {
            try {
                await this.contract.methods.getUsers().call().then((_r) => {
                    this.users = []
                    _r.forEach(async _ac =>{
                        const _r = await this.contract.methods.getUser(_ac).call();
                        console.log(_r)
                        this.users.push({"account": _ac, "entityType": _r[1],  "role": _r[0]})
                    });
                });
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async addProduct() {
            try {
                console.log("Addidng product with account: ", this.currentAccount)
                await this.contract.methods.addProduct(this.productName, this.productQuantity).send({ from: this.currentAccount });
                this.showToastMessage("Product added successfully!", "success")
            } catch (error) {
                this.showToastMessage(error, "error")
        }
        },
        async addShipment() {
            try {
                const expectedArrivalDate = new Date(this.shipmentArrivalDate).getTime() / 1000; // Convert to UNIX timestamp
                await this.contract.methods.addShipment(this.shipmentProductId, this.shipmentDestination, expectedArrivalDate, this.shipmentStatus).send({ from: this.currentAccount });
                this.showToastMessage("Shipment added successfully!", "success")
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async trackProduct() {
            try {
                const shipments = await this.contract.methods.trackProduct(this.trackProductId).call({ from: this.currentAccount });
                console.log(shipments)
                this.shipmentHistory = shipments;
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async  listAccounts() {
            try {
                this.accounts = await this.web3.eth.getAccounts();
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        }
    },
    async mounted() {
        this.loadWeb3();
        this.loadContract();
        this.listAccounts();
        try {
            currentAccount = await this.web3.eth.admin;
        } catch (error) {
            this.showToastMessage(error, "error")
        }
    }
};

createApp(PharmaSupplyChain).mount('#app')
