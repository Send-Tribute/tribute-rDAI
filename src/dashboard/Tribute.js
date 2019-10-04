
import 'babel-polyfill';
import {ethers} from 'ethers';
const {bigNumberify, toNumber} = ethers.utils;
const {WeiPerEther} = ethers.constants;

export default function Tribute (DAIContract, rDAIContract, provider, address) {
    /*
    +  RToken (IRToken, Ownable, ReentrancyGuard)
    - [Pub] <Constructor> #
    - [Ext] balanceOf
    - [Ext] allowance
    - [Ext] approve #
    - [Ext] transfer #
    - [Ext] transferAll #
    - [Ext] transferAllFrom #
    - [Ext] transferFrom #
    - [Ext] mint #
    - [Ext] mintWithSelectedHat #
    - [Ext] mintWithNewHat #
    - [Ext] redeem #
    - [Ext] redeemAll #
    - [Ext] redeemAndTransfer #
    - [Ext] redeemAndTransferAll #
    - [Ext] createHat #
    - [Ext] changeHat #
    - [Ext] getMaximumHatID
    - [Ext] getHatByAddress
    - [Ext] getHatByID
    - [Ext] receivedSavingsOf
    - [Ext] receivedLoanOf
    - [Ext] interestPayableOf
    - [Ext] payInterest #
    - [Ext] getGlobalStats
    - [Ext] getAccountStats
    - [Ext] getCurrentSavingStrategy
    - [Ext] getSavingAssetBalance
    - [Ext] changeAllocationStrategy #
    - [Int] transferInternal #
    - [Int] mintInternal #
    - [Int] redeemInternal #
    - [Int] createHatInternal #
    - [Int] changeHatInternal #
    - [Int] getInterestPayableOf
    - [Int] distributeLoans #
    - [Int] estimateAndRecollectLoans #
    - [Int] redeemAndRecollectLoans #
    - [Int] recollectLoans #
    - [Int] payInterestInternal #
    */

    this.DAIContract = DAIContract;
    this.rDAIContract = rDAIContract;
    this.provider = provider;
    this.signer = provider.getSigner();
    this.DAIContract = this.DAIContract.connect(this.signer);
    this.rDAIContract = this.rDAIContract.connect(this.signer);
    this.address = address;

    // [you are in first]
    // every time the pricipal changes we make a new hat
    // add more rdai to your account while updating you hat
    this.generateTribute = async (amountToTribute) => {
        //provided some amount generate more
        //rDAI so that it can be allocated
        // amountToTribute to big number and in wei

        await this.DAIContract.approve();
        await this.rDAIContract
    }

    // reedemm all your rdai to dai
    this.disableTribute = async (addressToDisable) => {
        //stop flowing of tribute from an account to another account
        //set hat back to 0 hat
        console.log(this.address)
        console.log(ethers.utils.getAddress(this.address));
        // console.log(await rDAIContract.getHatByAddress(this.address));
        await this.rDAIContract.changeHat(0);
    }

    // this function mints rDAI to your account
    this.getRDAI = async (amount) => {
        console.log(amount);
        console.log(bigNumberify(amount).mul(WeiPerEther));
        console.log(rDAIContract.address);
        // what happens when approval works but mint gets dropped
        await this.DAIContract.approve(rDAIContract.address, bigNumberify(amount).mul(WeiPerEther));
        // dont call newhat
        await this.rDAIContract.mint(bigNumberify(amount).mul(WeiPerEther));
        let output = await this.rDAIContract.getHatByAddress(this.address);
        console.log(output);
    }

    // send and end
    this.sendTribute = async (address) => {
        // begin flowing of tribute from an account to another account
        await contract.createHat();
    }
    // should take out an address for a hat
    this.endTribute = async (address) => {
        // begin flowing of tribute from an account to another account
        await contract.createHat();
    }

    // Claiming Tribute functions

    // Get the amount of unclaimed tribute
    this.getUnclaimedTribute = async () => {
      const response = await this.rDAIContract.interestPayableOf(this.address[0])
      const output = response.div(WeiPerEther).toNumber()
      return output
    }

    // Get the amount of unclaimed tribute
    this.getUnclaimedTributeOnBehalfOf = async (address) => {
      const response = await this.rDAIContract.interestPayableOf(address)
      const output = response.div(WeiPerEther).toNumber()
      return output
    }

    // calling interest payable of and converting to rdai
    this.claimTribute = async () => {
        //this cashes out all rDAI in both interest
        //and principal and sends it back to the user
        await this.rDAIContract.payInterest(this.address[0]);
    }

    // calling pay interest payable of and converting to rdai
    this.claimTributeOnBehalfOf = async (address) => {
        //this cashes out all rDAI in both interest
        //and principal and sends it back to the user
        await this.rDAIContract.payInterest(address);
    }


// TODO: work on these after other methods have been set

//   function convertDaiRateToAllocation() {
//     //compute how much principal is needed for an interest rate and ideal payment
//     //4000 = 400/.10 => 4k is needed to generate 400 after a year
//     //
//     //helper method that is used to determine how much is needed in order to allocate
//   }

//   function convertRateToAllocation() {
//     //sounds like the exact same thing
//   }

//   function getLendingRate() {
//     //this seems like an oracle thing
//   }

//   async generateReport() {
//     //get hat + interest accrued + time + other things
//   }
}
