import Web3 from "web3";
import { contractABI, contractAddress } from "./client/config.mjs";
const web3 = new Web3('http://localhost:8545');
const contract = new web3.eth.Contract(contractABI, contractAddress);
let accounts = []
let adminAccount = null;

const newUsersToCreate = [
    {role: 1, entityType: 1},
    {role: 1, entityType: 2},
    {role: 2, entityType: 3},
    {role: 2, entityType: 4},
    {role: 3, entityType: 5}
]

const findAdmin = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await contract.methods.getUsers().call().then(async (_r) => {
                _r.forEach(async _ac =>{
                    const _usr = await contract.methods.getUser(_ac).call();
                    if(_usr[0] === BigInt(0)) {
                        console.log("Found admin: ", _ac)
                        adminAccount = _ac
                        resolve()
                    }
                });
            });
        } catch (error) {
            console.log("Error: could not find admin user")
            reject()
        }
    })
  }

const addUser = async (newUser, newUserEntityType, newUserRole) => {
    try {
        await contract.methods.addUser(
          newUser,
          newUserEntityType,
          newUserRole).send(
            { from: adminAccount }
          );
          console.log("Added user with address: ", newUser)
    } catch (error) {
        console.log(`Error: user ${newUser} could not be added. Probably already exists. Change the script and print the full error`)
    }
}

const createUsers = async () => {
    let c = 0;
    console.log("Begining user add process")
    for(let i = 0; accounts.length; i++) {
        await addUser(
            accounts.filter((i)=> i != adminAccount)[i],
            newUsersToCreate[i].entityType,
            newUsersToCreate[i].role
        )
        c = c + 1;
        if(c >= 5) {
            break
        }
    }
}


const init = async () => {
    accounts = await web3.eth.getAccounts();

    findAdmin().then(async () => {
        if(adminAccount === null) {
            console.log("Could not find admin")
        } else {
            await createUsers()
        }
    })
}

init()