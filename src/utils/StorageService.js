/**
 * Storage service with local storage
 */

export default class StorageClass {
    constructor() {
        this.storageName = 'rgand_common';
    }

    _getValue(value) {
        return window.localStorage.getItem(value);
    }

    _setValue(storeName, data) {
        window.localStorage.setItem(storeName, data);
    }

    set(props, value, storageName) {
        let data = this.get(storageName),
            storeName =  storageName || this.storageName;
        data[props] = value;

        this._setValue(storeName, JSON.stringify(data));
    }

    get(storageName) {
        let storage = this._getValue(storageName);
        return storage ? JSON.parse(storage) : {};
    }

    getEntity(storage, searchEntity) {
        let entity = this.get(storage);
        return entity[searchEntity];
    }
}
