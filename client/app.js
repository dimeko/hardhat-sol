const { createApp, ref } = Vue
import { contractABI, contractAddress } from "./config.mjs";

const PharmaSupplyChain = {
    template: `
    <div>
        <div class="toast" v-if="showToast" :class="toastType">
            {{ toastMessage }}
        </div>
      <h1>Pharma Supply Chain</h1>

    
      <div class="main-container"> 
          <div class="sub-container"> 
              <div class="section">
                <div style="display: flex;">
                  <h2>Select user to impersonate</h2>
                </div>
                <div class="form-group">
                    <label for="currentAccount.address">Accounts list:</label>
                    <select v-model="currentAccount.address" id="currentAccount.address" @change="getCurrentUserDetails($event)" class="form-control">
                        <option v-for="(value, key) in accounts" :value="value">{{ value }}</option>
                    </select>
                </div>
                <div class="current-user-details">
                    <p>Current user: {{currentAccount.address}}</p>
                    <p>Role: {{roles[currentAccount.role]}}</p>
                    <p>Entity type: {{entityTypes[currentAccount.entityType]}}</p>
                </div>
              </div>
              <div class="section">
                  <div style="display: flex;">
                    <h2>Add User</h2>
                    <button @click="addUser(newUser, newUserEntityType, newUserRole)" class="btn">Add User</button>
                  </div>
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
              </div>

              <div class="section">
                  <h2>Users</h2>
                  <ul class="user-list">
                      <li v-for="user in users">
                          <p>Account: {{ user['account'] }} <br/>Entity type: {{entityTypes[user['entityType']]}} <br/>Role: {{roles[user['role']]}}</p>
                      </li>
                  </ul>
                  <button @click="listUsers" class="btn">List Users</button>
              </div>

          </div>
          <div class="sub-container"> 
                  <div class="section">
                      <div style="display: flex;"> 
                        <h2>Add Product</h2>
                        <button @click="addProduct" class="btn">Add Product</button>
                      </div>
                      <div class="form-group">
                          <label for="productName">Product Name:</label>
                          <input v-model="productName" id="productName" class="form-control">
                      </div>
                      <div class="form-group">
                          <label for="productQuantity">Quantity:</label>
                          <input v-model="productQuantity" id="productQuantity" type="number" class="form-control">
                      </div>
                  </div>

                  <div class="section">
                    <div style="display: flex;"> 
                      <h2>Products</h2>
                      <button @click="listProducts" class="btn">List Products</button>
                   </div>
                  <ul class="products-list">
                      <li v-for="product in products">
                          <p>Id: {{ product['id'] }}<br/> Name: {{ product['account'] }} <br/>Quantity: {{product['quantity']}} <br/>Owner: {{product['currentOwner']}}</p>
                      </li>
                  </ul>
              </div>
                 
          </div>
          <div class="sub-container"> 
                   <div class="section">
                   <div style="display: flex;"> 
                      <h2>Add Shipment</h2>
                      <button @click="addShipment" class="btn">Add Shipment</button>
                   </div>
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
                  </div>
        
                  <div class="section">
                      <div style="display: flex;"> 
                        <h2>Track Product</h2>
                        <button @click="trackProduct" class="btn">Track Product</button>
                      </div>
                      <div class="form-group">
                          <label for="trackProductId">Product ID:</label>
                          <input v-model="trackProductId" id="trackProductId" type="number" class="form-control">
                      </div>
                  </div>
                  <div class="section">
                      <h2>Shipment History</h2>
                      <ul class="shipment-history">
                          <li v-for="shipment in shipmentHistory">
                              <p><strong>from:</strong> {{shipment['origin']}}<br/><strong>to:</strong> {{shipment['destination']}}<br/><strong>departure on:</strong> {{timestampToDate(shipment['dateOfDeparture'])}}<br/><strong>expected on:</strong> {{timestampToDate(shipment['expectedArrivalDate'])}}<br/><strong>status:</strong> {{shipment['status']}}   </p>
                          </li>
                      </ul>
                  </div>
            </div>
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
            products: [],
            productName: '',
            productQuantity: 0,
            shipmentProductId: 0,
            shipmentDestination: '',
            shipmentArrivalDate: '',
            shipmentStatus: '',
            trackProductId: 0,
            shipmentHistory: [],
            currentAccount: {
              address: "",
              role: "",
              entityType: ""
            },
            showToast: false,
            toastMessage: '',
            toastType: ''
        }
    },
    methods: {
          timestampToDate(timestamp) {
            const date = new Date(Number(timestamp) * 1000);
            const formattedDateTime = date.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Set to true for 12-hour format, false for 24-hour format
            });
        
            return formattedDateTime;
        },
        currentDate() {
          const date = new Date();

          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();

          return `${year}-${month}-${day}`;
        },
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
        async getCurrentUserDetails(select_item) {
            const containsTargetValue = this.users.some(o => o.account === select_item.target.value);
            this.currentAccount.address = select_item.target.value
            if(!containsTargetValue) {
                this.currentAccount.entityType = ""
                this.currentAccount.role = ""
                this.showToastMessage("Cannot select this account. Not in local users list, try fetching the user list first", "error")
                return;
            }
            try {
                const _r = await this.contract.methods.getUser(select_item.target.value).call();
                this.currentAccount.entityType = _r[1]
                this.currentAccount.role = _r[0]
            } catch (error) {
                console.error(error);
            }
        },
        async listUsers() {
          try {
              await this.contract.methods.getUsers().call().then((_r) => {
                  this.users = []
                  _r.forEach(async _ac =>{
                      const _usr = await this.contract.methods.getUser(_ac).call();
                      this.users.push({account: _ac, entityType: _usr[1],  role: _usr[0]})
                  });
              });
          } catch (error) {
              this.showToastMessage(error, "error")
          }
        },
        async addUser(newUser, newUserEntityType, newUserRole) {
            try {
                await this.contract.methods.addUser(
                  newUser,
                  newUserEntityType,
                  newUserRole).send(
                    { from: this.currentAccount.address }
                  );

                this.showToastMessage("User added successfully", "success")
                this.listUsers()
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async listProducts() {
            try {
                await this.contract.methods.getProducts().call().then((_r) => {
                    this.products = []
                    _r.forEach(async _pr =>{
                        this.products.push(
                          {
                            "id": _pr["id"],
                            "name": _pr["name"],
                            "quantity": _pr["quantity"],
                            "currentOwner": _pr["currentOwner"]
                          }
                        )
                    });
                });
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async addProduct() {
            try {
                await this.contract.methods.addProduct(this.productName, this.productQuantity).send({ from: this.currentAccount.address });
                this.showToastMessage("Product added successfully!", "success")
                this.listProducts()
            } catch (error) {
                this.showToastMessage(error, "error")
        }
        },
        async addShipment() {
            try {
                const expectedArrivalDate = new Date(this.shipmentArrivalDate).getTime() / 1000; // Convert to UNIX timestamp
                await this.contract.methods.addShipment(
                  this.shipmentProductId,
                  this.shipmentDestination,
                  expectedArrivalDate,
                  this.shipmentStatus).send(
                    { from: this.currentAccount.address }
                  );
                this.showToastMessage("Shipment added successfully!", "success")
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async trackProduct() {
            try {
                const shipments = await this.contract.methods.trackProduct(this.trackProductId).call({ from: this.currentAccount.address });
                console.log(shipments)
                this.shipmentHistory = shipments;
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        },
        async listAccounts() {
            try {
                this.accounts = await this.web3.eth.getAccounts();
            } catch (error) {
                this.showToastMessage(error, "error")
            }
        }
    },
    async mounted() {
        await this.loadWeb3();
        await this.loadContract();
        await this.listAccounts();
        await this.listUsers();
        await this.listProducts();

        try {
            for(let i=0; i<this.users.length; i++) {
              if(BigInt(this.users[i].role) === BigInt(0)){
                this.currentAccount.address = this.users[i].account
                this.currentAccount.role = this.users[i].role
                this.currentAccount.entityType = this.users[i].entityType
                break;
              }
            }
        } catch (error) {
            this.showToastMessage(error, "error")
        }
    }
};

createApp(PharmaSupplyChain).mount('#app')
