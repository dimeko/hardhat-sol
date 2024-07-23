### Supply Chain project

#### Installation and run:

Terminal 1
```shell
npm i
npx hardhat compile
npx hardhat node
```
Terminal 2
```shell
# In another terminal, deploy the contract while the test node is running.
npx hardhat ignition deploy ./ignition/modules/SupplyChain.js --network localhost
```
Now that you deployed the contract, take the address that is depicted to the terminal and copy it to the app.js
```
...
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Here is the contract address. Replace it with the one that the net gave you

const PharmaSupplyChain = {
    template: `
    <h1>Pharma Supply Chain</h1>
        <div class="toast" v-if="showToast" :class="toastType">
            {{ toastMessage }}
...
```
Terminal 3
```shell
# Then run a python server to test your contract dAPP UI
cd client
python3 -m http.server
```
Do not forget to copy the ABI and the contract address to your UI Javascript files. 
