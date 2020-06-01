export class BalanceModel {

    // constructor(public user: {name: string, picturePath: string}, public quota: number, public inDebt: boolean, public interestedList: Array<{quota: number, inDebt: boolean, user: {name: string, picturePath: string}}>, public path: string) {
    // }
    constructor(public quota: number, public inDebt: boolean, public interestedList: Array<{quota: number, inDebt: boolean, user: {name: string, picturePath: string, balance : BalanceModel}}>) {
    }
}
