export class Store { // Xuất lớp class Store
    constructor() {
        this.listproduct = [];
    }
    getOneproduct(index) {
        return this.listproduct[index];
    }
    getAllProduct() {
        return this.listproduct;
    }
    removeProduct(index) {
        this.listproduct.splice(index, 1)
    }
    addProduct(product) {
        this.listproduct.push(product)
    }

}

