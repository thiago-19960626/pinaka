import { API } from '../constants';

function deleteCard(token, id){
    var formData = new FormData();
    formData.append('token', token);
    formData.append('id', id);

    return new Promise((resolve, reject) => {
        fetch(API.SERVER_DEV_URL + 'credit',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        .then((res) => res.json())
        .then(data => {
            console.log("Deleting Card API Success", data);
            resolve(data);
        })
        .catch(err => {
            console.log("Deleting Card API Error", err);
            reject(err);
        });
    });
}

function saveCard(token, params){
    var formData = new FormData();
    formData.append('number', params.number);
    formData.append('token', token);
    formData.append('cvv', params.cvv);
    formData.append('expired_m', params.expired_m);
    formData.append('expired_y', params.expired_y);
    formData.append('id', params.id);

    return new Promise((resolve, reject) => {
        fetch(API.SERVER_DEV_URL + 'credit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        .then((res) => res.json())
        .then(data => {
            console.log("Saving Card API Success", data);
            resolve(data);
        })
        .catch(err => {
            console.log("Saving Card API Error", err);
            reject(err);
        });
    });
}

function addCard(token, params){
    var formData = new FormData();
    formData.append("number", params.number);
    formData.append("cvv", params.cvv);
    formData.append("expired_m", params.expired_m);
    formData.append("expired_y", params.expired_y);
    formData.append("token", token);

    return new Promise((resolve, reject) => {
        fetch(API.SERVER_DEV_URL + 'credit', {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        .then((res) => res.json())
        .then(data => {
            console.log("Adding Card API Success", data);
            resolve(data);
        })
        .catch(err => {
            console.log("Adding Card API Error", err);
            reject(err);
        });
    });
}

module.exports = {
    deleteCard,
    saveCard,
    addCard
}