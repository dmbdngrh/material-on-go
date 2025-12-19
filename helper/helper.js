const fs = require('fs').promises;
const easyInvoice = require('easyInvoice');

const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

const formatIDR = (value) => new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(value);

const generateInvoice = async (data) => {
    
}

module.exports = {calculateAge, formatIDR};