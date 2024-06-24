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
npx hardhat ignition deploy ./ignition/modules/SupplyChain.js
```
Terminal 3
```shell
# Then run a python server to test your contract dAPP UI
cd client
python3 -m http.server
```
